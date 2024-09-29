// src/services/WebSocketService.js
export const connectWebSocket = (selectedCoin, selectedInterval, onMessage) => {
  const socketUrl = `wss://stream.binance.com:9443/ws/${selectedCoin}@kline_${selectedInterval}`;
  const ws = new WebSocket(socketUrl);

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const candlestick = message.k;
    const newCandle = {
      time: candlestick.t,
      open: candlestick.o,
      high: candlestick.h,
      low: candlestick.l,
      close: candlestick.c,
    };
    onMessage(newCandle);
  };

  return ws;
};
