export const state = () => ({
	rides: [],
	closePasses: {}
});

export const mutations = {
	ADD_RIDE(state, ride) {
		state.rides.push(ride);
	},
	CLEAR_RIDES(state) {
		state.rides = [];
	},
	REMOVE_RIDE(state, rideId) {
		const index = state.rides.findIndex(ride => ride._id === rideId);
		if (index > -1) {
			state.rides.splice(index, 1);
		}
	},
	ADD_CLOSEPASS(state, closepass) {
		state.closePasses[closepass._id] = closepass;
	},
	CLEAR_CLOSEPASSES(state) {
		state.closePasses = {};
	}
};

export const getters = {
	getRides: state => state.rides,
	getRideById: state => (id) => state.rides.find((ride) => ride._id === id),
	getClosePasses: state => (closePassIds) => {
		const closePasses = [];
		closePassIds.forEach(closePassId => {
			if (state.closePasses[closePassId]) closePasses.push(state.closePasses[closePassId]);
		});

		return closePasses;
	}
};

export const actions = {
	async fetchRides({ commit }, axiosConfig) {
		const { data } = await this.$axios.get('/ride', axiosConfig);
		const rides = data;
		rides.forEach(ride => {
			commit('ADD_RIDE', ride);
		});
	},
	async fetchClosePasses({ commit, rootGetters }, { closePassIds }) {
		const axiosConfig = rootGetters.getAxiosConfig;
		const config = {
			...axiosConfig,
			params: {
				_id: closePassIds
			}
		};
		const { data } = await this.$axios.get('/closePass', config);
		const closePasses = data;

		closePasses.forEach(closepass => {
			commit('ADD_CLOSEPASS', closepass);
		});
	},
	async deleteRide({ commit, rootGetters }, id) {
		const axiosConfig = rootGetters.getAxiosConfig;
		await this.$axios.delete(`/ride/${id}`, axiosConfig);

		commit('REMOVE_RIDE', id);
	}
};
