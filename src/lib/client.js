import axios from 'axios'

// if (process.env.NODE_ENV === 'production') {
//     axios.defaults.headers = {
//         Authorization: `bearer 0793823e64eb9f6b160c1fd3ddc76f6148b0fb43`,
//     }
// }

export default axios.create({
    baseURL: 'https://api.github.com',
})
