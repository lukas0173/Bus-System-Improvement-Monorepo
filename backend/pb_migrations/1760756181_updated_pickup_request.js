/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1935604901")

  // update collection data
  unmarshal({
    "name": "pickup_requests"
  }, collection)

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1630916145",
    "hidden": false,
    "id": "relation2780573198",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "trip_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1935604901")

  // update collection data
  unmarshal({
    "name": "pickup_request"
  }, collection)

  // remove field
  collection.fields.removeById("relation2780573198")

  return app.save(collection)
})
