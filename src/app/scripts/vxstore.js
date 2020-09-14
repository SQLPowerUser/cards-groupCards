export default {
	state: {
		group: {
			1: { name: "В любой группе нет дубликатов" },
			2: { name: "Длинное название группы, не помещается на экран 320px" },
			3: { name: "Изучить языки программирования" },
			4: { name: "тест" },
			5: { name: "Empty Group" },
		},
		task: {
			1: { groupID: 2, name: "Защитить исследовательский Центр Парения, освободить комплекс по добыче воды, уничтожить все военные базы Империи и Стража Свободы", isComplete: false },
			2: { groupID: 2, name: "Накопить 3000 кредитов для отправки с орбиты ещё одного конвоя с водой", isComplete: false },
			3: { groupID: 4, name: "t1", isComplete: false },
			4: { groupID: 4, name: "t2", isComplete: true },
			5: { groupID: 4, name: "t3", isComplete: false },
			6: { groupID: 4, name: "t4", isComplete: false },
			7: { groupID: 3, name: "Javascript", isComplete: true },
			8: { groupID: 3, name: "SQL", isComplete: true },
			9: { groupID: 3, name: "C", isComplete: false },
			10: { groupID: 3, name: "Assembler", isComplete: false },
			11: { groupID: 1, name: "1", isComplete: false },
			12: { groupID: 1, name: "z", isComplete: true },
		},
		currentInfo: {
			mode: '',
			groupID: '',
			taskID: ''
		},
		maxGroupID: 5,
		maxTaskID: 12
	},

	getters: {
		buildTree: state => (txt, isComplete) => {
			const result = new Map();
			const searchTxt = txt.trim();
			for (let grID in state.group) {
				let tasks = [];
				for (let tID in state.task) {
					let row = state.task[tID];
					if (row.groupID == grID && // filter
						(searchTxt === '' || row.name.toLowerCase().includes(searchTxt.toLowerCase())) &&
						(isComplete === 'any' || row.isComplete === isComplete)) {
						tasks.push({...{id: tID}, ...row});
					}
				}

				let mapKey = [grID, state.group[grID].name];
				result.set(mapKey, tasks);
				if ((searchTxt !== '' || isComplete !== 'any') && tasks.length === 0) {
					result.delete(mapKey);
				}
			};
			return result;
		}
	},

	mutations: {
		setExpandAll(state, data) {
			state.expandAll = data.expand;
		},
		setCurrentInfo(state, data) {
			delete data.type;
			state.currentInfo = data;
		},
		saveTask(state, data) {
			const taskID = state.currentInfo.taskID || ++state.maxTaskID;
			delete data.type;
			state.task = {...state.task, ...{[taskID]: data}};
		},
		deleteTask(state) {
			state.task[state.currentInfo.taskID] = null;
			delete state.task[state.currentInfo.taskID];
		},
		saveGroup(state, data) {
			const groupID = state.currentInfo.groupID || ++state.maxGroupID;
			delete data.type;
			state.group = {...state.group, ...{[groupID]: data}};
		}
	},
};
