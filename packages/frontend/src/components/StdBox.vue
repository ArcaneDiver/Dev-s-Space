<template>
	<div class="box">
		<div>
			{{text}}
		</div>
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



	& > div {
		overflow-x: scroll;
		width: 100%;
		height: 100%;
		word-break: keep-all;
	}
}
</style>
