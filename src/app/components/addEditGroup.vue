<template>
	<div class="add-edit-group">
		<div class="add-edit-group-header">
			<p
				class="add-edit-group__wnd-btn-close img-wnd-close"
				@click="closeWnd"
			></p>
			{{ header }}
		</div>

		<div class="add-edit-group-content">
			<p class="add-edit-group-label">
				Название:
				<span
					class="required-field"
					v-show="checkRequired('groupName')"
				>
					* Обязательно для заполнения
				</span>
			</p>

			<input
				type="text"
				v-model="groupName"
				@keyup.enter="saveGroup"
				@keyup.esc="closeWnd"
			>
		</div>

		<div class="add-edit-group-footer">
			<p class="add-edit-group__btn-save" @click="saveGroup">Сохранить</p>
			<p class="add-edit-group__btn-close" @click="closeWnd">Отменить</p>
		</div>

		<MessageBox
			:mbo="mbo"
			v-show="mbo.text"
			@close-msg="mbo = {}"
		></MessageBox>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import MessageBox from './messageBox.vue'

export default {
	name: 'AddEditGroup',
	data() {
		return {
			groupName: '',
			mbo: {} // MessageBox Object
		};
	},
	computed: {
		...mapState([
			'group',
			'currentInfo'
		]),
		header() {
			return this.currentInfo.mode;
		},
		haveGroupDuplicate() {
			let result;
			const currentGroupID = this.currentInfo.groupID;
			const groupName = this.groupName.trim().toLowerCase();
			const groups = this.group;
			for(let groupID in groups) {
				result = (groupName === groups[groupID].name && groupID != currentGroupID);
				if (result) { break; }
			}
			return result;
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
		});
	},
	methods: {
		checkRequired(fieldName) {
			return this[fieldName].trim() === '';
		},
		saveGroup() {
			this.mbo = {
				mbtype: 'error',
				caption: 'Ошибка',
				no: 'Закрыть'
			};

			const groupName = this.groupName.trim();
			if (groupName === '') {
				this.mbo.text = 'Заполните поле<br>"Название"';
				return;
			}

			if (this.haveGroupDuplicate) {
				this.mbo.text = 'Группа с таким именем уже есть.<br>Задайте другое имя';
				return;
			}

			this.$store.commit({
				type: 'saveGroup',
				name: groupName,
			});
			this.closeWnd();
		},
		closeWnd() {
			this.$router.go(-1);
		},
	},
	mounted() {
		this.$el.querySelector('input').focus();
	},
	components: {
		MessageBox
	}
};
</script>

<style>
@import "../styles/_vars.scss";

.add-edit-group {
	display: flex;
	flex-direction: column;
	position: absolute;
	max-width: 540px;
	max-height: 145px;
	left: 5px;
	top: 5px;
	right: 5px;
	bottom: 10px;
	margin: auto;
	background: #f5f5f5;
	border-radius: 5px;
	z-index: 2;
}

.add-edit-group-header {
	font-size: 15px;
	padding: 4px;
	text-align: center;
	color: #fff;
	border: 1px solid #4E76A8;
	border-radius: 5px 5px 0 0;
	text-shadow: #4E76A8 1px 0 0, #4E76A8 0 1px 0, #4E76A8 -1px 0 0, #4E76A8 0 -1px 0, #4E76A8 0 0 1px;
	background: linear-gradient(to bottom, #B2CCED 0%,#8CB0DC 50%,#85ABD9 51%,#79A0D1 100%);
}

.add-edit-group-content {
	padding: 10px 5px 5px 5px;
	flex: 1;
	overflow: auto;
}

.add-edit-group-label {
	@include fsb;
	align-items: flex-end;
	padding: 2px 0;
}

.add-edit-group-exists-caption {
	padding-top: 15px;
	color: #008200;
}

.add-edit-group-exists-list {
	margin: -7px 2px 20px -8px;
}


.add-edit-group-footer {
	@include fsb;
	padding: 10px;
	border-radius: 0 0 5px 5px;
	background: #ddd;
}

.add-edit-group__wnd-btn-close {
	position: absolute;
	width: 16px;
	height: 16px;
	top: 6px;
	right: 5px;
	cursor: pointer;
}

.group-item {
	@include row-item;
}

.add-edit-group__btn-save {
	@include btn(99px, 32px, #fff, #27ae60, #27ae60);
}

.add-edit-group__btn-close {
	@include btn(99px, 32px, #fff, #0C7CD5, #0C7CD5);
}
</style>
