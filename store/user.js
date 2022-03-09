import cookies from 'browser-cookies';

function setAuthCookie(token) {
	cookies.set('token', token, {
		expires: 7,
		secure: true,
		samesite: 'Strict'
	});
}

export const state = () => ({
	user: null,
});

export const mutations = {
	SET_USER(state, user) {
		state.user = user;
	},
	CLEAR_USER(state) {
		state.user = null;
	}
};

export const getters = {
	getUserId: state => (state.user ? state.user._id : null)
};

export const actions = {
	async login({ commit, dispatch }, payload) {
		const body = { ...payload, strategy: 'local' };
		const { data } = await this.$axios.post('/authentication', body);
		if (data && data.accessToken) {
			commit('SET_ACCESS_TOKEN', data.accessToken, { root: true });
			commit('SET_USER', data.users);
			setAuthCookie(data.accessToken);

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${data.accessToken}`
				}
			};
			dispatch('routes/fetchRoutes', axiosConfig, { root: true });
			dispatch('videos/fetchVideos', axiosConfig, { root: true });
			dispatch('activities/fetchRides', axiosConfig, { root: true });
			return true;
		}
		return false;
	}
};
