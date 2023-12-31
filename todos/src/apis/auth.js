export function getJwtToken() {
  return localStorage.getItem('jwtToken')
}

export function setJwtToken(jwt) {
  return localStorage.setItem('jwtToken', jwt)
}

export function clearLocalStorage() {
  return localStorage.clear()
}