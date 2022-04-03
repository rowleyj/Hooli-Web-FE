import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
	window.onNuxtReady(() => {
		new VuexPersistence({
			/* your options */
			key: 'vuex_hooli',
			storage: sessionStorage,
		}).plugin(store);
	});
};
