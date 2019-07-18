const TokenKey = 'YG_BIGDATA_TOKEN';
const UserKey = 'YG_USER_INFO';
const UserInfo = {username: '', userId: ''};

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}

export function setUserInfo(info) {
  return sessionStorage.setItem(UserKey, JSON.stringify(info));
}

export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem(UserKey))
}

export function removeUserInfo() {
  return sessionStorage.setItem(UserKey, JSON.stringify(UserInfo));
}
