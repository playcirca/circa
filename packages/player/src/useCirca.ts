import {useEffect, useState} from "react";
import {Client, createClient} from "./client";

const client = createClient();

export const useCirca = (): [Client] => {
  const [,forceUpdate] = useState(0)

  useEffect(() => {
    client.on('change', () => forceUpdate(num => num + 1));
  }, []);


  return [client]
};
