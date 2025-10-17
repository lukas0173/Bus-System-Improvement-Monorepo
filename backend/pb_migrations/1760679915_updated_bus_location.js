/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3967314129")

  // update collection data
  unmarshal({
    "name": "bus_locations"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3967314129")

  // update collection data
  unmarshal({
    "name": "bus_location"
  }, collection)

  return app.save(collection)
})
