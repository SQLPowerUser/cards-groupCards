<template>
	<div class="card">
		<div class="card-caption">
			<p
				v-html="expandSymbol"
				class="card-caption__btn-expand"
				@click="isExpand = !isExpand"
			></p>
			<p> {{ groupInfo[1] }} </p>

			<div class="card-caption-menu" tabindex="-1">
				&#9776;
				<div class="card-caption-menu-items">
					<p class="card-caption-menu-item" @click="showEditTask(groupInfo[0])">
						<svg viewBox="0 0 16 16" width="16" height="16">
							<path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#007200" />
						</svg>
						&#160;Добавить задание
					</p>
					<p class="card-caption-menu-item">
						<svg viewBox="1 -1 16 16" width="16" height="16">
							<path fill="#999" d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"></path>
						</svg>
						&#160;Переименовать группу
					</p>
					<p class="card-caption-menu-item">
						<svg viewBox="2 0 12 16" width="16" height="16">
							<path fill="#ec5252" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
						</svg>
						Удалить всю группу
					</p>
				</div>
			</div>
		</div>

		<ul v-show="isExpand" class="row-items-block">
			<li
				class="row-item"
				v-for="task in tasks"
				:key="task.id"
				@click="showEditTask(task)"
			>
				<span v-html="showCompleteIcon(task.isComplete)" class="row-item-complete-icon"></span>
				{{ task.name }}
			</li>
		</ul>
	</div> <!-- class="card" -->
</template>

<script>
export default {
	name: "Card",
	props: {
		groupInfo: Array,
		tasks: Array,
	},
	data() {
		return {
			newText: "",
			showBlockAdd: false,
			isExpand: true
		};
	}, // data

	computed: {
		expandSymbol() {
			return this.isExpand ? '▼' : '►';
		}
	},
	methods: {
		showCompleteIcon(isComplete) {
			return isComplete ? `<svg width="16" height="16" viewBox="0 0 48 48"> <circle fill="#4CAF50" cx="24" cy="24" r="21" />
				<polygon fill="#CCFF90" points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4" /> </svg>`
				: `<svg width="16" height="16" viewBox="0 0 16 16"> <path fill="red" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
				</svg>`;
		},
		showEditTask(passData) {
			const currentMode = (typeof(passData) === 'string') ? 'Добавить задание' : 'Редактировать задание';
			const currentTaskID = passData.id ? passData.id : '';
			this.$store.commit({
				type: 'setCurrentInfo',
				mode: currentMode,
				groupID: this.groupInfo[0],
				taskID:  currentTaskID
			});
			this.$router.push('addEditTask');
		}
	}
};
</script>

<style>
@import "../styles/_vars.scss";

.card {
	margin-top: 15px;
	background: $background-card;
	border-radius: 5px;
	align-self: flex-start;
	border: 1px solid;
	border-color: #e1e1e1 #ddd #cdcdcd #ddd;
}

.card-caption {
	display: flex;
	margin-bottom: 6px;
	padding: 8px 10px 2px 6px;
}

.card-caption__btn-expand {
	@include fac;
	@include card-btn;
	margin-right: 5px;
	flex: 0 0 20px;
}

.card-caption-menu {
	@include card-btn;
	margin-left: auto;
	padding: 0 4px;
}

.card-caption-menu-items {
	position: absolute;
	left: -170px;
	padding: 2px 5px;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 3px;
	display: none1;
	z-index: 1;
}

.card-caption-menu:focus .card-caption-menu-items {
	display: block;
}

.card-caption-menu-item {
	display: flex;
	align-items: center;
	height: 22px;
}

.row-items-block {
	padding: 0 10px 1px 0;
}

.row-item {
	@include row-item;
	white-space: nowrap;
	text-overflow: ellipsis;
	cursor: zoom-in;
}

.row-item:first-child {
	margin-top: 0;
}

.row-item-complete-icon {
	position: relative;
	top: 2px;
}
</style>
