export const BACKEND_URLS = {
    RESET_PASSWORD: 'auth/reset_password/reset/',
    REQUEST_PASSWORD_RESET: 'auth/reset_password/request/',
    LOGIN: 'auth/login/token/',
    REFRESH_TOKEN: 'auth/login/token/refresh/',
    REGISTRATION: 'auth/register/',
    RESPONSE_FOR_REQUEST: 'info/request/response/',
    CATEGORIES: 'info/categories/',
    INFO: 'info/',
    REQUESTS: 'info/requests/',
    REQUESTS_UPDATE: 'info/request/update/',
    REQUESTS_CREATE: 'info/request/create/',
    USER_INFO: 'info/user/',
    PHOTO: 'info/image/',
    VIDEO: 'info/video/',
    NOTIFICATIONS: 'info/notifications/',
    NOTIFICATIONS_READ_ALL: 'info/notifications/read_all/',
};
Object.freeze(BACKEND_URLS);

export const SERVER_URL = 'http://127.0.0.1:8000/api/';

export const BACKEND_SEARCH_PATTERNS = {
    PRICE: 'price', CATEGORY: 'category', SUBCATEGORY: 'subcategory',
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
