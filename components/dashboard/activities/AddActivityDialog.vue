<template>
	<v-dialog
		v-model="dialog"
		width="600">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				small
				v-on="on"
				v-bind="attrs"
				class="mr-2"
				color="primary">
				<v-icon left>mdi-plus</v-icon>
				Add Activity
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="text-h5">
					Add New Activity
				</span>
				<v-spacer></v-spacer>
				<v-btn
					small
					icon
					@click="closeDialog">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-divider class="mt-2"></v-divider>
			<v-card-text>
				<v-text-field
					label="Title"
					v-model="title"></v-text-field>
				<v-textarea label="Description"></v-textarea>
				<v-file-input
					v-model="gpxFile"
					@change="convertGPXToGeoJSON"
					label="Ride File"
					prepend-icon="mdi-bicycle"
					hint="We use your data to calculate speed, calories burned, and show your route"></v-file-input>
				<v-file-input
					label="Video"
					prepend-icon="mdi-video"></v-file-input>
			</v-card-text>
			<submit-buttons
				submit-text="Create Activity"
				:disabled="convertingFile"
				@submit="createActivity()"
				@close="closeDialog"
			/>
		</v-card>
	</v-dialog>
</template>

<script>
const { default: SubmitButtons }=require("~/components/forms/SubmitButtons.vue")
import { gpx } from '@tmcw/togeojson';

export default {
	computed: {
		axiosConfig() {
			return this.$store.getters['getAxiosConfig'];
		}
	},
	components: { SubmitButtons },
	data(){
		return {
			dialog: false,
			gpxFile: null,
			geoJSON: null,
			convertingFile: false,
			title: ''
		}
	},
	methods: {
		closeDialog(){
			this.dialog = false;
		},
		async convertGPXToGeoJSON(){
			try {
				this.convertingFile = true;
				const text = await this.gpxFile.text()
				const dom = new DOMParser().parseFromString(text, "text/xml");
				const geoJSON = this.$_.get(gpx(dom), 'features[0].geometry.coordinates');
				// tested file also had elevation but not necessary for us right now
				if(geoJSON) this.geoJSON = geoJSON.map(val => [val[1], val[0]]);
				this.convertingFile = false;
			} catch (error) {
				this.convertingFile = false;
				console.error(error);
			}
		},
		/**
		 * Create a users activity, upload files to server
		 */
		async createActivity(){
			try {
				// const formData = new FormData();
				// // formData.append("ride", this.gpxFile);
				// formData.append('geoJSON', this.geoJSON);
				// formData.append("title", this.title);
				if(!this.geoJSON) throw Error('Missing GPS file')
				const {data, status} = await this.$axios.post('/ride', {
					title: this.title,
					geoJSON: this.geoJSON
				}, this.axiosConfig);
				if(status == 201){
					console.log(data);
					// this.closeDialog()
				}else{
					throw Error('unable to add video');
				}
			} catch (error) {
				console.log(error);
			}
		}
	},
	props: {
	}
}
</script>