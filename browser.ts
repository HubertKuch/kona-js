import konaImpl from './index';

declare global {
  interface Window {
    kona: typeof konaImpl;
  }
}

window.kona = konaImpl;
