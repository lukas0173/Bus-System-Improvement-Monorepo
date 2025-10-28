/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1630916145")

  // remove field
  collection.fields.removeById("text2780573198")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_544239896",
    "hidden": false,
    "id": "relation625373981",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "buses",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_96911357",
    "hidden": false,
    "id": "relation887928038",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "routes",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1630916145")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2780573198",
    "max": 0,
    "min": 0,
    "name": "trip_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_544239896",
    "hidden": false,
    "id": "relation625373981",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "bus_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_96911357",
    "hidden": false,
    "id": "relation887928038",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "route_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
