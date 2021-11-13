<template>
	<v-container>
		<v-card>

			<v-toolbar
				color="primary"
				dark>
				<v-toolbar-title class="pr-4">
					<div>
						Dashboard

					</div>
				</v-toolbar-title>
				<v-divider
					vertical
					class="mx-4"></v-divider>
				<v-spacer></v-spacer>
				<v-tabs
					v-model="tab"
				>
					<v-tabs-slider color="accent"></v-tabs-slider>

					<v-tab
						v-for="item in tabs"
						:key="item.name"
					>
						<v-icon left>{{item.icon}}</v-icon>
						{{ item.name }}
					</v-tab>
				</v-tabs>
				<v-btn
					icon
					@click="settingsDialog = true">
					<v-icon>mdi-cog</v-icon>
				</v-btn>
			</v-toolbar>
			<v-tabs-items v-model="tab">
				<v-tab-item>
					<ActivityFeed/>
				</v-tab-item>
				<v-tab-item>
					<Routes/>
				</v-tab-item>
				<v-tab-item>
					<stats/>
				</v-tab-item>
				<v-tab-item>
					<video-feed/>
				</v-tab-item>
			</v-tabs-items>
		</v-card>
		<v-dialog
			v-model="settingsDialog"
			width="600">
			<v-card width="600">
				<v-toolbar
					class="mb-2"
					color="primary"
					dark
					dense>
					<v-card-title>
						Settings
					</v-card-title>
				</v-toolbar>
				<v-card-text>
					form to change profile settings
					<v-text-field
						placeholder="Setting 1"
						clearable></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						@click="settingsDialog = false"
						color="accent">Close</v-btn>
					<v-btn
						@click="saveSettings()"
						color="primary">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import ActivityFeed from '@/components/dashboard/ActivityFeed.vue'
import Stats from '~/components/dashboard/Stats.vue'
import VideoFeed from '@/components/dashboard/VideoFeed.vue'
import Routes from '@/components/dashboard/Routes.vue'

export default {
	computed: {
		accessToken(){
			return this.$store.getters['getAccessToken'];
		},
		axiosConfig(){
			return this.$store.getters['getAxiosConfig']
		}
	},
	components: {
		Routes,
		ActivityFeed,
		Stats,
		VideoFeed
	},
	layout: 'dashboard',
	data() {
		return {
			tab: 0,
			tabs: [
				{name: 'Activities', icon: 'mdi-bike'},
				{name: 'Routes', icon: 'mdi-map-marker-account'},
				{name: 'Stats', icon: 'mdi-chart-timeline-variant'},
				{name: 'Videos', icon: 'mdi-video'},
			],
			settingsDialog: false
		}
	},
	methods: {
		init(){

		},
		saveSettings () {
			console.log('save settings');
			this.settingsDialog = false;
		}
	},
	watch: {
		accessToken(newVal, oldVal){
			if(newVal){
				this.init();
			}
		}
	}
}
</script>