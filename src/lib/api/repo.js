import client from '../client'

export const getAllRepos = ({ since, accessToken }) =>
    client.get(`/repositories?${since ? `since=${since}` : ''}`, {
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    })

export const getUserRepo = ({ username, page, accessToken }) =>
    client.get(`/users/${username}/repos?${page && `page=${page}`}`, {
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
    })
