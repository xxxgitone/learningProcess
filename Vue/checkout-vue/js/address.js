Vue.prototype.$http = axios;

new Vue({
	el: '.container',
	data: {
		addressList: [],
		limitNum: 3,
		curIndex: 0
	},
	mounted() {
		this.$nextTick(() => this.getAddressList());
	},
	computed: {
		filterAddress() {
			//不会影响原生数组
			return this.addressList.slice(0, this.limitNum);
		}
	},
	methods: {
		getAddressList() {
			this.$http.get('../data/address.json')
				.then(response => {
					let res = response.data;
					this.addressList = res.result;
				})
		},
		setDefault(addressId) {
			this.addressList.forEach((address, index) => {
				if (address.addressId === addressId ) {
					address.isDefault = true;
				} else {
					address.isDefault = false;
				}
			});
		}
	}
})