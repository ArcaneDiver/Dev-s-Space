<template>
	<div class="box">
		{{text}}
	</div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
	props: {
		text: {
			required: true,
			type: String,
			default: "Waiting..."
		}
	}
});
</script>

<style scoped lang="scss">
.box {
	width: 100%;
	height: 100%;
	padding: 30px;

	background-color: black;
	color: white;
}
</style>
