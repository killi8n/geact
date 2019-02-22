import client from '../client'

export const getAllRepos = ({ since, accessToken }) =>
    client.get(`/repositories?${since ? `since=${since}` : ''}`, {
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    })
