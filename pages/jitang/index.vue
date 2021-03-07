<template>
	 <view class="SayPanel">
	      <view class="containers">
	           <image :src="imgUrls" class="imgs"></image>
	           <view class="cotents">
	               <view class="tits">{{content}}</view>
	           </view>
	           <view class="nings">
	               <view class="gos" style="background:#606075" @click="init">再来一口</view>
	                <view class="gos"> <button class="infoTitle" open-type="share"> 分享土味情话</button></view>
	           </view>
	           
	      </view>
	  </view>
</template>
<script>
	import { jiTangs } from '@/util/api.js'
	export default {
		name:'jitang',
		data () {
		    return {
				content:'',
		        imgUrls:require('../../static/assest/303.jpg'),
		    }
		},
		onLoad(){
			this.init();
		},
		methods:{
			async init(){
				let data = await jiTangs({});
				this.content = data.content;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	button::after{
	  border: none;
	}
	  .infoTitle{
	         height: 80rpx;
	        color: white;
	          border-radius: 6px;
	        line-height: 80rpx;
	        background-color: orange;
	
	    }
	.SayPanel{
	    width:100%;
	}
	.containers{
	    width: 90%;
	    margin-left: 5%;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	}
	.imgs{
	    width: 300rpx;
	    height: 300rpx;
	}
	.imginfo{
	    width: 400rpx;
	    height: 400rpx;
	}
	.cotents{
		box-shadow: 0px 10px 36px 0px rgba(136, 83, 45, 0.1);
	    // box-shadow: 0 0 16rpx #615f5c;
	    min-height: 240rpx;
	    width: 100%;
	    margin-top: 60rpx;
	    border-radius: 6px;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    .tits{
	        width: 90%;
	        margin-left: 5%;
			font-weight: bold;
			font-size: 16px;
	    }
	}
	.nings{
	    width: 100%;
	    height: 220rpx;
	    display: flex;
	    flex-direction: row;
	    justify-content: space-around;
	    align-items: center;
	}
	.gos{
	    width: 45%;
	    height: 86rpx;
	    background-color: orange;
	    color: white;
	    border-radius: 6px;
	    text-align: center;
	    line-height: 86rpx;
	}
</style>
