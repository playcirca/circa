import React from 'react';
import { useCirca } from '../useCirca';
import { StonewallContainer } from './StonewallContainer';
import { Countdown } from './Countdown';

export const NextUp = () => {
  const [state] = useCirca();

  const playlists = state.playlists;

  return (
    <StonewallContainer>
      {playlists.length > 0 ? (
        <div>
          <h2>Next up</h2>
          <h3>{playlists[0].name}</h3>
          <Countdown to={playlists[0].startTime} />
        </div>
      ) : (
        <h2>No games scheduled</h2>
      )}
    </StonewallContainer>
  );
};
