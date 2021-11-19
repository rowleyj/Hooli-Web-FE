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
				<v-list-item @click.stop="hideRoute">
					<v-list-item-title>Hide</v-list-item-title>
				</v-list-item>
				<v-list-item @click.stop="deleteRoute">
					<v-list-item-title>Delete</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
export default {
	methods:{
		async deleteRoute(){
			console.log('delete route');
		},
		async hideRoute(){
			console.log('hide route');
		}
	}
}
</script>