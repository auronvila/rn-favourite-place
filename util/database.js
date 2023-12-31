import * as SQLite from 'expo-sqlite'
import {Place} from '../models/place';

const database = SQLite.openDatabase('places.db')

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(`CREATE TABLE IF NOT EXISTS places
                              (
                                  id       INTEGER PRIMARY KEY NOT NULL,
                                  title    TEXT                NOT NULL,
                                  imageUri TEXT                NOT NULL,
                                  address  TEXT                NOT NULL,
                                  lat      REAL                NOT NULL,
                                  lng      REAL                NOT NULL
                              )`,
        [],
        (_) => {
          resolve();
        },
        (_, error) => {
          reject(error)
        })
    })
  })
  return promise
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(`INSERT INTO places (title, imageUri, address, lat, lng)
                              VALUES (?, ?, ?, ?,
                                      ?)`, [place.title, place.imageUri, place.address, place.location.lat, place.location.lng],
        (transaction, resultSet) => {
          resolve(resultSet)
        },
        (transaction, error) => {
          reject(error)
        })
    })
  })
  return promise
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(`SELECT *
                              FROM places`, [],
        (_, result) => {
          const places = []
          for (const dp of result.rows._array) {
            places.push(new Place(dp.title, dp.imageUri, {address: dp.address, lat: dp.lat, lng: dp.lng}, dp.id))
          }
          resolve(places)
        },
        (transaction, error) => {
          reject(error)
        })
    })
  })
  return promise
}

export default function fetPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(`SELECT *
                              FROM places
                              WHERE id = ?`, [id],
        (transaction, resultSet) => {
          const dbPlace = resultSet.rows._array[0]
          const place = new Place(dbPlace.title, dbPlace.imageUri, {
              lat: dbPlace.lat,
              lng: dbPlace.lng,
              address: dbPlace.address
            },
            dbPlace.id
          )
          resolve(place)
        },
        (transaction, error) => {
          reject(error)
        })
    })
  })
  return promise
}