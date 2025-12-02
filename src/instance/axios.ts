import axios from 'axios'

export const api = axios.create({
  baseURL: "https://tandy-multibladed-rhonda.ngrok-free.dev/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
})
