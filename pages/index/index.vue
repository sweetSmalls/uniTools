<template>
	<view class="content">
		<!-- 轮播图组件 -->
		<view class="swiperCon">
			<u-swiper 
			:list="list" 
			:effect3d="true" 
			duration="1000" 
			:autoplay='true' 
			bg-color="#fff"></u-swiper>
		</view>
		<!-- 按钮列表组件 -->
		<view class="btnPanel">
			<view class="linePanel">
				<view class="btnLine" v-for="(item,index) in btnPanels" :key='index'>
					<image :src="item.image" class="imgInfo"></image>
					<view class="imgText">{{item.title}}</view>
				</view>
			</view>
		</view>
		<!-- 热搜 -->
		<view class="hotPanel">
			<view class="hotBox">
				<view class="hotLeft">
					<image :src="hotImage"></image>
				</view>
				<view class="hotRight">
				</view>
			</view>
		</view>
		<!-- 热门功能 -->
		<view class="hotFunc">
			<view class="hotFunBox">
				<text>热门功能</text>
				<view class="hotDetails">
					<view class="detailine" v-for="(item,index) in hotFunPanel" :key='index'>
						<image :src="item.image" class="hotDetailImg"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 精品推荐 -->
		<view class="hotFunc">
			<view class="hotFunBox">
				<text>精品推荐</text>
				<view class="jingPinPanel">
					<!-- 布局一大三小 -->
					<view class="boxTop">
						<image src="https://cdn.uviewui.com/uview/swiper/1.jpg" class="topImage"></image>
					</view>
					<view class="boxTop">
						<view class="boxSmall">
							<image src="https://cdn.uviewui.com/uview/swiper/2.jpg" class="topImage"></image>
						</view>
						<view class="boxSmall">
							<image src="https://cdn.uviewui.com/uview/swiper/3.jpg" class="topImage"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import load from '../../loading/loading.vue';
	import { tableList } from './index.js'
	export default {
		name:'mainPage',
		components:{
			load
		},
		data() {
			return {
				hotImage:require('../../static/assest/hot.png'),
				mainImage:'https://cdn.uviewui.com/uview/swiper/1.jpg',
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				btnPanels:[
					{
						image:require('../../static/assest/ji1.png'),
						title:'毒鸡汤'
					},
					{
						image:require('../../static/assest/tianqi1.png'),
						title:'天气查询'
					},
					{
						image:require('../../static/assest/laji1.png'),
						title:'垃圾分类'
					},
					{
						image:require('../../static/assest/kuaidi1.png'),
						title:'快递查询'
					},
					{
						image:require('../../static/assest/music1.png'),
						title:'音乐热评'
					}
				],
				hotFunPanel:[
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '第一张'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '第二张'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '第三张'
					}
				]
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init(){
				let froms ={
					num:10,
					page:1
				}
				let data = await tableList(froms);
				console.log('数据展示',data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiperCon{
		margin:24rpx 0rpx;
	}
	.btnPanel{
		width: 100%;
		box-shadow: 0px 10px 36px 0px rgba(136, 83, 45, 0.1);
		.linePanel{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 90%;
			overflow: hidden;
			margin-left: 5%;
			height: 200rpx;
		}
		.btnLine{
			width: 18%;
			height: 160rpx;
			.imgInfo{
				width: 100%;
				height: 100rpx;
				border-radius: 8px;
			}
			.imgText{
				width: 100%;
				text-align: center;
				color: gray;
			}
		}
	}
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
	.hotFunc{
		width: 100%;
		margin-top: 40rpx;
		.hotFunBox{
			width: 94%;
			margin-left: 3%;
			text{
				font-size: 30rpx;
				font-weight: 600;
			}
			.hotDetails{
				margin-top: 20rpx;
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.detailine{
					width: 30%;
					border-radius: 12rpx;
					height: 130rpx;
					overflow: hidden;
					.hotDetailImg{
						width: 100%;
						height: 130rpx;
					}
				}
			}
		}
	}
	.jingPinPanel{
		width: 100%;
		height:500rpx;
		.boxTop{
			width: 100%;
			height: 180rpx;
			margin-top: 30rpx;
			display: flex;
			border-radius: 12rpx;
			overflow: hidden;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.boxSmall{
				overflow: hidden;
				border-radius: 12rpx;
				width: 47%;
				height: 180rpx;
			}
		}
	}
	.topImage{
		width: 100%;
		height: 180rpx;
	}
	

</style>
