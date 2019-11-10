import React from "react";
import {useCirca} from "../useCirca";
import {StonewallContainer} from "./StonewallContainer";

export const Finished = () => {
  const [state] = useCirca();

  return (
    <StonewallContainer>
      <h1>Game finished!</h1>
      <ul css={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {state.facts.map(fact => <li css={{ fontSize: '1.2rem', padding: '0.8rem', background: 'rgba(255, 255, 255, 0.3)', marginBottom: '1.2rem', borderRadius: 6 }}>{fact}</li>)}
      </ul>
    </StonewallContainer>
  )
};
