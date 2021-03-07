<template>
	<view>
		<rich-text :nodes="htmlContent"></rich-text>
		<view class="imagePanel">
			<view v-for="(item,index) in imagelist" :key='index' class="line" >
				<image :src="item"></image>
			</view>
		</view>
		<loading></loading>
		<scrollTop :scrollHeight='scrollHeight'></scrollTop>
	</view>
</template>

<script>
	import { newDetails } from '@/util/api.js'
	import loading from '@/loading/loading.vue'
	import scrollTop from '@/components/scrollPanel/index.vue'
	export default {
		name :'newList',
		comments:{
			loading,
			scrollTop
		},
		props:['scrollHeight'],
		data () {
			return {
				scrollHeight:0,
				htmlContent:'',
				imagelist:[]
			}
		},
		onPageScroll(e) {
			this.scrollHeight = e.scrollTop;
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
