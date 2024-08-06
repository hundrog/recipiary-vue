import { ofetch } from 'ofetch'

export const goFetch = (request: string, opts: object = {}) => {
  return ofetch(request, {
    baseURL: import.meta.env.VITE_API_URL,
    ...opts
  })
}
