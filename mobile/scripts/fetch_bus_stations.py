import urllib.request
import urllib.parse
import json
import os
import math
import urllib.error
import time

OVERPASS_URL = "http://overpass-api.de/api/interpreter"
POCKETBASE_URL = "https://pocketbase.lukaxzs.myaddr.io"
COLLECTION_NAME = "stations"

# Haversine formula to calculate distance between two points in meters
def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371000  # Radius of Earth in meters
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi / 2.0) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c

def fetch_danang_bus_stations():
    # BBox for Da Nang City
    bbox = "15.90,107.90,16.25,108.35"
    
    query = f"""
    [out:json][timeout:60];
    (
      node["highway"="bus_stop"]({bbox});
    );
    out body;
    """

    data = urllib.parse.urlencode({'data': query}).encode('utf-8')
    req = urllib.request.Request(OVERPASS_URL, data=data)

    print("Fetching data from Overpass API (Da Nang City)...")
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            
        elements = result.get("elements", [])
        print(f"Raw count from API: {len(elements)}")
        
        # Filter duplicates/redundant stations based on proximity (30 meters)
        unique_stations = []
        
        for item in elements:
            lat = item['lat']
            lon = item['lon']
            is_redundant = False
            
            for kept in unique_stations:
                dist = haversine_distance(lat, lon, kept['lat'], kept['lon'])
                if dist < 30: # 30 meters threshold
                    is_redundant = True
                    break
            
            if not is_redundant:
                unique_stations.append(item)
                
        print(f"Filtered count (removed proximity duplicates): {len(unique_stations)}")
        
        # Save to file
        output_dir = os.path.join(os.path.dirname(__file__), "../assets/data")
        os.makedirs(output_dir, exist_ok=True)
        output_file = os.path.join(output_dir, "bus_stations.json")
        
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(unique_stations, f, ensure_ascii=False, indent=2)
            
        print(f"Data saved to {output_file}")
        return unique_stations
        
    except Exception as e:
        print(f"Error fetching data: {e}")
        return []

def delete_all_records():
    print("Deleting all existing records from PocketBase...")
    url = f"{POCKETBASE_URL}/api/collections/{COLLECTION_NAME}/records?perPage=500"
    
    try:
        while True:
            # Fetch a page of records
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=30) as response:
                data = json.loads(response.read().decode('utf-8'))
            
            items = data.get('items', [])
            if not items:
                break
                
            print(f"Found {len(items)} records to delete...")
            
            for i, item in enumerate(items):
                delete_url = f"{POCKETBASE_URL}/api/collections/{COLLECTION_NAME}/records/{item['id']}"
                req_del = urllib.request.Request(delete_url, method='DELETE')
                try:
                    with urllib.request.urlopen(req_del, timeout=30) as resp:
                        pass
                except Exception as e:
                    print(f"Failed to delete {item['id']}: {e}")
                
                if (i + 1) % 20 == 0:
                     print(f"Deleted {i + 1}/{len(items)} in current batch...")
            
            if data.get('totalPages', 1) <= data.get('page', 1):
                 break
                 
        print("All records deleted.")
        
    except Exception as e:
        print(f"Error deleting records: {e}")

def process_and_upload(elements):
    url = f"{POCKETBASE_URL}/api/collections/{COLLECTION_NAME}/records"
    headers = {
        "Content-Type": "application/json"
    }

    print(f"Starting upload of {len(elements)} stations...")
    success_count = 0
    
    for i, item in enumerate(elements):
        tags = item.get("tags", {})
        
        raw_name = tags.get("name", "").strip()
        housenumber = tags.get("addr:housenumber", "").strip()
        street = tags.get("addr:street", "").strip()
        
        # 1. Determine Address
        final_address = ""
        if housenumber and street:
            final_address = f"{housenumber} {street}"
        elif street:
            final_address = street
        
        # 2. Determine Name
        final_name = raw_name
        if not final_name:
             if final_address:
                 final_name = f"Trạm {final_address}"
             else:
                 final_name = f"Trạm Bus {item['id']}" # Fallback name

        # 3. Final Address Logic (User Request: Use name as address if address missing)
        if not final_address:
            final_address = final_name
            
        # 4. Safety net: Address cannot be empty for server
        if not final_address:
            final_address = "Đà Nẵng, Việt Nam"

        payload = {
            "name": final_name,
            "address": final_address,
            "latitude": item["lat"],
            "longitude": item["lon"],
            "status": "active"
        }

        try:
            data = json.dumps(payload).encode('utf-8')
            req = urllib.request.Request(url, data=data, headers=headers, method='POST')
            
            with urllib.request.urlopen(req, timeout=30) as response:
                if response.status >= 200 and response.status < 300:
                    success_count += 1
            
            if (i + 1) % 10 == 0:
                print(f"Uploaded {i + 1}/{len(elements)}...")

        except urllib.error.HTTPError as e:
            print(f"Error uploading '{final_name}': {e}")
            try:
                print(f"Payload: {payload}")
                print(f"Response: {e.read().decode('utf-8')}")
            except:
                pass
        except Exception as e:
            print(f"General Error uploading '{final_name}': {e}")

    print(f"Finished. Uploaded {success_count}/{len(elements)}.")

if __name__ == "__main__":
    # 1. Delete all existing records
    delete_all_records()
    
    # 2. Fetch new data (always fetch fresh as per request to 'revise' fetching)
    elements = fetch_danang_bus_stations()
    
    # 3. Upload
    if elements:
        process_and_upload(elements)
