import React from "react";
import {useCirca} from "../useCirca";
import {NextUp} from "./NextUp";


export const App = () => {
  const [] = useCirca();

  return (
    <div>
      <NextUp />
    </div>
  )
}
