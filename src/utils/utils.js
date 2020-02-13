import { getRequest } from './api'
import { Message } from 'element-ui'

export const isNotNullORBlank = (...args) => {
    for (var i = 0; i < args.length; i++) {
        var argument = args[i];
        if (argument == null || argument == '' || argument == undefined) {
            Message.warning({ message: '数据不能为空!' })
            return false;
        }
    }
    return true;
}
export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/config/sysmenu").then(resp => {
        if (resp && resp.status == 200) {
            var fmtRoutes = formatRoutes(resp.data);
            router.addRoutes(fmtRoutes);
            store.commit('initMenu', fmtRoutes);
        }
    })
}
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../components/' + component + '.vue'], resolve)
                } else if (component.startsWith("Emp")) {
                    require(['../components/personalinf/' + component + '.vue'], resolve)
                } else if (component.startsWith("Per")) {
                    require(['../components/achievementInput/' + component + '.vue'], resolve)
                } else if (component.startsWith("Exa")) {
                    require(['../components/Examine/' + component + '.vue'], resolve)
                } else if (component.startsWith("Sta")) {
                    require(['../components/statistics/' + component + '.vue'], resolve)
                } else if (component.startsWith("Sys")) {
                    require(['../components/system/' + component + '.vue'], resolve)
                } else if (component.startsWith("index")) {
                    require(['../components/system/IconSelect/' + component + '.vue'], resolve)
                } else if (component.startsWith("pedding")) {
                    require(['../components/pedding/' + component + '.vue'], resolve)
                } else if (component.startsWith("Audit")) {
                    require(['../components/audit/' + component + '.vue'], resolve)
                }
            },
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children
        };
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}