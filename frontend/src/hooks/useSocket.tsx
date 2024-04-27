import { useEffect, useState } from "react";
const WS_URL = "ws://localhost:8081";
const useScoket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log("connected");
      setSocket(ws);
    };
    ws.onclose = () => {
      console.log("connected");
      setSocket(null);
    };
    if (!socket) {
      setSocket(ws);
    }
    return () => {
      ws.close();
    };
  }, []);
  return socket;
};
export default useScoket;
