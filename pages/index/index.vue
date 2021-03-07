<template>
	<view class="content">
		<!-- 轮播图组件 -->
		<view class="swiperCon">
			<u-swiper 
			:list="list" 
			:effect3d="true" 
			duration="1000" 
			height='300'
			:title="true"
			:autoplay='true' 
			bg-color="#fff"></u-swiper>
		</view>
		<!-- 按钮列表组件 -->
		<view class="btnPanel  u-skeleton">
			<view class="linePanel">
				<view class="btnLine" v-for="(item,index) in btnPanels" :key='index'>
					<image :src="item.image" class="imgInfo"></image>
					<view class="imgText">{{item.title}}</view>
				</view>
			</view>
		</view>
		<!-- 热搜 -->
		<hot-panel :hotlist='hotlist'></hot-panel>
		<!-- 热门功能 -->
		<view class="hotFunc">
			<view class="hotFunBox">
				<text class="titleInfo">热门功能</text>
				<view class="hotDetails">
					<view class="detailine" v-for="(item,index) in hotFunPanel" :key='index'>
						<image :src="item.image" class="hotDetailImg"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 精品推荐 -->
		<view class="hotFunc positionBottom">
			<view class="hotFunBox">
				<text class="titleInfo">精品推荐</text>
				<view class="jingPinPanel">
					<view class="boxTop">
						<image src="https://cdn.uviewui.com/uview/swiper/1.jpg" class="topImage"></image>
					</view>
					<view class="newTops">
						<view class="boxSmall">
							<image src="https://cdn.uviewui.com/uview/swiper/2.jpg" class="topImage"></image>
						</view>
						<view class="boxSmall">
							<image src="https://cdn.uviewui.com/uview/swiper/3.jpg" class="topImage"></image>
						</view>
						<view class="boxSmall">
							<image src="https://cdn.uviewui.com/uview/swiper/3.jpg" class="topImage"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<loading></loading>
		<scrolltop :scrollTop='scrollTop'></scrolltop>
	</view>
</template>
<script>
	import scrolltop from '@/components/scrollPanel/index.vue'
	import hotPanel from '@/components/hotPanel/hot.vue'
	import { tableList } from '@/util/api.js'
	import loading from '@/loading/loading.vue'
	export default {
		name:'mainPage',
		components:{
			hotPanel,
			scrolltop,
			loading
		},
		data() {
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
				hotlist:null, // 热搜列表
				loading: true, // 是否显示骨架屏组件
				hotImage:require('../../static/assest/hot.png'),
				mainImage:'https://cdn.uviewui.com/uview/swiper/1.jpg',
				list: [{
						image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=371254519,2214554290&fm=26&gp=0.jpg',
						title: '高山挡不住我的阔身板，大河拦不住我的风火轮。'
					},
					{
						image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1287804773,4265994566&fm=26&gp=0.jpg',
						title: '接受成长，也接受所有的不欢而散。'
					},
					{
						image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1952205055,4277714259&fm=26&gp=0.jpg',
						title: '一言网络，以传递更多的感动'
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
					},
					{
						image:require('../../static/assest/xiao.png'),
						title:'会心大笑'
					},
					{
						image:require('../../static/assest/lishi.png'),
						title:'历史今日'
					},
					{
						image:require('../../static/assest/dog.png'),
						title:'舔狗日记'
					},
					{
						image:require('../../static/assest/yizhi.png'),
						title:'益智解谜'
					},
					{
						image:require('../../static/assest/fanyi.png'),
						title:'AI翻译'
					}
				],
				hotFunPanel:[
					{
						image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3239432236,1435795891&fm=26&gp=0.jpg',
						title: '第一张'
					},
					{
						image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=296155362,266518935&fm=15&gp=0.jpg',
						title: '第二张'
					},
					{
						image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=859148189,1045198303&fm=26&gp=0.jpg',
						title: '第三张'
					}
				]
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.init()
		},
		onShareAppMessage() {
			
		},
		onShow(){
			wx.showShareMenu({
						  withShareTicket: true,
						  menus: ['shareAppMessage', 'shareTimeline']
						})
			
		},
		methods: {
			// 获取热搜列表
			async init(){
				let data = await tableList({});
				this.hotlist = data.stories
				console.log('数据展示',this.hotlist)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiperCon{
		margin:24rpx 0rpx;
	}
	.btnPanel{
		margin-top: 40rpx;
		width: 100%;
		overflow: hidden;
		background-color: white;
		.linePanel{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			overflow: hidden;
			flex-wrap: wrap;
		}
		.btnLine{
			width: 18%;
			.imgInfo{
				box-shadow: 0px 10px 36px 0px rgba(136, 83, 45, 0.1);
				width: 80%;
				margin-top: 20rpx;
				margin-left: 10%;
				height: 100rpx;
				border-radius: 8px;
			}
			.imgText{
				width: 100%;
				text-align: center;
				color: gray;
				font-size: 28rpx;
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
			.titleInfo{
				font-size: 32rpx;
				font-weight: 600;
			}
			.hotDetails{
				margin-top: 20rpx;
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.detailine{
					width: 32%;
					border-radius: 12rpx;
					height: 170rpx;
					overflow: hidden;
					.hotDetailImg{
						width: 100%;
						height: 170rpx;
					}
				}
			}
		}
	}
	.jingPinPanel{
		width: 100%;
		.boxTop{
			width: 100%;
			height: 220rpx;
			margin-top: 30rpx;
			border-radius: 12rpx;
				overflow: hidden;
			.boxSmall{
				width:100%;
				height: 220rpx;
			}
		}
	}
	.newTops{
		width: 100%;
		display: flex;
		margin-top: 30rpx;
		border-radius: 12rpx;
		overflow: hidden;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.boxSmall{
			overflow: hidden;
			border-radius: 12rpx;
			width: 32%;
			height: 250rpx;
		}
	}
	.topImage{
		width: 100%;
		height: 250rpx;
	}
	.positionBottom{
		margin-bottom: 120rpx;
	}

</style>
