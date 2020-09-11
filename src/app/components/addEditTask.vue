<template>
	<div class="add-edit-task">
		<div class="add-edit-task-header">
			<p
				class="add-edit-task__wnd-btn-close img-wnd-close"
				@click="closeWnd"
			></p>
			{{ header }}
		</div>
		<div class="add-edit-task-content">
			<p class="add-edit-task-label">
				Группа
				<span class="add-edit-task__btn-change-group">Поменять группу</span>
			</p>
			<p class="add-edit-task-field-group">
				{{ groupName }}
				<span
					class="required-field"
					v-show="checkRequired('groupName')"
				>
					* Обязательно для заполнения
				</span>
			</p>

			<p class="add-edit-task-label">
				Задание
				<span
					class="required-field"
					v-show="checkRequired('taskName')"
				>
					* Обязательно для заполнения
				</span>
			</p>
			<textarea
				class="add-edit-task-field-task"
				v-model="taskName"
				rows="4"
			></textarea>

			<p class="add-edit-task-label">Описание</p>
			<textarea
				class="add-edit-task-field-description"
				v-model="description"
				rows="8"
			></textarea>

			<label class="add-edit-task-isComplete">
				<input type="checkbox" v-model="isComplete">
				<span>Выполнено</span>
			</label>
		</div>
		<div class="add-edit-task-footer">
			<p class="add-edit-task__btn-save" @click="saveTask">Сохранить</p>
			<p class="add-edit-task__btn-close" @click="closeWnd">Отменить</p>
		</div>

		<MessageBox
			v-show="messageText"
			:text="messageText"
			@close-msg="messageText = ''"
		></MessageBox>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import MessageBox from './messageBox.vue';

export default {
	components: { MessageBox },
	name: 'AddEditTask',
	data() {
		return {
			messageText: '',
			groupName: '',
			taskName: '',
			description: '',
			isComplete: false
		};
	},
	computed: {
		...mapState([
			'group',
			'task',
			'maxGroupID',
			'maxTaskID',
			'currentInfo'
		]),
		header() {
			return this.currentInfo.mode;
		},
		haveTaskDuplicate() {
			if (this.$store.state.currentInfo.mode !== 'Добавить задание') { return; }
			name = this.taskName.trim();
			const groupID = this.$store.state.currentInfo.groupID;
			return Object.values(this.$store.state.task).some(el => {
				if (groupID == el.groupID) {
					return el.name.toLowerCase() === name.toLowerCase();
				}
			});
		}
	},
	beforeRouteEnter(to, from, next) {
		next(that => {
			if (!that.currentInfo.mode) {
				window.history.back();
				return false;
			}

			const groupID = that.currentInfo.groupID;
			that.groupName = groupID ? that.group[groupID].name : '';

			const taskID = that.currentInfo.taskID;
			if (!taskID) {
				that.taskName = '';
				that.description = '';
				that.isComplete  =  false;
			} else {
				that.taskName = that.task[taskID].name;
				that.description = that.task[taskID].description || '';
				that.isComplete  = that.task[taskID].isComplete;
			}
		});
	},
	methods: {
		checkRequired(fieldName) {
			return this[fieldName].trim() === '';
		},
		saveTask() {
			const taskName = this.taskName.trim();
			if (taskName === '') {
				this.messageText = 'Поле "Задание" не может быть пустым';
				return;
			}

			if (this.haveTaskDuplicate) {
				this.messageText = 'В этой группе уже есть задача с таким названием.<br>Переименуйте задание';
				return;
			}

			this.$store.commit({
				type: 'saveTask',
				groupID: this.currentInfo.groupID,
				name: taskName,
				isComplete:  this.isComplete,
				description: this.description.trim()
			});
			this.closeWnd();
		},
		closeWnd() {
			this.$router.go(-1);
		},
	},
	mounted() {
		this.$el.querySelector('textarea').focus();
	}
};
</script>

<style>
@import "../styles/_vars.scss";

.add-edit-task {
	display: flex;
	flex-direction: column;
	position: absolute;
	max-width: 540px;
	max-height: 560px;
	left: 5px;
	top: 5px;
	right: 5px;
	bottom: 10px;
	margin: auto;
	background: #f5f5f5;
	border-radius: 5px;
	z-index: 2;
}

.add-edit-task-header {
	font-size: 15px;
	padding: 4px;
	text-align: center;
	color: #fff;
	border: 1px solid #4E76A8;
	border-radius: 5px 5px 0 0;
	text-shadow: #4E76A8 1px 0 0, #4E76A8 0 1px 0, #4E76A8 -1px 0 0, #4E76A8 0 -1px 0, #4E76A8 0 0 1px;
	background: linear-gradient(to bottom, #B2CCED 0%,#8CB0DC 50%,#85ABD9 51%,#79A0D1 100%);
}

.add-edit-task-content {
	padding: 10px 5px 5px 5px;
	flex: 1;
}

.add-edit-task-label {
	@include fsb;
	align-items: flex-end;
	padding: 2px 0;
}


.add-edit-task-field-group,
.add-edit-task-field-task,
.add-edit-task-field-description {
	@include row-item;
	margin: 2px 0 20px 0;
}

.add-edit-task-isComplete {
	display: flex;
	align-items: center;
}

.add-edit-task-footer {
	@include fsb;
	padding: 10px;
	border-radius: 0 0 5px 5px;
	background: #ddd;
}

.add-edit-task__wnd-btn-close {
	position: absolute;
	width: 16px;
	height: 16px;
	top: 6px;
	right: 5px;
	cursor: pointer;
}

.add-edit-task__btn-change-group {
	@include btn(134px, 26px, #fff, #F39503, #faa905);
}

.add-edit-task__btn-save {
	@include btn(99px, 32px, #fff, #27ae60, #27ae60);
}

.add-edit-task__btn-close {
	@include btn(99px, 32px, #fff, #0C7CD5, #0C7CD5);
}

</style>
