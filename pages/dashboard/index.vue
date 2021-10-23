<template>
	<v-container>
		<v-card>

			<v-toolbar>
				<v-toolbar-title>
					Dashboard
				</v-toolbar-title>
				<template v-slot:extension>
					<v-tabs
						v-model="tab"
						align-with-title
					>
						<v-tabs-slider color="yellow"></v-tabs-slider>

						<v-tab
							v-for="item in tabs"
							:key="item.name"
						>
							<v-icon left>{{item.icon}}</v-icon>
							{{ item.name }}
						</v-tab>
					</v-tabs>
				</template>
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
	</v-container>
</template>

<script>
import ActivityFeed from '@/components/dashboard/ActivityFeed.vue'
import Stats from '~/components/dashboard/Stats.vue'
import VideoFeed from '@/components/dashboard/VideoFeed.vue'
import Routes from '@/components/dashboard/Routes.vue'

export default {
	components: {
		Routes,
		ActivityFeed,
		Stats,
		VideoFeed
	},
	data() {
		return {
			tab: 0,
			tabs: [
				{name: 'Activities', icon: 'mdi-bike'},
				{name: 'Routes', icon: 'mdi-map-marker-account'},
				{name: 'Stats', icon: 'mdi-chart-timeline-variant'},
				{name: 'Videos', icon: 'mdi-video'},
			]
		}
	}
}
</script>