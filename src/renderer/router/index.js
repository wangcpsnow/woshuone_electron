import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import EditPost from '@/components/EditPost'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/edit/:id',
            name: 'edit',
            component: EditPost
        }
    ]
})
