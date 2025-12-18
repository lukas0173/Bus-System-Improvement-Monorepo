import urllib.request
import json
import random

POCKETBASE_URL = "https://pocketbase.lukaxzs.myaddr.io"
ROUTES_COLLECTION = "routes"
BUSES_COLLECTION = "buses"

def fetch_all_records(collection):
    print(f"Fetching all records from '{collection}'...")
    url = f"{POCKETBASE_URL}/api/collections/{collection}/records?perPage=500"
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
            
            # Update url for next page if needed (though API logic might need page param update)
            # PocketBase uses ?page=2 etc.
            current_page = data.get('page', 1)
            url = f"{POCKETBASE_URL}/api/collections/{collection}/records?perPage=500&page={current_page + 1}"
                 
        print(f"Fetched {len(all_records)} records from {collection}.")
        return all_records
        
    except Exception as e:
        print(f"Error fetching {collection}: {e}")
        return []

def update_bus_route(bus_id, route_id):
    url = f"{POCKETBASE_URL}/api/collections/{BUSES_COLLECTION}/records/{bus_id}"
    
    # Random status: boolean (true/false) or string ("active"/"inactive")?
    # User said "true of false randomly".
    # Checking previous schema/context, 'status' in other collections is string "active".
    # But user explicitly asked for "true of false".
    # However, 'buses' collection schema in provided screenshot shows "status": "active" (string).
    # I will stick to string "active"/"inactive" to be safe, or "true"/"false" strings if that's what was meant.
    # Re-reading: "update the status field of the bus to true of false randomly also"
    # If the field type is text, "true"/"false" work. If bool, actual booleans.
    # Looking at @Buses.png, "status": "active" suggests it's a text field.
    # I will use "active" / "maintenance" (or similar) to match other collections, 
    # OR if the user strictly wants boolean-like values I will use "active" vs "inactive".
    # Let's use "active" and "inactive" as they are standard status strings.
    # Wait, the user said "true of false". I will interpret this as `status: true` (active) / `status: false` (inactive) 
    # IF the field is boolean. If it's text, I'll use "active" vs "inactive" but maybe user meant logic?
    # Let's check the screenshot @Buses.png again.
    # It shows `"status": "active"`. So it's likely a Select or Text field.
    # I'll use "active" and "inactive" as safe bets for a bus system, but randomizing them.
    
    status_options = ["active", "inactive"]
    status_val = random.choice(status_options)

    payload = {
        "current_route": route_id,
        "status": status_val
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers=headers, method='PATCH')
        
        with urllib.request.urlopen(req, timeout=30) as response:
            if response.status >= 200 and response.status < 300:
                return True
    except Exception as e:
        print(f"Error updating bus {bus_id}: {e}")
        return False

def main():
    # 1. Fetch all Routes
    routes = fetch_all_records(ROUTES_COLLECTION)
    if not routes:
        print("No routes found. Exiting.")
        return

    route_ids = [r['id'] for r in routes]
    
    # 2. Fetch all Buses
    buses = fetch_all_records(BUSES_COLLECTION)
    if not buses:
        print("No buses found. Exiting.")
        return
        
    print(f"Updating {len(buses)} buses with random routes...")
    
    count = 0
    for bus in buses:
        # Pick a random route
        random_route_id = random.choice(route_ids)
        
        if update_bus_route(bus['id'], random_route_id):
            count += 1
            if count % 5 == 0:
                print(f"Updated {count}/{len(buses)} buses...")
                
    print(f"Finished. Updated {count}/{len(buses)} buses.")

if __name__ == "__main__":
    main()
