import axios from 'axios'

export const api = axios.create({
  baseURL: "https://tandy-multibladed-rhonda.ngrok-free.dev",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
})