<template>
	<view class="page">
		<view class="list-header">
			<view class="header-btn">
				<view class="btn-item" :style="{background:item.value===listType?'#61398F':'#8B5FBF'}"
					v-for="item in headerList" :key="item.value" @click="selectType(item.value)">
					{{item.label}}
				</view>
			</view>
			<view class="add-btn">
				<navigator url="/pages/list/editItem/editItem?type=add" hover-class="navigator-hover">
					<uni-icons type="plus-filled" size="40" color="#8B5FBF"></uni-icons>
				</navigator>
			</view>
		</view>
		<view class="list-content">
			<view v-for="(item,index) in showList" :key="item.id" class="list-item">
				<view class="item-icon">
					<uni-icons type="star" size="28" color="#8B5FBF" v-if="item.status===1"></uni-icons>
					<uni-icons type="starhalf" size="28" color="#8B5FBF" v-if="item.status===2"></uni-icons>
					<uni-icons type="star-filled" size="28" color="#8B5FBF" v-if="item.status===3"></uni-icons>
				</view>
				<view class="item-content">
					<view class="content-title">
						<view class="title-text">
							{{item.name}}
						</view>
						<view class="title-badge">
							{{dicts.find(it=>it.type==item.type).value}}
						</view>
						<img src="../../static/edit.svg" style="height: 30px;width: 30px;margin-top: 10px;"
							@click="jumpToEdit(item)" />
					</view>
					<view class="content-time">
						开始时间：{{item.startDate}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
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
		dicts
	} = storeToRefs(counter)
	const headerList = ref([{
		value: 0,
		label: '全部'
	}, {
		value: 1,
		label: '未完成'
	}, {
		value: 2,
		label: '进行中'
	}, {
		value: 3,
		label: '已完成'
	}, ])
	const preList = dataList.value.filter(item => item.status === 1)
	const ingList = dataList.value.filter(item => item.status === 2)
	const edList = dataList.value.filter(item => item.status === 3)
	const listType = ref(0)
	const showList = ref({})
	const selectType = function(type) {
		listType.value = type
		if (type === 0) {
			showList.value = dataList.value
		} else {
			showList.value = JSON.parse(JSON.stringify(dataList.value.filter(item => item.status === type)))
		}
	}
	onMounted(() => {
		selectType(listType.value)
	})

	const jumpToEdit = function(item) {
		const params = encodeURIComponent(JSON.stringify(item))
		uni.navigateTo({
			url: `/pages/list/editItem/editItem?type=edit&params=${params}` // 带参数的 URL
		});
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		padding-top: 20rpx;
		color: #4A4A4A;

		.list-header {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 60px;

			.header-btn {
				width: calc(100% - 120px);
				padding: 0 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #fff;

				.btn-item {
					width: 22%;
					height: 40px;
					background: #8B5FBF;
					border-radius: 5px;
					text-align: center;
					line-height: 40px;
					font-size: 14px;
					font-weight: 700;
				}
			}

			.add-btn {
				width: 40px;
				margin: 10px 20px;
			}
		}

		.list-content {
			margin: 30px;

			.list-item {
				height: 60px;
				margin-top: 12px;
				display: flex;
				justify-content: space-between;

				.item-icon {
					margin-top: 10px;
				}

				.item-content {
					width: calc(100% - 30px);
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
							width: calc(100% - 100px);
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
</style>