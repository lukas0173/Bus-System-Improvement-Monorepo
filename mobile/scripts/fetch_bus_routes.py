import urllib.request
import urllib.parse
import json
import os
import time
import urllib.error

OVERPASS_URL = "http://overpass-api.de/api/interpreter"
POCKETBASE_URL = "https://pocketbase.lukaxzs.myaddr.io"
COLLECTION_NAME = "routes"

def fetch_danang_bus_routes():
    # BBox for Da Nang City
    bbox = "15.90,107.90,16.25,108.35"
    
    # Query: Fetch bus route relations and include their member ways with geometry
    query = f"""
    [out:json][timeout:60];
    relation["route"="bus"]({bbox});
    out geom;
    """

    data = urllib.parse.urlencode({'data': query}).encode('utf-8')
    req = urllib.request.Request(OVERPASS_URL, data=data)

    print("Fetching bus routes from Overpass API (Da Nang City)...")
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            result = json.loads(response.read().decode('utf-8'))
            
        elements = result.get("elements", [])
        print(f"Raw count (relations): {len(elements)}")
        
        routes = []
        
        for el in elements:
            if el.get("type") != "relation":
                continue
                
            tags = el.get("tags", {})
            route_ref = tags.get("ref", "")
            route_name = tags.get("name", "")
            
            # Construct a display name
            display_name = route_name
            if route_ref and route_ref not in route_name:
                display_name = f"{route_ref}: {route_name}"
            
            # Extract geometry from members (ways)
            # A route is composed of multiple 'ways' (segments)
            # We will store them as a list of segments (MultiLineString)
            segments = []
            
            members = el.get("members", [])
            for member in members:
                if member.get("type") == "way" and member.get("role") == "": 
                    # Usually role="" is the main route path. 
                    # Sometimes role="forward" or "backward" exists.
                    # For visualization, we take all way members that have geometry.
                    
                    geom = member.get("geometry", [])
                    if geom:
                        # Convert to [[lat, lon], ...]
                        path = [[pt["lat"], pt["lon"]] for pt in geom]
                        segments.append(path)
            
            if segments:
                routes.append({
                    "id": el["id"],
                    "code": route_ref, # Map 'ref' to 'code'
                    "name": display_name,
                    "description": tags.get("description", f"Bus route {route_ref}"),
                    "path_json": json.dumps(segments), # Store geometry as JSON string
                    "status": "active"
                })

        print(f"Processed {len(routes)} bus routes.")
        
        # Save to file
        output_dir = os.path.join(os.path.dirname(__file__), "../assets/data")
        os.makedirs(output_dir, exist_ok=True)
        output_file = os.path.join(output_dir, "bus_routes.json")
        
        with open(output_file, "w", encoding="utf-8") as f:
            # We don't save the raw JSON string in the file, but the object for local usage if needed.
            # But the script uses 'routes' list which has 'path_json' as string.
            # Let's save a clean version for local use if desired, or just dump the upload payload.
            # Dumping the payload structure is fine.
            json.dump(routes, f, ensure_ascii=False, indent=2)
            
        print(f"Data saved to {output_file}")
        return routes

    except Exception as e:
        print(f"Error fetching routes: {e}")
        return []

def delete_all_records():
    print(f"Deleting all existing records from '{COLLECTION_NAME}'...")
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
                
                if (i + 1) % 10 == 0:
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

    print(f"Starting upload of {len(elements)} routes...")
    success_count = 0
    
    for i, item in enumerate(elements):
        
        # Payload construction
        payload = {
            "name": item["name"],
            "code": item["code"],
            "description": item["description"],
            "status": "active",
            "path_json": item["path_json"] 
        }

        try:
            data = json.dumps(payload).encode('utf-8')
            req = urllib.request.Request(url, data=data, headers=headers, method='POST')
            
            with urllib.request.urlopen(req, timeout=30) as response:
                if response.status >= 200 and response.status < 300:
                    success_count += 1
            
            if (i + 1) % 5 == 0:
                print(f"Uploaded {i + 1}/{len(elements)}...")

        except urllib.error.HTTPError as e:
            print(f"Error uploading '{item['name']}': {e}")
            try:
                # print(f"Payload: {payload}") 
                print(f"Response: {e.read().decode('utf-8')}")
            except:
                pass
        except Exception as e:
            print(f"General Error uploading '{item['name']}': {e}")

    print(f"Finished. Uploaded {success_count}/{len(elements)}.")

if __name__ == "__main__":
    # 1. Delete all existing records
    delete_all_records()
    
    # 2. Fetch new data
    routes = fetch_danang_bus_routes()
    
    # 3. Upload
    if routes:
        process_and_upload(routes)
