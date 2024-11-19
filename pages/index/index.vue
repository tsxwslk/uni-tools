<template>
	<view class="page">
		<scroll-view class="scroll-box" scroll-y>
			<swiper class="swiperBox" indicator-dots circular interval="2000" indicator-color="#F5F3F7"
				indicator-active-color="#D6C6E1" @change="handleChangeSwiper">
				<swiper-item>
					<view class="swiper-item-1">
						<view class="all-list-title">
							所有清单
						</view>
						<view class="all-list-total">
							{{dataList.length}}
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item-2">
						准备吃什么？
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item-3">阅读时钟</view>
				</swiper-item>
			</swiper>
			<view class="list-area" v-if="currentIndex===0">
				<view class="new-list" v-if="dataList&&dataList.length">
					<text class="list-title">最新清单</text>
					<view class="list-content">
						<view v-for="(item,index) in showList" :key="item.id" class="list-item">
							<view class="item-icon">
								<text>{{status.find(it=>it.type==item.status).value.slice(0,1)}}</text>
							</view>
							<view class="item-content">
								<view class="content-title">
									<view class="title-text">
										{{item.name}}
									</view>
									<view class="title-badge">
										{{dicts.find(it=>it.type==item.type).value}}
									</view>
								</view>
								<view class="content-time">
									开始时间：{{item.startDate}}
								</view>
							</view>
						</view>
						<view v-if="dataList.length>5" style="margin: 20px 0 0 10px;">……</view>
					</view>
				</view>
				<view class="none-list" v-else>
					还没有清单，点击下方<text class="strong">清单</text>开始添加吧
				</view>
			</view>
			<view class="eat-area" v-if="currentIndex===1">
				<view class="eat-title">
					选择困难症开始：
				</view>
				<view class="eat-btn" @click="randomHandle" :class="{isDisable:!randomClick}">
					随机
				</view>
				<view class="eat-confirm">
					<view class="food-list">
						决定了！今天就吃：<br />
						<text v-if="showFood">{{currentText}}</text>
					</view>
				</view>
			</view>
			<view class="clock-area" v-if="currentIndex===2">
				<view class="container">
					<view class="dot" @click="handleClock">
						<text v-if="!padStatus">开始</text>
						<text v-else>暂停</text>
					</view>
					<view class="pulse" v-if="padStatus"></view>
					<view class="pulse1" v-if="padStatus"></view>
				</view>

				<view class="time-area">
					{{ formattedTime }}
					<uni-icons @click="reset" type="refreshempty" size="20" color="#61398F" style="margin-left:30px"></uni-icons>
				</view>
				<view class="show-relax" v-if="hours>=1">
					<image src="../../static/tea.png" style="width:150px;height: 150px;"></image>
					<view class="relax-text">
						已经阅读超过一小时啦，休息休息吧~
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
	} from 'vue'
	import {
		storeToRefs
	} from "pinia"
	import {
		useCounterStore
	} from '@/store/counter.js'
	const counter = useCounterStore()
	const {
		dataList,
		dicts,
		status,
		foodList
	} = storeToRefs(counter)
	const showList = dataList.value.length > 5 ? dataList.value.slice(0, 5) : dataList.value
	const currentIndex = ref(0)
	const foodIndex = ref(0)
	const showFood = ref(false)
	const intervalId = ref(null)
	const currentText = ref('')
	const handleChangeSwiper = function(current) {
		currentIndex.value = current.detail.current
	}
	const randomClick=ref(true)
	const randomHandle = function() {
		showFood.value = true
		randomClick.value=false
		intervalId.value = setInterval(() => {
			currentText.value = foodList.value[Math.floor(Math.random() * foodList.value.length)];
		}, 50);
		setTimeout(() => {
			clearInterval(intervalId.value);
			randomClick.value=true
		}, 1000);
	}

	const seconds = ref(0)
	const minutes = ref(0)
	const hours = ref(0)
	const clock = ref(null)
	const pad = function(value) {
		return value.toString().padStart(2, '0');
	}
	const padStatus = ref(false)
	const handleClock = function() {
		padStatus.value = !padStatus.value
		if (padStatus.value) {
			start()
		} else {
			stop()
		}
	}
	const start = function() {
		if (!clock.value) {
			clock.value = setInterval(() => {
				seconds.value++;
				if (seconds.value === 60) {
					seconds.value = 0;
					minutes.value++;
					if (minutes.value === 60) {
						minutes.value = 0;
						hours.value++;
					}
				}
			}, 1000);
		}
	}
	const stop = function() {
		if (clock.value) {
			clearInterval(clock.value);
			clock.value = null;
		}
	}
	const reset = function() {
		padStatus.value=false
		stop();
		seconds.value = 0;
		minutes.value = 0;
		hours.value = 0;
	}

	let formattedTime = computed({
		get() {
			return [
				pad(hours.value),
				pad(minutes.value),
				pad(seconds.value),
			].join(':')
		}
	})
