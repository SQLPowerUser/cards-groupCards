<template>
	<div class="edit-card">
		<div class="edit-card-header"> {{ header }} </div>
		<div class="edit-card-content">
			<p class="edit-card-label">
				Группа
				<span class="edit-card__btn-change-group">Поменять группу</span>
			</p>
			<p class="edit-card-field-group"> {{ groupName }} </p>

			<p class="edit-card-label">Задание</p>
			<textarea
				class="edit-card-field-task"
				v-model="taskName"
				rows="4"
			></textarea>

			<p class="edit-card-label">Описание</p>
			<textarea
				class="edit-card-field-description"
				v-model="description"
				rows="8"
			></textarea>

			<label class="edit-card-isComplete">
				<input type="checkbox">
				Выполнено
			</label>
		</div>
		<div class="edit-card-footer">
			<p class="edit-card__btn-save" @click="updateNote">Сохранить</p>
			<p class="edit-card__btn-close" @click="closeEditCard">Отменить</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'EditCard',
	data() {
		return {
			groupName: '',
			taskName: '',
			isComplete: false,
			description: ''
		};
	},
	computed: {
		...mapState([
			'group',
			'task',
			'maxGroupID',
			'maxTaskID',
			'currentMode',
			'currentGroupID',
			'currentTaskID'
		]),
		header() {
			return 'Добавление записи';
		}
	},
	beforeRouteEnter(to, from, next) {
		next(that => {
			if (that.currentGroupID === null) {
				window.history.back();
				return false;
			}
			that.groupName = that.group[that.currentGroupID].name;
			//that.taskName = row.text || '';
			//that.description = row.description || '';
		});
	},
	methods: {
		updateNote(caption) {
			let taskName = this.taskName.trim();
			if (!taskName) {
				return;
			}
			let description = this.description.trim();

			this.$store.commit({
				type: 'updateNote',
				text: taskName,
				description: description,
			});

			this.closeEditCard();
		},

		closeEditCard() {
			this.$router.go(-1);
		},
	}, // methods
};
</script>

<style>
@import "../styles/_vars.scss";

.edit-card {
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

.edit-card-header {
	font-size: 15px;
	padding: 4px;
	text-align: center;
	color: #fff;
	border: 1px solid #4E76A8;
	border-radius: 5px 5px 0 0;
	text-shadow: #4E76A8 1px 0 0, #4E76A8 0 1px 0, #4E76A8 -1px 0 0, #4E76A8 0 -1px 0, #4E76A8 0 0 1px;
	background: linear-gradient(to bottom, #B2CCED 0%,#8CB0DC 50%,#85ABD9 51%,#79A0D1 100%);
}

.edit-card-content {
	padding: 10px 5px 5px 5px;
	flex: 1;
}

.edit-card-label {
	@include fsb;
	align-items: flex-end;
	padding: 2px 0;
}


.edit-card-field-group,
.edit-card-field-task,
.edit-card-field-description {
	@include card-item;
	margin: 2px 0 20px 0;
}

.edit-card-isComplete {
	display: flex;
	align-items: center;
}

.edit-card-footer {
	@include fsb;
	padding: 10px;
	border-radius: 0 0 5px 5px;
	background: #ddd;
}

.edit-card__btn-change-group {
	@include btn(134px, 26px, #fff, #F39503, #faa905);
}

.edit-card__btn-save {
	@include btn(99px, 32px, #fff, #27ae60, #27ae60);
}

.edit-card__btn-close {
	@include btn(99px, 32px, #fff, #0C7CD5, #0C7CD5);
}

</style>
