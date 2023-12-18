import { http, HttpResponse } from 'msw'
const API_URL = "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com"

export const booking = {
    "when": "2021-05-01",
    "time": "12:00",
    "lanes": "1",
    "players": "3",
    "shoes": [ "39", "40", "41" ],
}


export const bookingRes  = {
    ...booking,
    "price": "460",
    "id": "STR6278FGTL",
    "active": true,
}


export const handlers = [
    http.post(API_URL, ()=> HttpResponse.json(bookingRes))]