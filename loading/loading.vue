<template>
	<view>
		<u-loading 
			mode="circle" 
			:show="loadStatus"
			size="56"
			color='#FF6321'
		></u-loading>
	</view>
</template>

<script>
	export default {
		name: 'loading',
		data () {
			return {
				show:true
			}
		},
		computed:{
			loadStatus(){
				return this.$store.state.loadingStaus
			}
			
		},
		onLoad(){
			
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
