let API_HOSTNAME;

if (process.env.NODE_ENV === 'development') {
  API_HOSTNAME = '/server/api';
} else {
  API_HOSTNAME = '/server/api';
}

export const APIHOSTNAME = API_HOSTNAME;
