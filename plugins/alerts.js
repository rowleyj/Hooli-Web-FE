class Alerts {
	constructor(store) {
		this.store = store;
	}

	/**
	 * Sets values for custom default snackbar
	 * @param {String} text
	 * @param {String} color
	 * @param {Boolean} shape - whether snackbar is rounded or not
	 * @param {string} position - one of [centered | absolute | top | bottom]
	 */
	async setSnackbar(text, color, shape, position) {
		const style = {
			text: text,
			color: color,
			shape: shape,
			position: position
		};
		this.store.dispatch('snackbar/setSnackbar', style);
	}

	async setDefaultErrorSnackbar() {
		const style = {
			text: "default_error",
			color: "error",
			shape: true,
			position: "right"
		};
		this.store.dispatch('snackbar/setSnackbar', style);
	}

	async closeSnackbar() {
		this.store.dispatch('snackbar/closeSnackbar', false);
	}
}

export default ({ store }, inject) => {
	inject('alerts', new Alerts(store));
};
