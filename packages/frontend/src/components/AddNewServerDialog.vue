<template>
	<el-dialog title="Clone new server" :visible="open" @close="handleClose">
		<el-row class="h-100 dialog-body" type="flex" align="center">
			<el-col class="h-100" :span="7">
				<el-steps class="h-100" direction="vertical" :active="step">
					<el-step title="Info" icon="el-icon-edit"></el-step>
					<el-step title="Cloning" icon="el-icon-download"></el-step>
					<el-step title="Enqueue" icon="el-icon-cpu"></el-step>
				</el-steps>
			</el-col>
			<el-col :span="17">
				<el-form v-if="step === 0" :model="form">
					<el-form-item label="Server name" label-width="120px">
						<el-input
							v-model="form.name"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item label="Server git url" label-width="120px">
						<el-input
							v-model="form.gitUrl"
							autocomplete="off"
						></el-input>
					</el-form-item>
				</el-form>
				<StdBox v-if="step === 1" :text="stdText" />
			</el-col>
		</el-row>
		<span slot="footer" class="dialog-footer">
			<el-button @click="handleClose">Cancel</el-button>
			<el-button
				type="primary"
				@click="handleConfirm"
				:disabled="canCompleteJob"
			>
				Confirm
			</el-button>
		</span>
	</el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { IStd, IStatus } from "@ArcaneDiver/common";

import { API_URL } from "../config/api";

import StdBox from "@/components/StdBox.vue";

interface AddNewServerDialogData {
	form: {
		name: string;
		gitUrl: string;
	};
	step: 0 | 1 | 2;
	jobStatus: "in progress" | "done" | "error";
}

export default Vue.extend({
	components: {
		StdBox
	},
	props: {
		open: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			form: {
				name: "",
				gitUrl: ""
			},
			step: 0,
			stdText: "",
			jobStatus: "in progress",
		};
	},
	computed: {
		canCompleteJob() {
			return this.step === 0
			?
				this.canCompleteStep0()
			:
				this.step === 1
				?
					this.canCompleteStep1()
				:
					this.canCompleteStep2()
		}

	},
	methods: {
		handleClose() {
			this.$emit("close");
		},
		handleConfirm() {
			switch (this.step) {
				case 0: {
					this.handleStep0();
				}
				case 1: {
					this.handleStep1();
				}
				case 2: {
					this.handleStep2();
				}
			}
		},
		async handleStep0() {
			await axios.post(`${API_URL}/servers`, {
				...this.form
			});
			
			this.$socket.$subscribe(`${this.form.name}/stdout`, (payload: IStd) => {
				this.stdText = payload.message;
			});
			this.$socket.$subscribe(`${this.form.name}/done`, () => {
				this.handleStep1();
			});
			this.$socket.$subscribe(`${this.form.name}/error`, (payload: IStd) => {
				this.handleError(payload);
			});
			
			this.step++;
		},
		handleStep1() {
			this.$socket.$unsubscribe(`${this.form.name}/status`);
			this.$socket.$unsubscribe(`${this.form.name}/done`);
			this.$socket.$unsubscribe(`${this.form.name}/error`);

			this.$socket.$subscribe(`${this.form.name}/status`, (payload: IStatus) => {
				this.stdText = payload.message;
			});
			this.$socket.$subscribe(`${this.form.name}/done`, () => {
				this.handleStep1();
			});
			this.$socket.$subscribe(`${this.form.name}/error`, (payload: IStatus) => {
				this.handleError(payload);
			});

			this.step++;
		},
		handleStep2() {
			// E mo cosa fai eslint?
		},
		handleError(payload) {
			console.log(payload);
		},
		canCompleteStep0() {
			return !(this.form.name !== "" && this.form.gitUrl !== "");
		},
		canCompleteStep1() {
			return this.jobStatus === "done";
		},
		canCompleteStep2() {
			return this.jobStatus === "done";
		}
	}
});
</script>

<style scoped lang="scss">
.dialog-body {
	height: 250px;
}
</style>
