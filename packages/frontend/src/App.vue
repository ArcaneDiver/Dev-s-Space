<template>
	<div id="app">
		<el-row v-if="servers" class="h-100">
			<el-col class="h-100" :span="3">
				<SideBar
					:servers="servers"
					class="w-100 h-100"
					@server_focus_change="changeServerFocus"
					@server_add="addNewServer"
				/>
			</el-col>
			<el-col class="h-100" :span="21">
				<div class="w-100 h-100"></div>
			</el-col>
		</el-row>
		<AddNewServerDialog
			:open="isDialogOpened"

			@close="handleCloseCreateServerDialog"
		/>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios"

import SideBar from "./components/SideBar.vue";
import AddNewServerDialog from "./components/AddNewServerDialog.vue"

import { API_URL } from "./config/api";

export default Vue.extend({
	components: {
		SideBar,
		AddNewServerDialog
	},
	data() {
		return {
			servers: null,
			isDialogOpened: true
		};
	},
	methods: {
		changeServerFocus(e: unknown) {
			console.log(e);
		},
		addNewServer() {
			this.isDialogOpened = true;
		},
		handleCloseCreateServerDialog() {
			this.isDialogOpened = false;
		},
		async fetchServers() {
			const res = await axios.get(`${API_URL}/servers`);
			this.servers = res.data;
		}
	},
	mounted() {
		this.fetchServers()
			.catch((e) => console.error(e))
	},
	computed: {
		loaded(): boolean {
			return !!this.servers;
		},

	}
});
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
		SimSun, sans-serif;
	text-align: center;
}

.w-100 {
	width: 100%;
}

.h-100 {
	height: 100%;
}
</style>

<style scoped lang="scss">
#app {
	height: 100vh;
	width: 100%;
}
</style>
