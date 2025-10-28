/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1935604901")

  // remove field
  collection.fields.removeById("text1115601061")

  // remove field
  collection.fields.removeById("relation2809058197")

  // remove field
  collection.fields.removeById("relation566080053")

  // remove field
  collection.fields.removeById("relation2780573198")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation344172009",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "users",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3887672816",
    "hidden": false,
    "id": "relation2818012649",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "stations",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1630916145",
    "hidden": false,
    "id": "relation2859692250",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "trips",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
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

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "date1872009285",
    "max": "",
    "min": "",
    "name": "created_at",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1935604901")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1115601061",
    "max": 0,
    "min": 0,
    "name": "request_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2809058197",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
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

  // remove field
  collection.fields.removeById("relation344172009")

  // remove field
  collection.fields.removeById("relation2818012649")

  // remove field
  collection.fields.removeById("relation2859692250")

  // remove field
  collection.fields.removeById("relation4261473011")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date1872009285",
    "max": "",
    "min": "",
    "name": "time",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
