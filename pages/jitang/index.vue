<template>
	 <view class="SayPanel">
	      <view class="containers" v-show="type=='1'">
	           <image :src="imgUrls" class="imgs"></image>
	           <view class="cotents">
	               <view class="tits">{{content}}</view>
	           </view>
	           <view class="nings">
	               <view class="gos" style="background:#606075" @click="init">再来一口</view>
	                <view class="gos"> <button class="infoTitle" open-type="share"> 分享毒鸡汤</button></view>
	           </view>
	      </view>
		  <view class="containers" v-show="type=='2'">
		       <image :src="imgUrlInfo" class="imgs"></image>
		       <view class="cotents">
		           <view class="tits">{{content}}</view>
		       </view>
		       <view class="nings">
		           <view class="gos" style="background:#606075" @click="init">再来一打</view>
		            <view class="gos"> <button class="infoTitle" open-type="share"> 分享土味情话</button></view>
		       </view>
		  </view>
		  <loading></loading>
	  </view>
</template>
<script>
	import { jiTangs, qingHua } from '@/util/api.js'
	import loading from '@/loading/loading.vue'
	export default {
		name:'jitang',
		components:{
			loading
		},
		data () {
		    return {
				content:'',
				type:'1',
		        imgUrls:require('../../static/assest/303.jpg'),
				imgUrlInfo:require('../../static/assest/753.jpg')
		    }
		},
		onLoad(option){
			uni.setNavigationBarTitle({
			    title:option.type
			})
			this.init(option);
		},
		methods:{
			async init(params){
				this.type = params.type === '毒鸡汤' ? '1' : '2';
				
				if(this.type == '1'){
					let data = await jiTangs({});
					this.content = data.content;
				}else{
					let data = await qingHua({});
					this.content = data.content;
				}
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
