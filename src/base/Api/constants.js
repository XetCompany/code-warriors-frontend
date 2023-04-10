export const BACKEND_URLS = {
  LOGIN: 'auth/login/token/',
  REGISTRATION: 'auth/register/',
  INFO: 'info/',
  LOGOUT: 'auth/logout/',
};
Object.freeze(BACKEND_URLS);

export const SERVER_URL = 'http://0.tcp.eu.ngrok.io:16080/api/';

export const BACKEND_SEARCH_PATTERNS = {
  PRICE: 'price',
  CATEGORY: 'category',
  SUBCATEGORY: 'subcategory',
};
Object.freeze(BACKEND_SEARCH_PATTERNS);

export const NOTIFICATION_PLACEMENT = Object.freeze({
  TOP: 'top',
  BOTTOM: 'bottom',
  TOP_LEFT: 'topLeft',
  TOP_RIGHT: 'topRight',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight',
});

export const USER_IDENTIFICATOR_NAME = 'user_id';
