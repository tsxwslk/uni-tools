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
									开始时间：{{item.startTime}}
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
				<view class="eat-btn" @click="randomHandle">
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
				<view class="time-area">
					{{ formattedTime }}
				</view>
				<view class="time-btn">
					<view class="btn-item" @click="start">
						开始
					</view>
					<view class="btn-item" @click="stop">
						暂停
					</view>
					<view class="btn-item" @click="reset">
						重置
					</view>
				</view>
				<view class="show-relax" v-if="hours>1">
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
		computed
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
	const randomHandle = function() {
		showFood.value = true
		intervalId.value = setInterval(() => {
			currentText.value = foodList.value[Math.floor(Math.random() * foodList.value.length)];
		}, 50);
		setTimeout(() => {
			clearInterval(intervalId.value);
		}, 1000);
	}

	const seconds = ref(0)
	const minutes = ref(0)
	const hours = ref(0)
	const clock = ref(null)
	const pad = function(value) {
		return value.toString().padStart(2, '0');
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
				height: 180px;
				font-size: 20px;
				font-weight: 700;
				line-height: 180px;
				color: #4A4A4A;
				text-align: center;
			}

			.time-btn {
				display: flex;
				width: calc(100% - 160px);
				padding: 20px 80px;
				justify-content: space-between;

				.btn-item {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					background: #61398F;
					text-align: center;
					line-height: 50px;
					color: #fff;
				}
			}

			.show-relax {
				width: 100%;
				margin-top: 30px;
				text-align: center;

				.relax-text {
					width: 100%;
					text-align: center;
					margin-top: 20px;
					font-size: 18px;
					font-weight: 700;
				}
			}
		}
	}
</style>