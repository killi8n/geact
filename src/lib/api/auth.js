import axios from 'axios'
import client from '../client'

export const login = ({ code, clientId, clientSecret }) =>
    axios.post('/api/auth/login/oauth/access_token', {
        code,
        client_id: clientId,
        client_secret: clientSecret,
    })

export const checkLogged = ({ accessToken }) =>
    client.get(`/user`, {
        headers: {
            Authorization: `bearer ${accessToken}`,
            // process.env.NODE_ENV === 'development'
            // ? `bearer ${accessToken}`
            // : null,
        },
    })

export const logout = () => axios.post('/api/auth/logout', {})
