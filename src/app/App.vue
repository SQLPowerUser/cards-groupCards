<template>
	<div class="container">
		<div class="container-toolbar">
			<p class="container-toolbar-legend">Фильтры</p>
			<div class="container-toolbar-card-search">
				Название&#160;карточки:&#160;
				<input
					type="text"
					v-model="searchText"
				>
			</div>
			<div class="container-toolbar-card-state">
				Статус:&#160;
				<label class="mr12">
					<input type="radio" name="card-state" value="any" v-model="isComplete" checked>
					<span>любой</span>
				</label>
				<label class="mr12">
					<input type="radio" name="card-state" :value="true" v-model="isComplete">
					<span>выполнено</span>
				</label>
				<label class="mr12">
					<input type="radio" name="card-state" :value="false" v-model="isComplete">
					<span>невыполнено</span>
				</label>
			</div>
			<div
				class="container-toolbar__btn-clear-filter"
				v-show="searchText.trim() !== '' || isComplete !== 'any'"
				@click="clearFilter"
			>
				Сбросить
			</div>
		</div>

		<div class="group-operations">
			<p
				class="group-operations__btn-create-new"
				@click="createNewGroup"
			>
				Создать новую группу
			</p>
			<p
				class="group-operations__btn-collapse-all"
				@click="groupsExpandCollapse"
			>
				{{ allExpand ? 'Свернуть всё' : 'Развернуть всё' }}
			</p>
		</div>


		<Card
			v-for="(mapValues, mapKey) in buildTree"
			:key="mapKey"
			:groupInfo="mapValues[0]"
			:tasks="mapValues[1]"
		></Card>

		<router-view name="fogOver"></router-view>
		<router-view name="addEditTask"></router-view>
		<router-view name="addEditGroup"></router-view>
	</div> <!-- class="container" -->
</template>

<script>
import Card from './components/card.vue';
import AddEditTask from './components/addEditTask.vue';
import AddEditGroup from './components/addEditGroup.vue';
import FogOver from './components/fogOver.vue';

export default {
	data() {
		return {
			searchText: '',
			isComplete: 'any',
			allExpand: true
		}
	},
	computed: {
		buildTree() {
			return this.$store.getters.buildTree(this.searchText, this.isComplete);
		},
	},
	methods: {
		clearFilter() {
			this.searchText = '';
			this.isComplete = 'any';
		},
		createNewGroup() {
			this.$router.push('addEditGroup');
		},
		groupsExpandCollapse() {
			this.allExpand = !this.allExpand;
			[...document.querySelectorAll('.card-caption__btn-expand')].forEach(el => {
				if (el.textContent === '►' && this.allExpand || el.textContent === '▼' && !this.allExpand) { el.click(); }
			});
		}
	},
	components: {
		Card,
		AddEditTask,
		AddEditGroup,
		FogOver,
	}
};
/*setTimeout(() => {
	document.querySelectorAll('.card-caption-menu-item')[0].click();
}, 500);/**/
</script>


<style>
@import "styles/_vars.scss";


.container {
	max-width: 960px;
	margin: auto;
	padding: 10px;
}

.container-toolbar {
	@include fwr;
	@include fsb;
	position: relative;
	align-items: center;
	min-height: 52px;
	margin-top: 6px;
	padding: 0 8px 10px 8px;
	border-bottom: 1px solid #ccc;
	border-radius: 6px;
	background:
		linear-gradient(transparent, #ccc) top left,
		linear-gradient(transparent, #ccc) top right,
		linear-gradient(#eee 0%, #fff 50%, #f7f7f7 74%, #eee 100%) center;
	background-size:
		1px 100%,
		1px 100%,
		cover;
	background-repeat: no-repeat;
}

.container-toolbar-legend {
	position: absolute;
	top: -9px;
	left: 17px;
	height: 19px;
	line-height: 17px;
	width: 157px;
	text-align: center;
	color: #fff;
	border-radius: 9px;
	background: linear-gradient(#3fb3f0, #0272a0);
}

.container-toolbar-card-search {
	display: flex;
	align-items: center;
	flex: 1 1 50%;
	margin: 14px 20px 0 0;
	white-space: nowrap;
}

.container-toolbar-card-state {
	@include fwr;
	margin-top: 14px;
}

.container-toolbar__btn-clear-filter {
	@include btn(80px, 26px, #fff, #aaa, #bbb);
	margin-top: 14px;
}

.group-operations {
	@include fsb;
	margin-top: 16px;
}

.group-operations__btn-create-new {
	@include btn(160px, 26px, #fff, #F39503, #faa905);
}

.group-operations__btn-collapse-all {
	@include btn(115px, 26px, #fff, #0C7CD5, #0C7CD5);
}
</style>