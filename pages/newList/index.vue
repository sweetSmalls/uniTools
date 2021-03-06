<template>
	<view>
		<rich-text :nodes="htmlContent"></rich-text>
		<view class="imagePanel">
			<view v-for="(item,index) in imagelist" :key='index' class="line" >
				<image :src="item"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { newDetails } from '@/util/api.js'
	export default {
		name :'newList',
		data () {
			return {
				htmlContent:'',
				imagelist:[]
				
			}
		},
		onLoad: function (option) {
			this.init(option);
		},
		methods:{
			async init(option){
				let params ={
					id:option.id
				}
				let data = await newDetails(params)
				this.htmlContent = data.body
				this.imagelist = data.images
				console.log("***************8",data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.imagePanel{
		width: 80%;
		margin-left: 10%;
		overflow: hidden;
		min-height: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
		.line{
			width: 100%;
		}
	}
</style>
