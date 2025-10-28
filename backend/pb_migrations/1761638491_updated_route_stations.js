/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2117093461")

  // remove field
  collection.fields.removeById("text801798354")

  // remove field
  collection.fields.removeById("number2026600623")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json2026600623",
    "maxSize": 0,
    "name": "stop_order",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_96911357",
    "hidden": false,
    "id": "relation887928038",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "routes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3887672816",
    "hidden": false,
    "id": "relation566080053",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "stations",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2117093461")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text801798354",
    "max": 0,
    "min": 0,
    "name": "route_station_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number2026600623",
    "max": null,
    "min": null,
    "name": "stop_order",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("json2026600623")

  // update field
  collection.fields.addAt(2, new Field({
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

  // update field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3887672816",
    "hidden": false,
    "id": "relation566080053",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "station_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
