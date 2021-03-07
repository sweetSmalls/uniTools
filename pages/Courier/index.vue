<template>
	<view>1212</view>
</template>

<script>
	import { courier } from '@/util/api.js'
	export default {
		name:'Couroter',
		data () {
			return {
				
			}
		},
		onLoad(){
			this.init();
		},
		methods:{
			async init(){
				let params = {
					number:'777036272288036'
				}
				let data = await courier(params)
				console.log(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
