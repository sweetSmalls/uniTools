<template>
	
	<view >
		<u-back-top
			:scrollTop="scrollTop" 
			:mode="mode" 
			:duration='200'
			:icon-style="iconStyle"
			:custom-style='customStyle'/>
	</view>
</template>
<script>
	export default {
		name: 'scrolls',
		props:['scrollTop'],
		data () {
			return {
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
		},
		methods:{
		}
	}
</script>

<style lang="scss" >
	
</style>
