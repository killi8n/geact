import client from '../client'

export const searchByUsername = ({ username, accessToken }) =>
    client.get(`/search/users?q=${username}`, {
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    })
