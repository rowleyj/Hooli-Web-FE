<template>
	<v-container>
		<v-row
			justify="center"
			align="center" >
			<v-card flat>
				<v-img
					src="/hooli.jpg"
					max-height="300"
					max-width="300"
					style="border-radius: 50%"></v-img>
				<v-container>
					<v-row justify="center">
						<v-card-title>
							Ride Safe
						</v-card-title>
					</v-row>
				</v-container>

			</v-card>

		</v-row>
		<v-row
			justify="center"
		>
			<v-col
				md="4"
				sm="6"
				cols="12">
				<v-alert
					color="primary"
					dark
					class="text-center">
					<h2>What are the issues?</h2>

				</v-alert>
				<v-card
					class="ma-1 text-center"
					shaped
					v-for="(text, idx) in toChange"
					:key="`changeText${idx}`">
					<v-card-text>
						{{text}}
					</v-card-text>
				</v-card>
			</v-col>
			<v-col
				md="4"
				sm="6"
				cols="12">
				<v-alert
					color="accent"
					class="text-center">
					<h2>Our solution</h2>

				</v-alert>
				<v-card
					class="ma-1 text-center"
					shaped
					v-for="(text, idx) in how"
					:key="`howText${idx}`">
					<v-card-text>
						{{text}}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- TODO: If we get route suggestions done then include -->
		<!-- <v-row
			justify="center"
			align="center">
			<v-col md="8">
				<h2 style="text-align: center">Routes that avoid accidents</h2>
				<v-row
					justify="center"
					class="ma-2">
					<Map> </Map>
				</v-row>
			</v-col>
		</v-row> -->
	</v-container>

</template>

<script>
// import Map from '~/components/Map.vue';

export default {
	// components: { Map },
	data() {
		return {
			toChange: [
				'On average, 74 cyclists are killed every year in Canada',
				'73% of those deaths are caused by a motor vehicle collision',
				'Ontario introduced a one-meter passing law, but it is not easily enforced',
			],
			how: [
				'Detects oncoming vehicles that are less than a meter away and warns the cyclist through push notifications on their phone',
				'Records the video of the close pass incident',
				'Grabs and stores the license plate from the video',
				'Help cyclists identify offenders',
				'Warn of possible collisions in real-time'
			],
			fakeText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
		};
	},
	mounted() {
		console.log(this.$L);
	}
};
</script>
