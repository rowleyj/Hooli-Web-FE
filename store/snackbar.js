export const state = () => ({
	snackbar: false,
	snackText: '',
	snackColor: 'primary',
	snackShape: true,
	snackPosition: '',
});

export const mutations = {
	// Sets bar to visible, and inserts text
	INIT_SNACKBAR(state, style) {
		state.snackbar = true;
		state.snackText = style.text;
		state.snackColor = style.color;
		state.snackShape = style.shape;
		state.snackPosition = style.position;
	},
	SET_SNACKBAR_VISIBILITY(state, val) {
		state.snackbar = val;
	}
};

export const getters = {
	getSnackText: state => state.snackText,
	getSnackbar: state => state.snackbar,
	getSnackColor: state => state.snackColor,
	getSnackShape: state => state.snackShape,
	getSnackPosition: state => state.snackPosition
};

export const actions = {
	/*
	*   Sets the global snackbar to be visible and inserts text
	*/
	async setSnackbar({ commit }, style) {
		commit('INIT_SNACKBAR', style);
	},

	async closeSnackbar({ commit }, close) {
		commit('SET_SNACKBAR_VISIBILITY', close);
	}

};
