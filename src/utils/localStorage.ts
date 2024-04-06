import Cookies from 'js-cookie'

export const loadState = <T = any>(key: string) => {
  if (typeof window !== 'undefined') {
    try {
      const value = localStorage.getItem(key)
      if (value === null) return undefined

      return JSON.parse(value) as T
    } catch (err) {
      console.error(err)
      return undefined
    }
  }
  return undefined
}

export const saveState = (key: string, state?: any, haveCookie?: boolean) => {
  if (typeof window !== 'undefined') {
    try {
      if (state === undefined || state === null) {
        localStorage.removeItem(key)
        if (haveCookie) Cookies.remove(key)
      } else {
        const serialState = JSON.stringify(state)
        localStorage.setItem(key, serialState)
        if (haveCookie)
          Cookies.set(key, state, { sameSite: 'None', secure: true })
      }
    } catch (err) {
      console.error(err)
    }
  }
  return undefined
}

export const removeState = (key: string, haveCookie?: boolean) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key)
      if (haveCookie) Cookies.remove(key)
    } catch (err) {
      console.error(err)
    }
  }
  return undefined
}
