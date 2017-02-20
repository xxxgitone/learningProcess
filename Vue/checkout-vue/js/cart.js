Vue.prototype.$http = axios;

new Vue({
	el: '#app',
	data: {
		productList: [],
		totalMoney: 0,
		checkAllFlag: false,
		delFlag: false,
		//删除的时候，确定删除的是哪一个
		curProduct: '',
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
		},
		changeMoney(product, way) {
			if (way > 0) {
				product.productQuentity++;
			} else {
				product.productQuentity--;
				if (product.productQuentity < 1) {
					product.productQuentity = 1;
				}
			};

			this.calcTotalMoney();
		},
		selectedProduct(product) {
			//在这个案例中是没有checked这个字段的
			//当数据模型里面没有这个字段的时候，使用Vue.set注册
			if (typeof product.checked === 'undefined') {
				// 这里使用的是全局注册
				// Vue.set(product, 'checked', true);

				// 局部注册
				this.$set(product, 'checked', true);
			} else {
				product.checked = !product.checked;
			};

			this.calcTotalMoney();
		},
		checkAll(flag) {
			this.checkAllFlag = flag;
			this.productList.forEach(item => {
				if (typeof item.checked === 'undefined') {
					this.$set(item, 'checked', flag);
				} else {
					item.checked = !item.checked;
				}
			});

			this.calcTotalMoney();
		},
		calcTotalMoney() {
			this.totalMoney = 0;
			this.productList.forEach(item => {
				if (item.checked) {
					this.totalMoney += item.productPrice * item.productQuentity;
				}
			});
		},
		delConfirm(item) {
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct() {
			const index = this.productList.indexOf(this.curProduct);
			//模拟删除，真实情况需要调用后台，
			this.productList.splice(index, 1);
			this.delFlag = false;
		}
	}
});

// 全局过滤器，实现多页面公用
Vue.filter('money', (value, type) => {
	return '￥ ' + value.toFixed(2) + type;
});