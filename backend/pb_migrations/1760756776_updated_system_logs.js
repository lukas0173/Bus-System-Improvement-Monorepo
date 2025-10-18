/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_924612151")

  // remove field
  collection.fields.removeById("number2782324286")

  // add field
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_924612151")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number2782324286",
    "max": null,
    "min": null,
    "name": "timestamp",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("date1872009285")

  return app.save(collection)
})
