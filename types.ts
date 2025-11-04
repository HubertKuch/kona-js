// --- Type Definitions ---

export interface KonaCallback {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

export type KonaCallbackMap = Record<string, KonaCallback>;

export interface KonaMessage {
  controller: string;
  action: string;
  payload: any;
  callbackId: string;
}

export interface Kona {
  _callbacks: KonaCallbackMap;
  call: (controller: string, action: string, payload: any) => Promise<any>;
  resolveCallback: (callbackId: string, payload: string) => void;
}

