<template>
	<v-snackbar
		v-model="snackbar"
		:color="snackColor"
		:rounded="snackShape"
		class="grey--text text--darken-4 mb-16"
		elevation="4"
		timeout="30000"
		vertical
		:absolute="checkPosition('absolute')"
		:bottom="checkPosition('bottom')"
		:top="checkPosition('top')"
		:centered="checkPosition('centered')"
	>
		<v-icon
			v-if="snackColor === 'success'"
			color="white"
			class="mb-4"
		>mdi-check-circle</v-icon>
		<v-icon
			v-if="snackColor === 'error'"
			color="white"
			class="mb-4"
		>mdi-alert-circle</v-icon>
		<v-card-text
			class="pa-0 ma-0 white--text body-2">
			<!-- {{ snackText }} -->
			{{ getMessage(snackText) }}
		</v-card-text>
		<template #action="{ attrs }">
			<v-btn
				text
				v-bind="attrs"
				@click="snackbar = false"
				class="caption"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
import MessagesJSON from '@/assets/messages.json';

export default {
	computed: {
		snackbar: {
			get() {
				return this.$store.getters["snackbar/getSnackbar"];
			},
			set(val) {
				this.$store.commit("snackbar/SET_SNACKBAR_VISIBILITY", val);
			},
		},
		snackText() {
			return this.$store.getters["snackbar/getSnackText"];
		},
		snackColor() {
			return this.$store.getters["snackbar/getSnackColor"];
		},
		snackShape() {
			return this.$store.getters["snackbar/getSnackShape"];
		},
		snackPosition() {
			return this.$store.getters["snackbar/getSnackPosition"];
		}
	},
	data() {
		return {
			messages: MessagesJSON
		};
	},
	methods: {
		checkPosition(pos) {
			if (pos === this.snackPosition) {
				return true;
			}
			return false;
		},
		/**
		 * Get the text to display from the message key
		 * @param {String} msgKey - key that maps to messages JSON
		 */
		getMessage(msgKey) {
			const printText = this.messages[msgKey];
			if (!printText) {
				return msgKey;
			}
			return printText;
		}
	}
};
</script>
