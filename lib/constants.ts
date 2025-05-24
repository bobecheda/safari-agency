export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile'
  },
  BOOKINGS: {
    LIST: '/bookings',
    CREATE: '/bookings/create',
    CANCEL: (id: string) => `/bookings/${id}/cancel`
  },
  SACCOS: {
    LIST: '/saccos',
    DETAILS: (id: string) => `/saccos/${id}`,
    FAVORITE: (id: string) => `/saccos/${id}/favorite`
  },
  MATATUS: {
    LIST: '/matatus',
    DETAILS: (id: string) => `/matatus/${id}`,
    AVAILABLE: '/matatus/available'
  }
} as const;

export const APP_CONFIG = {
  TOKEN_KEY: 'safari_token',
  REFRESH_TOKEN_KEY: 'safari_refresh_token',
  DEFAULT_ERROR_MESSAGE: 'Something went wrong. Please try again later.'
} as const;