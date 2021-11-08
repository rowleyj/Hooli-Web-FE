export const state = () => ({
	user: null,
});


export const mutations = {
	SET_USER (state, user) {
		state.user = user;
	},
	CLEAR_USER (state) {
		state.user = null;
	}
}

export const getters = {
	getUserId: state => state.user ? state.user._id : null
}

export const actions = {
	async login ({ commit }, payload) {
		const body = { ...payload, strategy: 'local' }
		const { data } = await this.$axios.post('/authentication', body);
		if (data && data.accessToken) {
			commit('SET_ACCESS_TOKEN', data.accessToken, { root: true })
			commit('SET_USER', data.users)
			return true;
		}
		return false;
	}
}