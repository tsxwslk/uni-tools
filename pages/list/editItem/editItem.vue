<template>
	<view class="page edit-item">
		<view class="item-title">
			{{pageTitle}}
		</view>
		<form @submit="formSubmit" @reset="formReset">
			<!-- 类别 -->
			<view class="uni-form-item uni-column">
				<view class="form-item">
					<picker @change="bindPickerChange" :value="dictIndex" :range="dicts" range-key="value">
						<view class="uni-input"><text class="form-item-label">类别：</text>{{dicts[dictIndex].value}}</view>
					</picker>
				</view>
			</view>
			<!-- 名称 -->
			<view class="uni-form-item uni-column">
				<view class="form-item" style="display: flex;">
					<text class="form-item-label">名称：</text>
					<input class="uni-input" placeholder="请输入清单名称" style="height:30px;line-height: 30px;" />
				</view>
			</view>
			<!-- 状态 -->
			<view class="uni-form-item uni-column">
				<view class="form-item">
					<picker @change="statusPickerChange" :value="statusIndex" :range="status" range-key="value">
						<view class="uni-input"><text class="form-item-label">状态：</text>{{status[statusIndex].value}}</view>
					</picker>
				</view>
			</view>
			<!-- 开始时间 -->
			<view class="uni-form-item uni-column">
				<view class="form-item">
					<picker @change="startDatePickerChange" mode="date" :value="date">
						<view class="uni-input"><text class="form-item-label">开始时间：</text>{{statrDate}}</view>
					</picker>
				</view>
			</view>
		</form>
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		storeToRefs
	} from "pinia"
	import {
		useCounterStore
	} from '@/store/counter.js'
	const counter = useCounterStore()
	const {
		dicts,
		status,
		foodList
	} = storeToRefs(counter)
	const pageTitle = ref('')
	onLoad((option) => {
		if (option.type == 'add') {
			pageTitle.value = '新增'
		} else if (option.type == 'edit') {
			pageTitle.value = '修改'
		}
	})

	const dictIndex = ref(0)
	const bindPickerChange = function(val) {
		dictIndex.value = val.detail.value
	}
	const statusIndex = ref(0)
	const statusPickerChange = function(val) {
		statusIndex.value = val.detail.value
	}
	const statrDate = ref('')
	const startDatePickerChange = function(val) {
		statrDate.value = val.detail.value
	}
	const getDate = function() {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}
	onMounted(()=>{
		statrDate.value=getDate()
	})
</script>

<style lang="scss" scoped>
	.edit-item {
		color: #4A4A4A;

		.item-title {
			height: 60px;
			width: 100%;
			font-size: 20px;
			line-height: 60px;
			font-weight: 700;
			text-align: center;
		}

		.uni-form-item {
			padding: 10px 20px;

			// .title {
			// 	height: 20px;
			// 	line-height: 20px;
			// 	font-size: 16px;
			// 	font-weight: 600;
			// 	margin-bottom: 10px;
			// }
			.form-item {
				height: 30px;
				line-height: 30px;
				margin-bottom: 10px;

				.form-item-label {
					font-size: 16px;
					font-weight: 600;
				}
			}
		}
	}
</style>