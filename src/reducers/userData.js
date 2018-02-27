export default function userData(
  state = {
    user: null,
    dateTime: Date.now(),
    habits: {},
    dataLoaded: false
  },
  action
) {
  switch (action.type) {
    case "SET_HABITS":
      return {
        ...state,
        habits: action.habits,
        dataLoaded: true
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user[0]
      };

    case "CREATE_HABIT":
      return {
        ...state,
        habits: {
          ...state.habits,
          [Object.keys(state.habits).length + 1]: action.habit
        }
      };
    default:
      return state;
  }
}
