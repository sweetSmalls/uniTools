<template>
	<view>
		<view class="hotPanel">
			<view class="hotBox">
				<view class="hotLeft">
					<image :src="hotImage"></image>
				</view>
				<view class="hotRight">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'hotPanel',
		data () {
			return {
				hotImage:require('../../static/assest/hot.png'),
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
				width:88%;
				height: 60rpx;
			}
		}
	}
</style>
