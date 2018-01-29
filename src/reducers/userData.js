export default function userData(
  state = {
    user: {
      id: 1,
      name: "Maxwell",
      startDate: new Date(Date.parse("2017-12-26"))
    },
    dateTime: Date.now(),
    habits: {},
    dataLoaded: false
  },
  action
) {
  switch (action.type) {
    case "SET_USER_DATA":
      debugger;
      return {
        ...state,
        dataLoaded: true
      };
    case "CREATE_HABIT":
      // console.log(action.payload);
      // const newHabit = { ...action.payload, user_id: state.user.id };
      // debugger;

      return {
        ...state,
        habits: { ...state.habits, ...action.payload }
      };
    default:
      return state;
  }
}
