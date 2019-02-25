import client from '../client'

export const getAllUsers = ({ since, accessToken }) =>
    client.get(`/users?${since ? `since=${since}` : ''}`, {
        headers: {
            Authorization: `bearer ${accessToken}`,
            // process.env.NODE_ENV === 'development'
            //     ? `bearer ${accessToken}`
            //     : null,
        },
    })
