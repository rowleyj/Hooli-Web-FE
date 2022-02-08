export const state = () => ({
	videos: []
});

export const mutations = {
	ADD_VIDEO(state, video) {
		state.videos.push(video);
	},
	CLEAR_VIDEOS(state) {
		state.videos = [];
	},
	REMOVE_VIDEO(state, id) {
		const index = state.videos.findIndex(vid => vid._id == id);
		if (index !== -1) {
			state.videos.splice(index, 1);
		}
	}
};

export const getters = {
	getVideos: state => state.videos
};

export const actions = {
	async fetchVideos({ commit }, axiosConfig) {
		const { data: videos } = await this.$axios.get('/video', axiosConfig);
		console.log('videos', videos);
		videos.forEach(video => {
			commit('ADD_VIDEO', video);
		});
	},
	async uploadVideo({ commit }, { axiosConfig, formData }) {
		const { data, status } = await this.$axios.post('/video', formData, axiosConfig);
		if (status === 201) {
			commit('ADD_VIDEO', data);
			return data;
		}
		throw Error('unable to add video');
	}
};
