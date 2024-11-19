<template>
	<view class="page edit-item">
		<view class="item-title">
			{{pageTitle}}
		</view>
		<form>
			<!-- 类别 -->
			<view class="uni-form-item uni-column">
				<view class="form-item">
					<picker @change="bindPickerChange" :value="dictIndex" :range="dicts" range-key="value">
						<view class="uni-input"><text class="form-item-label">类别：</text>
							<text v-if="!dictsValue" style="color:#878787">请选择清单类别</text>
							<text>{{dictsValue}}</text>
						</view>
					</picker>
				</view>
			</view>
			<!-- 名称 -->
			<view class="uni-form-item uni-column">
				<view class="form-item" style="display: flex;">
					<text class="form-item-label">名称：</text>
					<input class="uni-input" placeholder="请输入清单名称" style="height:30px;line-height: 30px;width: calc(100% - 60px);"
						v-model="name" />
				</view>
			</view>
			<!-- 状态 -->
			<view class="uni-form-item uni-column">
				<view class="form-item">
					<picker @change="statusPickerChange" :value="statusIndex" :range="status" range-key="value">
						<view class="uni-input"><text class="form-item-label">状态：</text>
							<text v-if="!statusValue" style="color:#878787">请选择清单状态</text>
							<text>{{statusValue}}</text>
						</view>
					</picker>
				</view>
			</view>
			<!-- 开始时间 -->
			<view class="uni-form-item uni-column">
				<view class="form-item">
					<picker @change="startDatePickerChange" mode="date" :value="startDate">
						<view class="uni-input"><text class="form-item-label">开始时间：</text>{{startDate}}<text style="color:#878787"
								v-if="!startDate">请选择开始时间</text></view>
					</picker>
				</view>
			</view>
			<!-- 结束时间 -->
			<view class="uni-form-item uni-column">
				<view class="form-item">
					<picker @change="endDatePickerChange" mode="date" :value="endDate">
						<view class="uni-input"><text class="form-item-label">结束时间：</text>{{endDate}}<text style="color:#878787"
								v-if="!endDate">请选择结束时间</text></view>
					</picker>
				</view>
			</view>
			<!-- 备注 -->
			<view class="uni-form-item uni-column" style="height:300px">
				<view class="form-item">
					<text class="form-item-label">备注：</text>
					<textarea v-model="remarks" placeholder-style="color:#878787" placeholder="请输入备注" :maxlength="-1"
						style="width: 100%;" />
				</view>
			</view>
			<!-- 按钮 -->
			<view class="uni-form-item uni-column form-button">
				<button class="button-item" @click="formSubmit">提交</button>
				<button class="button-item" @click="formReset">重置</button>
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
	const editData = ref()
	onLoad((option) => {
		if (option.type == 'add') {
			pageTitle.value = '新增'
		} else if (option.type == 'edit') {
			pageTitle.value = '修改'
			editData.value = JSON.parse(decodeURIComponent(option.params))
			console.log(editData.value)
			dictsValue.value = dicts.value.find(item => item.type === editData.value.type).value
			dictIndex.value = dicts.value.findIndex(item => item.type === editData.value.type)
			name.value = editData.value.name
			statusValue.value = status.value.find(item => item.type === editData.value.status).value
			statusIndex.value = status.value.findIndex(item => item.type === editData.value.status)
			startDate.value = editData.value.startDate
			endDate.value = editData.value.endDate
			remarks.value=editData.value.remarks
		}
	})

	const dictIndex = ref(0)
	const dictsValue = ref('')
	const bindPickerChange = function(val) {
		dictIndex.value = val.detail.value
		dictsValue.value = dicts.value[dictIndex.value].value
	}
	const statusIndex = ref(0)
	const statusValue = ref('')
	const statusPickerChange = function(val) {
		statusIndex.value = val.detail.value
		statusValue.value = status.value[statusIndex.value].value
	}
	const startDate = ref('')
	const endDate = ref('')
	const startDatePickerChange = function(val) {
		startDate.value = val.detail.value
	}
	const endDatePickerChange = function(val) {
		endDate.value = val.detail.value
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

	const remarks = ref('')
	const name = ref('')
	// onMounted(() => {
	// 	startDate.value = getDate()
	// })

	const formSubmit = function() {
		console.log('123')
	}
	const formReset = function() {
		dictIndex.value = 0
		dictsValue.value = ''
		statusIndex.value = 0
		statusValue.value = ''
		startDate.value = getDate()
		endDate.value = ''
		remarks.value = ''
		name.value = ''
	}
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

		.form-button {
			display: flex;
			padding: 0 30px;
			justify-content: space-between;

			.button-item {
				width: 150px;
				height: 60px;
				line-height: 60px;
				text-align: center;
				background-color: #61398F;
				color: #fff;
				border-radius: 5px;
			}

			.button-item:active {
				background-color: #8B5FBF;
			}
		}
	}
</style>