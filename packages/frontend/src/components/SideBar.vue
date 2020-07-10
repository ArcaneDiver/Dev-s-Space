<template>
	<el-menu default-active="2" :collapse="true">
		<el-menu-item v-for="(server, index) in servers" :key="index" :index="String(index)" @click="serverChangeHandle(index)">
			<i class="el-icon-s-tools"></i>
			<span slot="title">{{ server.name }}</span>
		</el-menu-item>
		<el-menu-item :key="servers.length" :index="String(servers.length)" @click="addNewServerHandler">
			<i class="el-icon-circle-plus"></i>
			<span slot="title">Add new server</span>
		</el-menu-item>
	</el-menu>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	props: {
		servers: Array
	},
	mounted() {
		console.log(this.$props.servers);
	},
	methods: {
		serverChangeHandle(index: number) {
			this.$emit("server_focus_change", index);
		},
		addNewServerHandler() {
			this.$emit("server_add");
		}
	}

});
</script>
