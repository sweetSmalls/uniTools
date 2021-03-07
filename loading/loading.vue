<template>
	<view class="loadCon">
		<u-loading 
			mode="circle" 
			:show="loadStatusInfo"
			size="68"
			color='#FF6321'
		></u-loading>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				show:true
			}
		},
		computed:{
			loadStatusInfo(){
				return this.$store.state.loadingStatus
			}
		},
		onLoad(){
			this.init()
		},
		methods: {
			init(){
				alert(121)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.loadCon{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
