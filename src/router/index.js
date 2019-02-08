import Vue from 'vue'
import router from 'vue-router'

import Home from '@/components/Home'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import AuthGuard from '@/router/auth-guard'

Vue.use(router)

export default new router({
    routes:[
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: AuthGuard
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        { 
            path: '*', 
            redirect: '/' 
        }
    ],
    mode: 'history'
})