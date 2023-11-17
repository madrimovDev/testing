import axios from "axios";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkIjoiMjAyMy0xMS0wNFQxMjo1MTozNS43MjVaIiwiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoiYWRtaW4iLCJpZCI6OSwicGhvbmUiOm51bGwsInJvbGUiOiJhZG1pbiIsInN0YXR1cyI6ImFjdGl2ZSIsInVwZGF0ZWQiOiIyMDIzLTExLTA0VDEyOjUxOjM1LjcyNVoiLCJ1c2VybmFtZSI6ImFkbWluIiwianRpIjoib09nWWhtNndWOCIsImlhdCI6MTY5OTk0MTMwNH0._QSvhI5BiptCDTFWHUp44AI1LRAu6o0FeL85Lx9NyFQ'
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: 'Bearer ' + token
  }
})

export default api