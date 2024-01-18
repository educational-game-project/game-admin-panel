export const getBaseUrl = (): string => {
  return import.meta.env.VITE_MODE === 'development'
    ? (import.meta.env.VITE_API_DEV_URL as string)
    : (import.meta.env.VITE_API_URL as string);
};
