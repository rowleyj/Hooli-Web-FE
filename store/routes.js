export const state = () => ({
	routes: []
});

export const mutations = {
	ADD_ROUTE (state, route) {
		state.routes.push(route);
	},
	CLEAR_ROUTES (state) {
		state.routes = [];
	}
};

export const getters = {
	getRoutes: state => state.routes
}

export const actions = {
	async fetchRoutes ({ commit, getters }, axiosConfig) {
		const { data } = await this.$axios.get('/route', axiosConfig)
		const routes = data.data;
		console.log('routes', routes);
		routes.forEach(route => {
			commit('ADD_ROUTE', route);
		})
	}
};
