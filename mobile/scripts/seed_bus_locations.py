import urllib.request
import json
import random
import time
from datetime import datetime

POCKETBASE_URL = "https://pocketbase.lukaxzs.myaddr.io"
BUSES_COLLECTION = "buses"
LOCATIONS_COLLECTION = "bus_locations"

# Bounding Box for Da Nang
MIN_LAT = 15.90
MAX_LAT = 16.25
MIN_LON = 107.90
MAX_LON = 108.35

def fetch_all_buses():
    print(f"Fetching all buses...")
    url = f"{POCKETBASE_URL}/api/collections/{BUSES_COLLECTION}/records?perPage=500"
    all_records = []
    
    try:
        while True:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=30) as response:
                data = json.loads(response.read().decode('utf-8'))
            
            items = data.get('items', [])
            all_records.extend(items)
            
            if data.get('totalPages', 1) <= data.get('page', 1):
                 break
            
            current_page = data.get('page', 1)
            url = f"{POCKETBASE_URL}/api/collections/{BUSES_COLLECTION}/records?perPage=500&page={current_page + 1}"
                 
        print(f"Fetched {len(all_records)} buses.")
        return all_records
        
    except Exception as e:
        print(f"Error fetching buses: {e}")
        return []

def create_bus_location(bus_id, lat, lon):
    url = f"{POCKETBASE_URL}/api/collections/{LOCATIONS_COLLECTION}/records"
    
    # Generate current UTC timestamp
    # Format: "2022-01-01 10:00:00.123Z"
    # Using 'Z' to indicate UTC
    now_iso = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3] + "Z"

    payload = {
        "latitude": lat,
        "longitude": lon,
        "buses": bus_id,
        "created": now_iso
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers=headers, method='POST')
        
        with urllib.request.urlopen(req, timeout=30) as response:
            return True
    except Exception as e:
        print(f"Error creating location for bus {bus_id}: {e}")
        return False

def main():
    buses = fetch_all_buses()
    if not buses:
        return

    count = 0
    skipped = 0
    
    print("Creating initial locations for buses...")
    
    for bus in buses:
        # Skip "main bus" (case-insensitive check just in case)
        if bus.get("name", "").lower() == "main bus":
            print(f"Skipping bus: {bus.get('name')} ({bus['id']})")
            skipped += 1
            continue
            
        # Generate random coordinates within bbox
        lat = random.uniform(MIN_LAT, MAX_LAT)
        lon = random.uniform(MIN_LON, MAX_LON)
        
        # Round to reasonable precision (e.g. 6 decimal places)
        lat = round(lat, 6)
        lon = round(lon, 6)
        
        if create_bus_location(bus['id'], lat, lon):
            count += 1
            if count % 20 == 0:
                print(f"Created {count} locations...")
        
    print(f"Finished. Created {count} locations. Skipped {skipped}.")

if __name__ == "__main__":
    main()
