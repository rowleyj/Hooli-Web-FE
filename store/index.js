export const state = () => ({
	accessToken: null
});

export const mutations = {
	SET_ACCESS_TOKEN (state, token) {
		state.accessToken = token;
	}
};

export const getters = {
	getAccessToken: state => state.accessToken,
	getAxiosConfig: state => ({
		headers: {
			Authorization: `Bearer ${data.accessToken}`
		}
	})
}

export const actions = {

};
