/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_924612151")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "date1872009285",
    "max": "",
    "min": "",
    "name": "created_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_924612151")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "date1872009285",
    "max": "",
    "min": "",
    "name": "time",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
