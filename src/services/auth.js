export const TOKEN_KEY = "@animalfinder-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token, owner_id) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('owner_id', owner_id);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};
