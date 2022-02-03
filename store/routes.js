import Vue from 'vue';

export const state = () => ({
	routes: [],
	routeMap: {}
});

export const mutations = {
	ADD_ROUTE(state, route) {
		state.routes.push(route);

		const obj = {};
		obj[route._id] = route;
		Object.assign(state.routeMap, obj);
	},
	CLEAR_ROUTES(state) {
		state.routes = [];
		state.routeMap = {};
	},
	REMOVE_ROUTE(state, routeId) {
		const index = state.routes.findIndex(route => route._id === routeId);
		if (index > -1) {
			state.routes.splice(index, 1);
		}

		Vue.delete(state.routeMap, routeId);
	}
};

export const getters = {
	getRoutes: state => state.routes,
	getRouteById: (state) => (id) => state.routeMap[id]
};

export const actions = {
	async fetchRoutes({ commit }, axiosConfig) {
		const { data } = await this.$axios.get('/route', axiosConfig);
		const routes = data.data;
		console.log('routes', routes);
		routes.forEach(route => {
			commit('ADD_ROUTE', route);
		});
	},
	async deleteRoute({ commit, rootGetters }, routeId) {
		const axiosConfig = rootGetters.getAxiosConfig;
		const { status } = await this.$axios.delete(`/route/${routeId}`, axiosConfig);
		if (status === 200) {
			commit('REMOVE_ROUTE', routeId);
			return true;
		}
		console.error('Unable to delete route');
		return false;
	}
};
