<template>
	<div class="text-center">
		<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					icon
					v-bind="attrs"
					v-on="on">
					<v-icon>
						mdi-dots-vertical
					</v-icon>
				</v-btn>
			</template>
			<v-list>
				<v-list-item @click="logout">
					<v-list-item-title>Logout</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
export default {
	methods: {
		/**
		 * Logs user out, and clears data from store
		 */
		async logout() {
			try {
				console.log('logging out')
				await this.$store.dispatch('logout');
				this.$router.push('/')
			} catch (error) {
				console.error(error);
			}
		}
	}
}
</script>

<style>

</style>