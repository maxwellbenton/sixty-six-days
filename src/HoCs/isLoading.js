import React from "react";
import { Redirect } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";

const isLoading = (IncomingComponent, loadingState, habitsPresent) => {
  return class extends React.Component {
    render() {
      if (!loadingState) {
        console.log("rerouting to loading");

        return <LoadingComponent />;
      }
      if (loadingState && habitsPresent) {
        console.log("passing component");

        return <IncomingComponent />;
      }
      if (loadingState && !habitsPresent) {
        console.log("rerouting to new habit");

        return <Redirect to="/new_habit" />;
      }
      console.log("passing through");

      return <IncomingComponent />;
    }
  };
};

export default isLoading;
