import axios from 'axios'

export const login = ({ code, clientId, clientSecret }) =>
    axios.post('/api/auth/login/oauth/access_token', {
        code,
        client_id: clientId,
        client_secret: clientSecret,
    })

export const checkLogged = ({ accessToken }) =>
    axios.get(`https://api.github.com/user`, {
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    })
