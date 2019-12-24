import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Chat from '@/components/chat/Chat'
Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true
    }, {
        path: '/home',
        name: '主页',
        component: Home,
        hidden: true,
        meta: {
            requireAuth: true
        },
        children: [{
            path: '/chat',
            name: '消息',
            component: Chat,
            hidden: true,
            meta: {
                keepAlive: false,
                requireAuth: true
            }
        }]
    }]
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('login');

        if (token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});
export default router;