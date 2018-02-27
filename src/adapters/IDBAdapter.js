import idb from "idb";

function startDB() {
  var dbPromise = idb.open("sixty-six-days", 3, upgradeDb => {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore("habits", { keyPath: "id" });
      case 1:
        upgradeDb.createObjectStore("user", { keyPath: "id" });
      case 2:
        upgradeDb.createObjectStore("check-ins", { keyPath: "id" });
    }
  });
  return dbPromise;
}

class IDBAdapter {
  static find = (table, id) =>
    startDB()
      .then(db =>
        db
          .transaction(table)
          .objectStore(table)
          .get(id)
      )
      .then(object => object);

  static create = (table, object) =>
    startDB()
      .then(db => {
        var tx = db.transaction(table, "readwrite");
        tx.objectStore(table).put(object);
        return tx.complete;
      })
      .then(object => object);

  static all = table =>
    startDB()
      .then(db =>
        db
          .transaction(table)
          .objectStore(table)
          .getAll()
      )
      .then(object => object);

  static filter = (table, callback) =>
    startDB()
      .then(db =>
        db
          .transaction(table)
          .objectStore(table)
          .getAll()
      )
      .then(data => data.filter(callback));
}

export default IDBAdapter;

// //given a username, return that user's data object
// static getPlayer = username => {
//   startDB()
//     .then(db => {
//       var tx = db.transaction("players");
//       var playersStore = tx.objectStore("players");
//       return playersStore.get(username);
//     })
//     .then(val => {
//       console.log("The value is:", val);
//     })
//     .catch(() => console.log("couldn't find player"));
// };
//
// //when a player has new data, write to the player's idb object
// static updatePlayer = playerObj => {
//   startDB()
//     .then(db => {
//       var tx = db.transaction("players", "readwrite");
//       var playersStore = tx.objectStore("players");
//
//       playersStore.put(playerObj);
//       return tx.complete;
//     })
//     .then(val => {
//       console.log("The value is:", val);
//     })
//     .catch(console.log);
// };
