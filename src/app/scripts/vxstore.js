export default {
	state: {
		group: {
			0: { name: "Изучить языки программирования" },
			1: { name: "Длинное название группы, не помещается на экран 320px" },
			2: { name: "abc" },
			3: { name: "тест" },
			4: { name: "Empty Group" },
		},
		task: {
			0: { groupID: 1, name: "Защитить исследовательский Центр Парения", isComplete: false },
			1: { groupID: 1, name: "Освободить комплекс по добыче воды", isComplete: false },
			2: { groupID: 3, name: "t1", isComplete: false },
			3: { groupID: 3, name: "t2", isComplete: true },
			4: { groupID: 3, name: "t3", isComplete: false },
			5: { groupID: 3, name: "t4", isComplete: false },
			6: { groupID: 0, name: "Javascript", isComplete: true },
			7: { groupID: 0, name: "SQL", isComplete: true },
			8: { groupID: 0, name: "C", isComplete: false },
			9: { groupID: 0, name: "Assembler", isComplete: false },
			10: { groupID: 2, name: "11111", isComplete: false },
			11: { groupID: 2, name: "zzzzz", isComplete: true },
		},
		maxGroupID: 4,
		maxTaskID: 11,
		currentMode:	null,
		currentGroupID: null,
		currentTaskID: null,
		expandAll: true
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
		setCurrentRecord(state, data) {
			state.currentMode	= data.currentMode;
			state.currentGroupID = data.currentGroupID;
			state.currentTaskID  = data.currentTaskID;
		},
		addNewGroup(state, data) {
			//state.group.push(++state.maxID, name: data.name });
		},
		updateGroup(state, data) {
			let row = state.group[state.category][state.currentId];
			row.text = data.name;
			row.description = data.description;
		}
	},
};
