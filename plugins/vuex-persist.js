import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
	window.onNuxtReady(() => {
		new VuexPersistence({
			/* your options */
			key: 'vuex', //key in the local storage being persisted{everything in store will be pushed here}
			storage: sessionStorage,
			// reducer: (state) => ({authToken: state.auth.authUser, user: state.auth.user})
		}).plugin(store);
	});
}