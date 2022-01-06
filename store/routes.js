export const state = () => ({
	routes: []
});

export const mutations = {
	ADD_ROUTE (state, route) {
		state.routes.push(route);
	},
	CLEAR_ROUTES (state) {
		state.routes = [];
	},
	REMOVE_ROUTE (state, routeId){
		let index = state.routes.findIndex(route => route._id === routeId);
		if(index > -1){
			state.routes.splice(index, 1);
		}
	}
};

export const getters = {
	getRoutes: state => state.routes
}

export const actions = {
	async fetchRoutes ({ commit }, axiosConfig) {
		const { data } = await this.$axios.get('/route', axiosConfig)
		const routes = data.data;
		console.log('routes', routes);
		routes.forEach(route => {
			commit('ADD_ROUTE', route);
		})
	},
	async deleteRoute ({commit, rootGetters}, routeId){
		const axiosConfig = rootGetters['getAxiosConfig'];
		const {status} = await this.$axios.delete(`/route/${routeId}`, axiosConfig);
		if(status === 200){
			commit('REMOVE_ROUTE', routeId);
			return true;
		}else{
			console.error('Unable to delete route');
			return false;
		}
	}
};
