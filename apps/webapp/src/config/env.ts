export const ENVIROMENT = import.meta.env.MODE;
export const IS_PRODUCTION = import.meta.env.MODE === "production";
export const IS_DEVELOPMENT = import.meta.env.DEV;
export const WEBAPP_PORT = import.meta.env.VITE_WEBAPP_PORT;
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
export const LOG_ROCKET_KEY = import.meta.env.VITE_LOG_ROCKET_KEY;
export const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
