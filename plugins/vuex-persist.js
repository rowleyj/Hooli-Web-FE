import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
	window.onNuxtReady(() => {
		new VuexPersistence({
			/* your options */
			key: 'vuex_hooli',
			storage: sessionStorage,
			// reducer: (state) => ({authToken: state.auth.authUser, user: state.auth.user})
		}).plugin(store);
	});
};
