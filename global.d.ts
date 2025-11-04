import type { Kona } from "./types";

interface WebkitMessageHandler {
  postMessage: (message: string) => void;
}

declare global {
  interface Window {
    kona: Kona;
    webkit: {
      messageHandlers: {
        kona: WebkitMessageHandler;
      };
    };
  }
}

export {};
