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

export const saveState = (key: string, state?: any) => {
  if (typeof window !== 'undefined') {
    try {
      if (state === undefined || state === null) {
        localStorage.removeItem(key)
      } else {
        const serialState = JSON.stringify(state)
        localStorage.setItem(key, serialState)
      }
    } catch (err) {
      console.error(err)
    }
  }
  return undefined
}

export const removeState = (key: string) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key)
    } catch (err) {
      console.error(err)
    }
  }
  return undefined
}
