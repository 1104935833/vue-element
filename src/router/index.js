import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Center from '@/components/system/SysCenter'
import Setting from '@/components/system/SysSetting'
import Padding from '@/components/system/SysPadding'
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
                path: '/sys/center',
                name: '个人中心',
                component: Center,
                hidden: true,
                meta: {
                    keepAlive: false,
                    requireAuth: true
                }
            }, {
                path: '/sys/setting',
                name: '设置',
                component: Setting,
                hidden: true,
                meta: {
                    keepAlive: false,
                    requireAuth: true
                }
            }, {
                path: '/sys/padding',
                name: '消息',
                component: Padding,
                hidden: true,
                meta: {
                    keepAlive: false,
                    requireAuth: true
                }
            }]
        }


    ]
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