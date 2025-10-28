/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_544239896")

  // remove field
  collection.fields.removeById("text625373981")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_544239896")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text625373981",
    "max": 0,
    "min": 0,
    "name": "bus_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
