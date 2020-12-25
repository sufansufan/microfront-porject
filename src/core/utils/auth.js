import Cookies from 'js-cookie'
import { getProdTwoName } from '@core/utils'

const TokenKey = getProdTwoName() + '-Token'

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

export function getSessionStorage(name) {
  return sessionStorage.getItem(name)
}

export function setSessionStorage(name, value) {
  return sessionStorage.setItem(name, value)
}

export function removeSessionStorage(name) {
  return sessionStorage.removeItem(name)
}
