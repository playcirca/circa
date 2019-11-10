import React from "react";
import {getColorForTick} from "../gradients";
import {Logotype} from "./Logotype";
import {useCirca} from "../useCirca";

export const StonewallContainer: React.FC = ({ children }) => {

  const [client] = useCirca();

  return (
    <div css={{ height: '100vh', width: '100vw', background: getColorForTick(client.getState().serverTick), padding: '1rem', textAlign: 'center' }}>
      <div css={{ fontSize: '20vh' }}>
        <Logotype />
      </div>

      <div css={{ background: 'rgba(255, 255, 255, 0.6)', borderRadius: 12, padding: '1rem', maxWidth: 300, margin: '0 auto' }}>
        {children}
      </div>
    </div>
  )
}
