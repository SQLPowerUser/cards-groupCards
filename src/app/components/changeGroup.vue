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
						v-model="searchGroupText"
						style="border: 1px solid #5F91E9"
					>
				</div>
				<div class="wnd-change-group-items-block">
					<ul>
						<li
							class="wnd-change-group-item"
							v-for="(gr,id) in groupList"
							:key="id"
							@click="selectGroup(id)"
						> {{ gr.name }}
						</li>
					</ul>
				</div>
			</div>

			<div class="wnd-footer">
				<div
					class="wnd-button"
					@click="setCurrentGroup"
				>Поменять
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
			selectedGroupID: '',
			groupName: '',
			searchGroupText: ''
		}
	},
	computed: {
		...mapState([
			'group',
			'currentInfo'
		]),
		groupList() {
			const result = {};
			for(let id in this.group) {
				if (this.group[id].name.toLowerCase().includes(this.searchGroupText.toLowerCase())) {
					result[id] = this.group[id];
				}
			}
			return result;
		}
	},
	methods: {
		selectGroup(id) {
			this.selectedGroupID = id;
			this.groupName = this.group[id].name;
		},
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
	},
	watch: {
		isShow() { this.$el.querySelector('input').focus(); }
	},
	mounted() {
		const groupID = this.currentInfo.groupID;
		this.groupName = groupID ? this.group[groupID].name : '';
	}
};
</script>

<style>
.wnd-change-group {
	max-width: 540px;
	max-height: 559px;
	left: 5px;
	top: 5px;
	right: 5px;
	bottom: 5px;
	margin: auto;
	background: #f5f5f5;
	transform: none;
}

.wnd-change-group-content {
	display: flex;
	flex-direction: column;
	padding: 5px 5px 0 5px;
	flex: 1;
	min-height: 99px;
}

.wnd-change-group-items-block {
	flex: 1;
	overflow-y: auto;
}

.wnd-change-group-current-group,
.wnd-change-group-item {
	margin-bottom: 16px;
	background: #eef7ea;
	border: 1px solid #ccc;
	border-radius: 2px;
	padding: 3px 2px;
}


.wnd-change-group-item {
	margin: 6px 0;
	background: #fff;
	cursor: pointer;
}
</style>