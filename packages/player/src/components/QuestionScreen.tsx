import React, {useState} from "react";
import {useCirca} from "../useCirca";
import {StonewallContainer} from "./StonewallContainer";
import {createClientRangeAnswer, ScreenState} from "../client";

export const QuestionScreen = () => {
  const [state, client] = useCirca();

  const [currentValue, setValue] = useState(0);

  return (
    <StonewallContainer>
      {state.current?.state === ScreenState.QuestionGiven || state.current?.state === ScreenState.QuestionOpen || state.current?.state === ScreenState.QuestionClosed ? (
        <h1>{state.current.question.question}</h1>

      ) : null}
      {state.current?.state === ScreenState.QuestionOpen ? (
        <React.Fragment>
          <div css={{ display: 'flex' }}>
            <div>0</div>
            <div css={{ flex: 'auto' }}>
              <input type="range" css={{ width: '100%' }} step={0.1} max={2000} min={0} onMouseUp={e => client.send(createClientRangeAnswer(e))} onChange={e => setValue(parseFloat(e.target.value))} />
            </div>
            <div>2000</div>
          </div>
          <div>
            {currentValue}
          </div>
        </React.Fragment>
      ) : null}
      {state.current?.state === ScreenState.QuestionClosed ? (
        <ul css={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {state.facts.map(fact => <li css={{ fontSize: '1.2rem', padding: '0.8rem', background: 'rgba(255, 255, 255, 0.3)', marginBottom: '1.2rem', borderRadius: 6 }}>{fact}</li>)}
        </ul>
      ) : null}
    </StonewallContainer>
  )
};
