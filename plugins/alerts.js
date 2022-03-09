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

	/**
	 * Set custom error message
	 * @param {String} text - custom text or key matching messages.json string
	 */
	async setErrorSnackbar(text) {
		const style = {
			text: text,
			color: "error",
			shape: true,
			position: "centered"
		};
		this.store.dispatch('snackbar/setSnackbar', style);
	}

	/**
	 * Sets default centered error snackbar
	 */
	async setDefaultErrorSnackbar() {
		const style = {
			text: "default_error",
			color: "error",
			shape: true,
			position: "centered"
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
