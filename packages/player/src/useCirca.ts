import {useEffect, useState} from "react";
import {Client, createClient, State} from "./client";

const client = createClient();

export const useCirca = (): [State, Client] => {
  const [,forceUpdate] = useState(0);

  useEffect(() => {
    const close = client.emitter.on('change', () => {
      forceUpdate(num => num + 1)
    });

    return close;
  }, []);


  return [client.getState(), client]
};
