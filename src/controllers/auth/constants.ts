export const ACCESS_TOKEN_LIFETIME = process.env.NODE_ENV === 'development' ? '30s' : '5m';
export const REFRESH_TOKEN_LIFETIME = process.env.NODE_ENV === 'development' ? '1m' : '3m';
