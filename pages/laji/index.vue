<template>
	<view class="lajiContainer">
		<view class="laji_top">
			<image :src="imgInfo" class="imgInfo"></image>
		</view>
		<view class="liji_text">保护环境，人人有责</view>
		<!-- <view class="lajiPanel">
			<view class="panelLeft">
				<image :src="shiImg" class="shiImage"></image>
			</view>
			<view class="panelRight"></view>
		</view> -->
		<view class="searchInfo">
			<u-search 
				placeholder="苹果" 
				v-model="keyword" 
				border-color='#FF6321'
				bg-color='#fff'
				@custom='customInfo'
				@change="changeInfo"
				:animation="true"></u-search>
		</view>
		<view class="contentPanel" v-show="hideStaus">
			<view style="font-size: 16px;">{{this.keyword}} 可能属于以下垃圾:</view>
			<view class="lineInfo" v-for="(item,index) in list" :key='index'>
				<view class="infoLeft">{{item.name}}</view>
				<view class="infoRight">{{item.type}}</view>
			</view>
		</view>
		<view class="noneInfo" v-show="noneStatus">暂未找到与" {{this.keyword}}" 相关信息</view>
		<loading></loading>
	</view>
</template>

<script>
	// https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2840926622,1272789542&fm=26&gp=0.jpg
	// https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1964117614,481964367&fm=26&gp=0.jpg
	import { laJi } from '@/util/api.js'
	import loading from '@/loading/loading.vue'
	export default {
		name :'laji',
		components:{
			loading
		},
		data(){
			return{
				keyword:'苹果',
				list:[],
				noneStatus:false,
				hideStaus:false,
				shiImg:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2840926622,1272789542&fm=26&gp=0.jpg',
				imgInfo:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1533843193,3589746209&fm=26&gp=0.jpg',
			}
		},
		onLoad(){
		},
		methods:{
			changeInfo(){
				this.hideStaus =false;
				this.noneStatus =false;
			},
			// 搜索数据
			async customInfo(){
				console.log(this.keyword)
				let params = {
					name:this.keyword,
					page:1,
					num:20
				}
				let data = await laJi(params);
				console.log('数据',data)
				if(data.length > 0){
					this.hideStaus =true
					this.noneStatus =false
					this.list = data;
					this.list.forEach((item)=>{
						if(item.type == 1){
							item.type ='可回收垃圾'
						}else if(item.type == 2){
							item.type ='有害垃圾'
						}else if(item.type == 3){
							item.type='厨余垃圾/湿垃圾'
						}else{
							item.type='其他/干垃圾'
						}
					})
				}else{
					this.hideStaus =false
					this.noneStatus =true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shiImage{
		width: 100%;
		height: 240rpx;
	}
	.lajiPanel{
		width: 100%;
		height: 320rpx;
		border: 1px solid blue;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.panelLeft{
			width: 35%;
			height: 300rpx;
			border: 1px solid red;
		}
		.panelRight{
			width: 60%;
			height: 300rpx;
			border: 1px solid green;
		}
	}
	.laji_top{
		width: 100%;
		.imgInfo{
			width: 100%;
			height: 380rpx;
		}
	}
	.liji_text{
		width: 100%;
		height: 120rpx;
		text-align: center;
		font-size: 16px;
		color: #FF6321;
		font-weight: 500;
		line-height: 120rpx;
	}
	.noneInfo{
		width: 100%;
		height: 120rpx;
		text-align: center;
		font-size: 14px;
		color: #FF6321;
		font-weight: 500;
		line-height: 120rpx;
	}
	.searchInfo{
		width: 90%;
		margin-left: 5%;
	}
	.contentPanel{
		width: 90%;
		margin-left: 5%;
		height: 300rpx;
		margin-top: 30rpx;
		.lineInfo{
			width: 100%;
			height: 80rpx;
			border-bottom: 1px solid orange;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			color: gray;
			.infoLeft{
				width: 30%;
			}
			.infoRight{
				width: 60%;
			}
		}
		.lineInfo:last-child{
			border-bottom: none;
		}
	}
</style>
