<template>
	<div
		class="block-over"
		@keydown.esc="closeWnd"
		tabindex="-1"
	>
		<div class="wnd wnd-change-group">
			<div class="wnd-header">
				<div class="wnd-header-caption">
					Поиск и выбор группы
				</div>
				<div
					class="wnd-header-cmd img-wnd-close"
					@click="closeWnd"
				></div>
			</div>

			<div class="wnd-change-group-content">
				<div>
					Текущая группа:
					<p class="wnd-change-group-current-group"> {{ groupName }} </p>
					<input
						type="text"
						placeholder="Быстрый поиск по фрагменту"
						v-model="groupName"
					>
				</div>
				<ul class="wnd-change-group-content-list">
					<li
						class="wnd-change-group-item"
						v-for="gr in group"
						:key="gr.id"
					> {{ gr.name }}
					</li>
				</ul>
			</div>

			<div class="wnd-footer">
				<div
					class="wnd-button"
					@click="setCurrentGroup"
				>Поменять {{ isShow }}
				</div>

				<div
					class="wnd-button"
					@click="closeWnd"
				>Отменить
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'ChangeGroup',
	props: ['isShow'],
	data() {
		return {
			selectedGroupID: ''
		}
	},
	computed: {
		...mapState([
			'group',
			'currentInfo'
		]),
		groupName() {
			const groupID = this.currentInfo.groupID;
			return groupID ? this.group[groupID].name : '';
		}
	},
	methods: {
		setCurrentGroup() {
			this.$store.commit({
				type: 'setCurrentGroup',
				groupID: this.selectedGroupID
			});
			this.closeWnd();
		},
		closeWnd() {
			this.$emit('close-wnd');
		}
	}
};
</script>

<style>
.wnd-change-group {
	max-width: 540px;
	max-height: 560px;
	left: 5px;
	top: 5px;
	right: 5px;
	bottom: 5px;
	margin: auto;
	background: #f5f5f5;
	transform: none;
}

.wnd-change-group-content {
	padding: 5px;
	flex: 1;
}

.wnd-change-group-current-group,
.wnd-change-group-item {
	margin-bottom: 16px;
	background: #eef7ea;
	border: 1px solid #ccc;
	border-radius: 2px;
	padding: 3px 2px;
}

.wnd-change-group-content-list {
	margin-top: -1px;
	overflow-y: auto;
}

.wnd-change-group-item {
	margin: 6px 0;
	background: #fff;
	cursor: pointer;
}
</style>