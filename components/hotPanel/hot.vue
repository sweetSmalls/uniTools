<template>
	<view>
		<view class="hotPanel">
			<view class="hotBox">
				<view class="hotLeft">
					<image :src="hotImage"></image>
				</view> 
				<view class="hotRight">
					<view class="uni-swiper-msg-myflex">
						<swiper class="limitp-hg" vertical="true" autoplay="true" circular="true" interval="3000">
							<swiper-item v-for="(item, index) in hotlist" :key="index" @tap="detailsNew(item)">
								<view class="scrool-list-item">{{item.title}}</view>
							</swiper-item>
						</swiper>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'hotPanel',
		props:['hotlist'],
		data () {
			return {
				hotImage:require('../../static/assest/news.png'),
				msg:[1,2,3,4,5,6,7,8,9,12,13]
			}
		},
		methods:{
			detailsNew(params) {
				console.log(params.id)
				uni.navigateTo({
				    url: '/pages/newList/index?id='+params.id
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	.hotPanel{
		width: 100%;
		margin-top: 40rpx;
		.hotBox{
			width: 94%;
			margin-left: 3%;
			border-radius: 6rpx;
			height: 60rpx;
			background-color: #fdf6e1;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.hotLeft{
				width: 10%;
				image{
					margin-left: 10rpx;
					margin-top: 10rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}
			.hotRight{
				width:90%;
				height: 60rpx;
			}
		}
	}
	.uni-swiper-msg-myflex{
		display: flex;
	}
	
	.left-Iocn{
		width: 40rpx;
		height: 60rpx;
		line-height: 60rpx;	
	}
	
	.limitp-hg{
		width:calc(100% - 20rpx);
		height: 60rpx;
		line-height: 60rpx;
	}
	
	.scrool-list-item{
		font-size: 28rpx;
		width: 100%;
		color: gray;
		white-space: nowrap;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    word-break: break-all;
		
	}
</style>
