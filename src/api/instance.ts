import axios from 'axios'

export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  withCredentials: true,
  headers: {
    'API-KEY': 'c53710fa-3381-4f82-a43d-14117775329a',
  },
})
