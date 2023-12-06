export const idPerfilValido = 29;

export const getTokenFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
};

export const getUsernameFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return `${user.nombre} ${user.apellido}`;
};

export const getIdFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.id;
};

export const getIdPerfilFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.idperfil;
};

export const saveApiToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getApiToken = () => {
  return localStorage.getItem("token");
};
