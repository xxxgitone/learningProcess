//定义（路由）组件，可以从其他文件import进来
const Foo = { template: `<div>Foo</div>`};
const Bar = { template: `<div>Bar</div>`};

//定义路由，每个路由应该映射一个组件
const routes = [
	{ path: '/foo', component: Foo},
	{ path: '/bar', component: Bar}

];

//创建router实例，传入routers
const router = new VueRouter({
	routes
});

//创建和挂载跟实例
//记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
	router
}).$mount('#app');



