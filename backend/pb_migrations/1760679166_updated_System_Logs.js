/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_924612151")

  // update collection data
  unmarshal({
    "name": "system_logs"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_924612151")

  // update collection data
  unmarshal({
    "name": "System_Logs"
  }, collection)

  return app.save(collection)
})
