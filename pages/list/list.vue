<template>
	<view class="list-page">
		<view class="add-button">
			<uni-icons type="plus" size="24" color="#1D537F"></uni-icons>
			<text>添加清单</text>
		</view>
		<uni-collapse>
			<uni-collapse-item title="待完成">
				<view v-for="item in preList" :key="item.id" class="list-item">
					<view class="item-first">
						<text class="item-title">标题：{{item.name}}</text>
						<text class="item-type">类型：{{dicts.find(it=>it.type==item.type).value}}</text>
					</view>
					<view class="item-second">
						<text class="item-time">创建时间：{{item.startTime}}</text>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="进行中">
				<view v-for="item in ingList" :key="item.id">
					<view v-for="item in preList" :key="item.id" class="list-item">
						<view class="item-first">
							<text class="item-title">标题：{{item.name}}</text>
							<text class="item-type">类型：{{dicts.find(it=>it.type==item.type).value}}</text>
						</view>
						<view class="item-second">
							<text class="item-time">创建时间：{{item.startTime}}</text>
						</view>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="已完成">
				<view v-for="item in edList" :key="item.id">
					<view v-for="item in preList" :key="item.id" class="list-item">
						<view class="item-first">
							<text class="item-title">标题：{{item.name}}</text>
							<text class="item-type">类型：{{dicts.find(it=>it.type==item.type).value}}</text>
						</view>
						<view class="item-second">
							<text class="item-time">完成时间：{{item.endTime||'这是一个秘密'}}</text>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import { storeToRefs } from "pinia"
	import {
		useCounterStore
	} from '@/store/counter.js'
	const counter = useCounterStore()
	const {dataList,dicts} = storeToRefs(counter)
	const preList = dataList.value.filter(item=>item.status===1)
	const ingList = dataList.value.filter(item=>item.status===2)
	const edList = dataList.value.filter(item=>item.status===3)
</script>

<style lang="scss" scoped>
	.list-page {
		height: 100vh;
		padding-top: 20rpx;

		.add-button {
			color: #ccc;
			height: 80rpx;
			display: flex;
			justify-content: center;
			line-height: 80rpx;
		}
		.list-item{
			margin: 5rpx 50rpx 20rpx;
			padding:20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			box-shadow: inset -3px -3px 9px rgba(255, 255, 255, .9), inset 3px 4px 9px rgba(222,217,205, .9);;
			.item-first{
				margin-bottom: 20rpx;
				display: flex;
				.item-title{
					width: 300rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-right: 50rpx;
				}
			}
		}
	}
</style>