import React from "react";
import {useCirca} from "../useCirca";
import {NextUp} from "./NextUp";
import {ScreenState} from "../client";
import {QuestionScreen} from "./QuestionScreen";
import {Finished} from "./Finished";


export const App = () => {
  const [state] = useCirca();

  const screenState = state.current?.state;

  return (
    <div>
      {screenState === ScreenState.GameQueued && <NextUp />}
      {[ScreenState.QuestionGiven, ScreenState.QuestionClosed, ScreenState.QuestionAnswer, ScreenState.QuestionOpen].indexOf(screenState as ScreenState) >= 0 && <QuestionScreen />}
      {[ScreenState.Finished].indexOf(screenState as ScreenState) >= 0 && <Finished />}
    </div>
  )
}
