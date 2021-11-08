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

};
