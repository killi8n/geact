import client from '../client'

export const getAllGists = ({ page, accessToken }) =>
    client.get(`/gists/public?page=${page}`, {
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    })
