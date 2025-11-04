import type { Kona, KonaMessage } from "./types";

const konaImpl: Kona = {
  _callbacks: {},

  call: function (controller: string, action: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const callbackId = `cb_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      this._callbacks[callbackId] = { resolve, reject };

      const msg: KonaMessage = {
        controller,
        action,
        payload,
        callbackId
      };

      try {
        window.webkit.messageHandlers.kona.postMessage(JSON.stringify(msg));
      } catch (e) {
        console.error("Error sending message to Java:", e);
        delete this._callbacks[callbackId];
        reject(e);
      }
    });
  },

  resolveCallback: function (callbackId: string, payload: string): void {
    if (this._callbacks[callbackId]) {
      try {
        const parsedPayload = JSON.parse(payload);
        this._callbacks[callbackId].resolve(parsedPayload);
      } catch (e) {
        console.error("Error parsing payload from Java:", e);
        this._callbacks[callbackId].reject(e);
      }
      delete this._callbacks[callbackId];
    }
  }
};

window.kona = konaImpl;

export default konaImpl;
