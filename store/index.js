export const state = () => ({
	accessToken: null
});

export const mutations = {
	SET_ACCESS_TOKEN(state, token) {
		state.accessToken = token;
	}
};

export const getters = {
	getAccessToken: state => state.accessToken,
	getAxiosConfig: state => ({
		headers: {
			Authorization: `Bearer ${state.accessToken}`
		}
	})
};

export const actions = {
	logout({ commit }) {
		commit('SET_ACCESS_TOKEN', null);
		commit('user/CLEAR_USER');
		commit('routes/CLEAR_ROUTES');
		commit('videos/CLEAR_VIDEOS');
		commit('activities/CLEAR_RIDES');
	}
};
