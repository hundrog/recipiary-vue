import { ofetch } from "ofetch"

export const goFetch = (request: string, opts: object = {}) => {
  return ofetch(request, {
    baseURL: 'http://localhost:8080',
    ...opts
  })
}
