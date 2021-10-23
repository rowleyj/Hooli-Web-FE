<template>
	<v-container>
		<v-row>
			<v-col
				cols="12"
				lg="4">
				<v-card
					width="100%"
					class="mx-auto"
				>
					<v-toolbar
						color="primary"
						dense
						dark>Created Routes
						<v-spacer></v-spacer>
						<v-btn icon>
							<v-icon>
								mdi-plus</v-icon>
						</v-btn>
					</v-toolbar>
					<v-list>
						<v-list-item-group
							v-model="selected"
						>
							<v-list-item
								v-for="route in routes"
								:key="route.id">
								<v-list-item-content>
									{{route.name}}

								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>

					</v-list>
				</v-card>

			</v-col>
			<v-col
				cols="12"
				lg="8">
				<v-card
					flat
					height="100%"
					width="100%"
					class="mx-auto pa-2">
					<v-row
						justify="center">
						<Map
							:height="600"
							width="100%"
							:zoom="12"/>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			selected: [],
			routes: [
				{
					name: 'route 1',
					id: 'abc'
				},
				{
					name: 'route 2',
					id: 'abc1'
				}
			]
		}

	}
}
</script>

<style>

</style>