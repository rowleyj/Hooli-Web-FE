<template>
	<v-row
		justify="center"
		class="pb-3"
		no-gutters>
		<v-btn
			color="primary"
			class="mx-1"
			text
			@click="$emit('close')"
		>
			Close
		</v-btn>
		<v-btn
			:disabled="disabled"
			color="accent"
			class="mx-1"
			@click="$emit('submit')"
		>
			{{submitText}}
		</v-btn>
	</v-row>
</template>

<script>
export default {
	props: {
		submitText: {
			type: String,
			default: 'Submit'
		},
		disabled:{
			type: Boolean,
			default: false
		}
	}
}
</script>