import IDBAdapter from "../adapters/IDBAdapter";

// export function getUserData() {
//   return dispatch => {
//     const habits = IDBAdapter.all("habits").then(habits => {
//       dispatch({ type: "SET_HABITS", habits });
//     });
//
//     const user = IDBAdapter.all("user").then(user => {
//       const newUser = {
//         id: Math.random()
//           .toString(36)
//           .substr(2, 9),
//         joined: Date.now()
//       };
//
//       !user.length
//         ? IDBAdapter.create("user", newUser).then(user => {
//             console.log(user, newUser);
//             debugger;
//             dispatch({ type: "SET_USER", user });
//           })
//         : dispatch({ type: "SET_USER", user });
//     });
//   };
// }
//
// export function checkIn(habitId, data) {
//   const checkIn = { habitId, ...data };
//   return dispatch => {
//     IDBAdapter.create("check-ins", checkIn).then(() => {
//       dispatch({ type: "ADD_CHECKIN", checkIn });
//     });
//   };
// }
//
// export function createHabit({
//   user_id,
//   frequency,
//   hour,
//   minute,
//   ampm,
//   habit,
//   logType,
//   quantity,
//   unit
// }) {
//   const id = Math.round(Math.random() * 100000);
//   const newHabit = {
//     id,
//     user_id,
//     habit,
//     frequency,
//     hour,
//     minute,
//     ampm,
//     logType,
//     quantity,
//     unit,
//     created_at: Date.now(),
//     checkins: []
//   };
//   return dispatch => {
//     IDBAdapter.create("habits", newHabit)
//       .then(newHabit => dispatch({ type: "CREATE_HABIT", habit: newHabit }))
//       .catch(console.log);
//   };
// }
