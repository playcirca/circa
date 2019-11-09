import React from "react";
import {Welcome} from "./Welcome";
import {useCirca} from "../useCirca";


export const App = () => {
  useCirca();

  return (
    <Welcome />
  )
}
