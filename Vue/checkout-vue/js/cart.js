Vue.prototype.$http = axios;

new Vue({
	el: '#app',
	data: {
		productList: [],
		totalMoney: 0
	},
	//局部过滤器
	filters: {
		formatMoney(value) {
			return '￥ ' + value.toFixed(2);
		}
	},
	//实例创建完后
	mounted() {
		//将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
		this.$nextTick(() =>　this.cartView());
	},
	methods: {
		cartView() {
			this.$http.get('../data/cart.json')
				.then(res => {
					this.productList = res.data.result.productList;
					this.totalMoney = res.data.result.totalMoney;
				});
		}
	}
})

// 全局过滤器，实现多页面公用
Vue.filter('money', (value, type) => {
	return '￥ ' + value.toFixed(2) + type;
})