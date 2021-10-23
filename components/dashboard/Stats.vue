<template>
	<v-container>
		<v-row class="my-2">
			<v-card
				width="100%"
				flat
			>
				<v-row justify="center">
					<v-col
						cols="4"
						class="pa-2">
						<v-toolbar
							flat
						>
							<v-btn
								outlined
								class="mr-4"
								color="grey darken-2"
								@click="setToday"
							>
								Today
							</v-btn>
							<v-btn
								fab
								text
								small
								color="grey darken-2"
								@click="prev"
							>
								<v-icon small>
									mdi-chevron-left
								</v-icon>
							</v-btn>
							<v-btn
								fab
								text
								small
								color="grey darken-2"
								@click="next"
							>
								<v-icon small>
									mdi-chevron-right
								</v-icon>
							</v-btn>
							<v-toolbar-title v-if="$refs.calendar">
								{{ $refs.calendar.title }}
							</v-toolbar-title>
							<v-spacer></v-spacer>
						</v-toolbar>
						<v-sheet
							color="primary"
							class="pa-1"
							height="350">
							<v-calendar
								ref="calendar"
								v-model="focus"
								color="primary"
								type="month"
								@change="updateRange"></v-calendar>
						</v-sheet>
					</v-col>
					<v-col cols="7">
						<v-card
							class="pa-2"
							height="100%">
							stats
						</v-card></v-col>
				</v-row>
			</v-card>
		</v-row>
		<v-row class="my-4 mx-4 pt-4">
			<v-card width="100%">
				other stats
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			focus: ''
		}
	},
	methods: {
		prev () {
			console.log(this.$refs)
			this.$refs.calendar.prev()
		},
		next () {
			this.$refs.calendar.next()
		},
		setToday () {
			this.focus = ''
		},
		updateRange ({start,end}) {
			console.log('updating range');
		}
	}
}
</script>

<style>

</style>