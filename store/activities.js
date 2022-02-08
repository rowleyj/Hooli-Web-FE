export const state = () => ({
	rides: []
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
	}
};

export const getters = {
	getRides: state => state.rides,
	getRideById: state => (id) => state.rides.find((ride) => ride._id === id),
};

export const actions = {
	async fetchRides({ commit }, axiosConfig) {
		const { data } = await this.$axios.get('/ride', axiosConfig);
		const rides = data;
		console.log('rides', rides);
		rides.forEach(ride => {
			commit('ADD_RIDE', ride);
		});
	},
	async deleteRide({ commit, rootGetters }, id) {
		const axiosConfig = rootGetters.getAxiosConfig;
		const { status } = await this.$axios.delete(`/ride/${id}`, axiosConfig);
		console.log(status);

		commit('REMOVE_RIDE', id);
	}
};
