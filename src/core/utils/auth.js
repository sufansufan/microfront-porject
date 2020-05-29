import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLocalStorage(name) {
  return localStorage.getItem(name)
}

export function setLocalStorage(name, value) {
  return localStorage.setItem(name, value)
}

export function removeLocalStorage(name) {
  return localStorage.removeItem(name)
}
