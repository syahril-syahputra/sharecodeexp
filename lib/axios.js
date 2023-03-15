import Axios from 'axios'
import { signOut } from "next-auth/react"

const instance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
    },
    // withCredentials: true,
})

// const router = useRouter()
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        // router.push("/auth/login")
        // signOut()
        // return window.location.href = '/auth/login'
        // loginPage()
        // router.replace("/auth/login")
    }
    return Promise.reject(error.response);
});

export default instance