import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        // {
        //     path: '/',
        //     redirect: '/dashboard'
        // },
        {
            path: '/Home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '工厂管理员路由描述' },
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '临时首页' }
                },
                {
                    path: '/echarts',
                    component: resolve => require(['../components/page/echarts.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/warehouse_material',
                    component: resolve => require(['../components/page/warehouse_material.vue'], resolve),
                    meta: { title: '原料库存信息' },
                },
                {
                    path: '/warehouse_product',
                    component: resolve => require(['../components/page/warehouse_product.vue'], resolve),
                    meta: { title: '成品库存信息' }
                },
                {
                    path: '/warehouse_emergency',
                    component: resolve => require(['../components/page/warehouse_emergency.vue'], resolve),
                    meta: { title: '库存紧急事件' }
                },
                {
                    path: '/order',
                    name: 'Order',
                    component: resolve => require(['../components/page/order/order.vue'], resolve),
                    meta: { title: '订单情况' }
                },
                {
                    path: '/message',
                    component: resolve => require(['../components/page/message/message.vue'], resolve),
                    meta: { title: '消息处理' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/deliver',
                    name: 'Deliver',
                    component: resolve => require(['../components/page/deliver/deliver.vue'], resolve),
                    meta: { title: '配送员情况' }
                },
                {
                    // map
                    path: '/map',
                    component: resolve => require(['../components/page/map.vue'], resolve),
                    meta: { title: '配送员位置' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/404/403.vue'], resolve),
                    meta: { title: '403' }
                },
                {
                    path: '/test',
                    component: resolve => require(['../components/test.vue'], resolve),
                    meta: { title: 'test' }
                },
                {
                    path: '/orderDetail',
                    name: 'OrderDetail',
                    component: resolve => require(['../components/page/order/orderDetail.vue'], resolve),
                    meta: { title: '订单详情' }
                },
                {
                    path: '/deliverDetail',
                    name: 'DeliverDetail',
                    component: resolve => require(['../components/page/deliver/deliverDetail.vue'], resolve),
                    meta: { title: '配送员详情' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/login/login.vue'], resolve)
            // component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/Home2',
            component: resolve => require(['../components/common/Home2.vue'], resolve),
            meta: { title: '系统管理员路由描述' },
            children: [
                {
                    path: '/dashboard2',
                    name: 'Dashboard2',
                    component: resolve => require(['../components/page/Dashboard2.vue'], resolve),
                    meta: { title: '系统管理首页' }
                },
                {
                    path: '/menu',
                    name: 'Menu',
                    component: resolve => require(['../components/page/menu/menu.vue'], resolve),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/pizzaDetail',
                    name: 'PizzaDetail',
                    component: resolve => require(['../components/page/menu/pizzaDetail.vue'], resolve),
                    meta: { title: 'pizza详情' }
                },
                {
                    path: '/shopInfo',
                    name: 'ShopInfo',
                    component: resolve => require(['../components/page/shop/shopInfo.vue'], resolve),
                    meta: { title: '工厂情况' }
                },
                {
                    path: '/shopIncome',
                    name: 'ShopIncome',
                    component: resolve => require(['../components/page/shop/shopIncome.vue'], resolve),
                    meta: { title: '工厂收益' }
                },
                {
                    path: '/user',
                    name: 'User',
                    component: resolve => require(['../components/page/user/user.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/superOrder',
                    name: 'SuperOrder',
                    component: resolve => require(['../components/page/order/superOrder.vue'], resolve),
                    meta: { title: '订单管理' }
                },
                {
                    path: '/superOrderDetail',
                    name: 'SuperOrderDetail',
                    component: resolve => require(['../components/page/order/superOrderDetail.vue'], resolve),
                    meta: { title: '系统订单详情' }
                },
            ]
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
