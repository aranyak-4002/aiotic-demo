import { useMemo } from 'react'

const STORE_KEY = 'aiotic_demo_params'

type Params = Record<string, string>

export function useDemoParams(defaults: Params): Params {
  return useMemo(() => {
    const url = new URLSearchParams(window.location.search)

    if (url.toString()) {
      sessionStorage.setItem(STORE_KEY, url.toString())
    } else {
      const stored = sessionStorage.getItem(STORE_KEY)
      if (stored) new URLSearchParams(stored).forEach((v, k) => url.set(k, v))
    }

    const result: Params = { ...defaults }
    url.forEach((v, k) => { result[k] = v })
    return result
  }, [])
}
