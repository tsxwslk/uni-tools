// stores/counter.js
import {
	defineStore
} from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => {
		return {
			dataList: [{
					id: 'hkjashd12hjgg01',
					name: '《阿加莎·克里斯蒂大侦探波洛系列全集》',
					type: 'book',
					tags: '悬疑推理',
					startTime: '2024-08-01',
					endTime: '',
					status: 1,
					remarks: ''
				},
				{
					id: 'hkjashd12hjgg02',
					name: '《鲁迅全集》',
					type: 'book',
					tags: '作者文集',
					startTime: '2024-08-01',
					endTime: '',
					status: 2,
					remarks: ''
				},
				{
					id: 'hkjashd12hjgg03',
					name: '广州',
					type: 'tourism',
					tags: '',
					startTime: '2023-11-01',
					endTime: '2023-11-08',
					status: 3,
					remarks: '太好吃了，下次还去'
				},
				{
					id: 'hkjashd12hjgg04',
					name: '《蝲蛄吟唱的地方》',
					type: 'book',
					tags: '悬疑推理',
					startTime: '2024-06-27',
					endTime: '',
					status: 1,
					remarks: ''
				},
				{
					id: 'hkjashd12hjgg05',
					name: '《基督山伯爵》',
					type: 'book',
					tags: '长篇小说',
					startTime: '2024-09-27',
					endTime: '2024-11-08',
					status: 3,
					remarks: ''
				},
				{
					id: 'hkjashd12hjgg06',
					name: '《我的阿勒泰》',
					type: 'book',
					tags: '散文',
					startTime: '2024-11-09',
					endTime: '',
					status: 2,
					remarks: ''
				},
			],
			dicts: [{
					type: 'book',
					value: '书籍'
				},
				{
					type: 'video',
					value: '影视剧'
				},
				{
					type: 'cartoon',
					value: '动漫'
				},
				{
					type: 'game',
					value: '游戏'
				},
				{
					type: 'food',
					value: '美食'
				},
				{
					type: 'tourism',
					value: '旅游'
				},
			],
			status: [{
					type: 1,
					value: '未完成'
				},
				{
					type: 2,
					value: '进行中'
				},
				{
					type: 3,
					value: '已完成'
				},
			],
			foodList: ['酸辣土豆丝', '辣炒白菜', '蒜薹炒肉', '番茄鸡蛋', '肉沫茄子', '豆角肉丝', '茭白腊肉', '面', '麻婆豆腐', '米线', 
				'麻辣烫', '肠粉', '螺蛳粉','重庆小面', '香锅', '红烧排骨', '红烧冬瓜', '藕丁', '辣椒炒肉', '豆芽牛肉', '酸菜羊肉','西葫芦',
				'瓠子','洋葱炒蛋','冬瓜丸子汤','炖鸡腿','辣椒鸡胸肉','卤肉'
			]
		};
	},
	actions: {
		increment(val) {
			this.dataList.unshift(JSON.parse(JSON.stringify(val)))
		},
	},
});