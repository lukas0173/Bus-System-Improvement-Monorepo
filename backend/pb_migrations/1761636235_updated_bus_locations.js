/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3967314129")

  // remove field
  collection.fields.removeById("relation625373981")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_544239896",
    "hidden": false,
    "id": "relation4261473011",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "buses",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3967314129")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_544239896",
    "hidden": false,
    "id": "relation625373981",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "bus_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("relation4261473011")

  return app.save(collection)
})
