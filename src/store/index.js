import Vue from 'vue'
import Vuex from 'vuex'
import '../lib/sockjs'
import '../lib/stomp'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            name: window.localStorage.getItem('user' || '[]') == null ? '未登录' : window.localStorage.getItem('user' || '[]').name,
            userface: window.localStorage.getItem('user' || '[]') == null ? '' : window.localStorage.getItem('user' || '[]').userface,
            username: window.localStorage.getItem('user' || '[]') == null ? '' : window.localStorage.getItem('user' || '[]').username,
            roles: window.localStorage.getItem('user' || '[]') == null ? '' : window.localStorage.getItem('user' || '[]').roles
        },
        routes: [],
        isCollapse: false,
        currentFriend: {},
        logoShow: false,
        stomp: null,
    },
    mutations: {
        collapse(state, arg) {
            state.isCollapse = !state.isCollapse
            if (state.logoShow) {
                setTimeout(function() {
                    state.logoShow = false
                }, 300)
            } else {
                state.logoShow = true
            }
        },
        initMenu(state, menus) {
            state.routes = menus;
        },
        login(state, user) {
            state.user = user;
            window.localStorage.setItem('user', JSON.stringify(user));
        },
        logout(state) {
            window.localStorage.removeItem('user');
            state.routes = [];
        },
    },
    actions: {
        collapse({ commit }, arg) {
            commit('collapse', arg)
        },
    },
    getters: {
        logoShow: state => state.logoShow,
        isCollapse: state => state.isCollapse,
    }
});