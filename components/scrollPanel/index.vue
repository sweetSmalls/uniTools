<template>
	<view>
		<u-back-top
			:scrollTop="scrollTop" 
			:mode="mode" 
			:duration='200'
			:icon-style="iconStyle"
			:custom-style='customStyle'></u-back-top>
	</view>
</template>
<script>
	export default {
		name: 'scrolls',
		data () {
			return {
				scrollTop: 0,
				mode: 'circle',
				iconStyle: {
					fontSize: '32rpx',
					color: '#FFF'
				},
				customStyle:{
					backgroundColor:'#FF6321'
				},
			}
		},
		onLoad(){
			console.log(888)
			this.init()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods:{
			init(){
				console.log(4545)
			}
		}
	}
</script>

<style>
</style>
