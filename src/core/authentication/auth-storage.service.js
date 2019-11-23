const STORAGE_KEY = 'controleFinanceiro::bearerToken';

export const getToken = () => localStorage.getItem(STORAGE_KEY);
export const storeToken = token => localStorage.setItem(STORAGE_KEY, token);
export const clearStore = () => localStorage.removeItem(STORAGE_KEY);
