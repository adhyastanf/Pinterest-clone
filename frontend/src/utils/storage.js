// export const AUTH_KEY = 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==';
// export const GATE = 'dashboard-agree';
// export const ENCRYPT_KEY = 'bumn2018';
// const TOKEN_STORAGE = 'agree_cockpit_access_token';
// const REFRESH_TOKEN_STORAGE = 'agree_cockpit_refresh_token';
// const USER_DATA_STORAGE = 'agree_cockpit_user_data';
// const SELECTED_SECTOR = 'agree_cockpit_selected_sector';
// const REMEMBER_ME = 'agree_cockpit_remember_me';
// const COLOR_CHART = 'agree_color_chart';
// const SEARCH_HISTORY = 'agree_cockpit_search';

export function setRememberMe(value) {
  localStorage.setItem(REMEMBER_ME, value);
}

export function removeRememberMe() {
  localStorage.removeItem(REMEMBER_ME);
}

export function getRememberMe() {
  return localStorage.getItem(REMEMBER_ME);
}

export function setToken(value) {
  localStorage.setItem(TOKEN_STORAGE, value);
}

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE);
}

export function setRefreshToken(value) {
  localStorage.setItem(REFRESH_TOKEN_STORAGE, value);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_STORAGE);

}

export function setUserData(value) {
  localStorage.setItem(USER_DATA_STORAGE, JSON.stringify(value));
}

export function getUserData() {
  const retval = localStorage.getItem(USER_DATA_STORAGE);

  return JSON.parse(retval) || '';
}

export function clearStorages() {
  localStorage.removeItem(TOKEN_STORAGE);
  localStorage.removeItem(USER_DATA_STORAGE);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE);
  localStorage.removeItem(SELECTED_SECTOR);
}

export function setSelectedSector(value) {
  localStorage.setItem(SELECTED_SECTOR, JSON.stringify(value));
}

export function getSelectedSector() {
  return JSON.parse(localStorage.getItem(SELECTED_SECTOR));
}

export function getRandomColor() {
  let letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function setColorChart(value) {
  localStorage.setItem(COLOR_CHART, JSON.stringify(value));
}

export function getColorChart() {
  const retval = localStorage.getItem(COLOR_CHART);
  return JSON.parse(retval);
}

export function setSearchHistory(storageName, value) {
  localStorage.setItem(`${SEARCH_HISTORY}_${storageName}`, JSON.stringify(value));
}

export function getSearchHistory(storageName) {
  const retval = localStorage.getItem(`${SEARCH_HISTORY}_${storageName}`);

  return JSON.parse(retval);
}

export function clearSearchHistory(storageName) {
  localStorage.removeItem(`${SEARCH_HISTORY}_${storageName}`);
}
