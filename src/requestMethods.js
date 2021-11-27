import axios from "axios"

const BASE_URL = "http://localhost/erpapi/"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTEyODVlYzA0ZmZjOTE0ZDJmYjQzMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzE2NDEwMywiZXhwIjoxNjM3NDIzMzAzfQ.VYydMEJz7xsxFD0poJPdbttWQnxEgmajClwDuKq49ig"

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {token: `Bearer ${TOKEN}`}
})
