export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=-1`;
};
