<template>
	<div class="box">
		<div>
			<div>
				{{ text }}
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";

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
		width: 100%;
		height: 100%;
		overflow-x: auto;
	}

	& > div::-webkit-scrollbar {
		width: 2px;
	}
	& > div::-webkit-scrollbar-track {
		background: transparent;
	}
	& > div::-webkit-scrollbar-thumb {
		background: #b5b6b8;
		border-radius: 10px;
	}

	& > div > div {
		width: 100%;
		height: 100%;
		word-break: keep-all;
		text-align: left;
	}
}
</style>
