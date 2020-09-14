import './styles/common.scss';
import Vue from 'vue';
import VueX from 'vuex';
import VueRouter from 'vue-router';

import VXstore from './scripts/vxstore.js';
import App from './App.vue';
require.context('../public', true, /\.(png|woff)$/i);

Vue.use(VueX);
const store = new VueX.Store(VXstore);

Vue.use(VueRouter);
const routes = [
	{
		path: '/addEditTask',
		components: {
			fogOver: App.components.FogOver,
			addEditTask: App.components.AddEditTask
		}
	},
	{
		path: '/addEditGroup',
		components: {
			fogOver: App.components.FogOver,
			addEditGroup: App.components.AddEditGroup
		}
	}
];

const router = new VueRouter({
	routes,
});

new Vue({
	render: (h) => h(App),
	store,
	router,
}).$mount("#app");
