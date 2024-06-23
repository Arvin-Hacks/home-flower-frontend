export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return token !== null;
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = (): void => {
    localStorage.removeItem('token');
  };
  