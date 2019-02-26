import client from '../client'

export const searchByUsername = ({ username, accessToken, page }) =>
    client.get(`/search/users?q=${username}&page=${page}`, {
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    })