</script>

<style lang="scss" scoped>
	.page {
		background: #F5F3F7;

		.swiperBox {
			width: 100vw;
			height: 200px;

			swiper-item {
				width: 100%;
				height: 200px;

				.swiper-item-1,
				.swiper-item-2,
				.swiper-item-3 {
					width: 100%;
					height: 200px;
					background: linear-gradient(to right, #8B5FBF, #61398F);
					border-radius: 5px;
					color: #fff;
				}

				.all-list-title {
					width: 100%;
					height: 50px;
					padding-left: 50px;
					padding-top: 40px;
					font-weight: 700;
				}

				.all-list-total {
					width: 100%;
					height: 70px;
					padding-left: 50px;
					line-height: 70px;
					font-size: 60px;
					font-weight: 400;
				}

				.swiper-item-2,
				.swiper-item-3 {
					width: 100%;
					height: 200px;
					line-height: 200px;
					text-align: center;
					font-size: 35px;
				}
			}
		}

		.list-area {
			color: #4A4A4A;

			.new-list {
				margin: 100px 50px;

				.list-title {
					font-size: 20px;
				}

				.list-content {
					margin: 30px 10px;

					.list-item {
						height: 60px;
						margin-top: 12px;
						display: flex;
						justify-content: space-between;

						.item-icon {
							width: 60px;
							height: 60px;
							border-radius: 50%;
							background: #9A73B5;
							color: #fff;
							line-height: 60px;
							text-align: center;
							font-weight: 700;
							font-size: 20px;
						}

						.item-content {
							width: calc(100% - 80px);
							height: 60px;

							.content-title {
								height: 30px;
								line-height: 30px;
								font-size: 16px;
								font-weight: 700;
								color: #4A4A4A;
								display: flex;
								justify-content: space-between;

								.title-text {
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									width: calc(100% - 60px);
								}

								.title-badge {
									background: #9A73B5;
									border-radius: 5px;
									width: 50px;
									height: 30px;
									color: #fff;
									text-align: center;
									line-height: 30px;
									font-size: 12px;
									margin-top: 10px;
								}
							}

							.content-time {
								height: 30px;
								line-height: 30px;
								font-size: 14px;
								font-weight: 400;
								color: #878787;
							}
						}
					}
				}
			}

			.none-list {
				width: 100vw;
				margin-top: 200px;
				text-align: center;

				.strong {
					font-weight: 700;
				}
			}
		}

		.eat-area {
			color: #4A4A4A;
			height: calc(100% - 200px);
			width: 100%;

			.eat-title {
				width: 100%;
				height: 100px;
				line-height: 100px;
				text-align: center;
				color: #4A4A4A;
				font-size: 20px;
				font-weight: 700;
			}

			.eat-btn {
				width: 150px;
				height: 150px;
				margin: 50px auto;
				border-radius: 50%;
				background: #9A73B5;
				text-align: center;
				line-height: 150px;
				color: #fff;
				font-size: 28px;
				font-weight: 700;				
			}
			.isDisable{
				pointer-events: none;
				background: #E9E4ED;
			}
			.food-list {
				padding-top: 20px;
				width: 250px;
				height: 120px;
				margin: 0 auto;
				background: #9A73B5;
				border-radius: 5px;
				color: #fff;
				text-align: center;
				font-size: 18px;
				font-weight: 700;
				line-height: 40px;
			}
		}

		.clock-area {
			.time-area {
				width: 100%;
				height: 60px;
				font-size: 20px;
				font-weight: 700;
				line-height: 60px;
				color: #4A4A4A;
				text-align: center;
			}

			.show-relax {
				width: 100%;
				margin-top: 10px;
				text-align: center;

				.relax-text {
					width: 100%;
					text-align: center;
					margin-top: 20px;
					font-size: 18px;
					font-weight: 700;
				}
			}

			@keyframes warn {
				0% {
					transform: scale(0.1);
					-webkit-transform: scale(0.1);
					opacity: 0.0;
				}

				25% {
					transform: scale(0.25);
					-webkit-transform: scale(0.25);
					opacity: 0.1;
				}

				50% {
					transform: scale(0.5);
					-webkit-transform: scale(0.5);
					opacity: 0.3;
				}

				75% {
					transform: scale(0.6);
					-webkit-transform: scale(0.6);
					opacity: 0.5;
				}

				100% {
					transform: scale(0.7);
					-webkit-transform: scale(0.7);
					opacity: 0.0;
				}
			}

			@keyframes warn1 {
				0% {
					transform: scale(0.3);
					-webkit-transform: scale(0.3);
					opacity: 0.0;
				}

				25% {
					transform: scale(0.3);
					-webkit-transform: scale(0.3);
					opacity: 0.1;
				}

				50% {
					transform: scale(0.3);
					-webkit-transform: scale(0.3);
					opacity: 0.3;
				}

				75% {
					transform: scale(0.4);
					-webkit-transform: scale(0.4);
					opacity: 0.5;
				}

				100% {
					transform: scale(0.6);
					-webkit-transform: scale(0.6);
					opacity: 0.0;
				}
			}

			.container {
				position: relative;
				width: 100%;
				height: 300px;
			}

			/* 保持大小不变的小圆圈 何问起 */
			.dot {
				position: absolute;
				margin: 0 auto;
				width: 150px;
				height: 150px;
				left: calc((100% - 150px) / 2);
				top: 80px;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				background: rgba(97, 57, 143, 0.9);
				box-shadow: 1px 1px 5px #61398F, 1px 1px 10px #61398F, 1px 1px 15px #61398F;
				border-radius: 50%;
				z-index: 2;
				color: #fff;
				text-align: center;
				line-height: 150px;
				font-size: 20px;
			}

			/* 产生动画（向外扩散变大）的圆圈  */
			.pulse {
				position: absolute;
				width: 320px;
				height: 320px;
				left: calc((100% - 330px)/2);
				top: -10px;
				border: 6px solid rgba(97, 57, 143, 0.7);
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
				z-index: 1;
				opacity: 0;
				-webkit-animation: warn 2s linear;
				-moz-animation: warn 2s linear;
				animation: warn 2s linear;
				-webkit-animation-iteration-count: infinite;
				-moz-animation-iteration-count: infinite;
				animation-iteration-count: infinite;
				box-shadow: 1px 1px 30px rgba(97, 57, 143, 0.8);
			}

			.pulse1 {
				position: absolute;
				width: 320px;
				height: 320px;
				left: calc((100% - 330px)/2);
				top: -10px;
				border: 6px solid rgba(97, 57, 143, 0.9);
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
				z-index: 1;
				opacity: 0;
				-webkit-animation: warn1 2s linear;
				-moz-animation: warn1 2s linear;
				animation: warn1 2s linear;
				-webkit-animation-iteration-count: infinite;
				-moz-animation-iteration-count: infinite;
				animation-iteration-count: infinite;
				box-shadow: 1px 1px 30px rgba(97, 57, 143, 0.9);
			}
		}
	}
</style>