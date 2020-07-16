import * as path from 'path';
import fs, { promises as fsPromises } from "fs"
import { Router, Application } from 'express';
import * as yup from "yup"
import YAML from "yaml"

import { SERVERS_PATH, SERVER_CONFIG_PATH } from "./env"
import { ServerAlreadyExists, StdError, ServerConfingNotExists } from './errors'
import { clone } from "./git utils"
import { Socket } from './socket'
import { handleErrorFromGenerator } from "./generators"
import { serverConfigSchema } from './schemas';
import { ServerConfigs } from "../types"

export interface IServer {
	name: string;
	path: string;
	entryPath?: string;
}

export class Servers {

	public static readonly PATH: string = SERVERS_PATH;
	private static INSTANCE: Servers;


	private _servers: IServer[];
	private _serversRouter: Router;

	private constructor() {
		this._servers = [];
	}

	public static getInstance(): Servers {
		if (!this.INSTANCE)
			this.INSTANCE = new Servers();

		return this.INSTANCE;
	}

	public static resolveServerPath(repoName: string) {
		return path.resolve(this.PATH, repoName);
	}

	public static resolveYarnSettingsPath(server: IServer) {
		return path.resolve(server.path, SERVER_CONFIG_PATH);
	}


	public async init(serversRouter: Router) {

		console.log("Initializing");

		this._serversRouter = serversRouter;


		const folders = await this.readServerDir();

		folders.forEach((folder, i) => this._servers[i] = {
			name: folder,
			path: Servers.resolveServerPath(folder)
		});

		console.log(` ${folders.length} folder founded`, folders);


	}

	public get servers() {
		return this._servers;
	}

	public fromName(name: string): IServer {
		const out = this._servers.find(server => server.name === name)

		if (!out)
			throw new Error("Can't find server from" + name);

		return out;
	}

	public async addNewServer(url: string, name: string) {
		console.log("Adding new server started");

		this.checkServerNameExists(name);

		try {
			await this.cloneServer(url, name);
		} catch (e) {

			console.error(e instanceof StdError ? " [STDERROR] Error in the process" : " [ERROR] Unknown Error");

			return;
		}

		try {
			await this.validateServer(name);

		} catch (e) {
			console.log(e.message);

			return;
		}


		try {
			await this.enqueueServer(name);
		} catch (e) {
			console.error(e.message);

			return;
		}

	}

	private async readServerDir() {
		return await fsPromises.readdir(Servers.PATH);
	}

	private checkServerNameExists(name: string) {
		if (this._servers.find(s => s.name === name))
			throw new ServerAlreadyExists();
	}

	private checkServerSettingsExists(filePath: string) {
		if (!fs.existsSync(filePath))
			throw new ServerConfingNotExists();
	}

	private async cloneServer(url: string, name: string) {
		console.log("Cloning server", name);

		const generator = clone("https://github.com/ArcaneDiver/gesco-MediaPonderata", name);

		const generatorWhichHandleErrors = handleErrorFromGenerator(generator);

		await Socket.getInstance().sendStdOutWithSocket(generatorWhichHandleErrors, name);
	}

	private async validateServer(name: string) {
		const server = this.fromName(name);
		const configFilePath = Servers.resolveYarnSettingsPath(server);
		const configFile = fs.readFileSync(configFilePath).toString();

		const parsedConfigFile = YAML.parse(configFile);

		serverConfigSchema.isValidSync(parsedConfigFile);

		server.entryPath = (parsedConfigFile as ServerConfigs).entryPath;
	}

	private async enqueueServer(name: string) {
		const server = this.fromName(name);

		if (!server.entryPath)
			throw new Error("Entry path not found in Server object");

		const serverExpressApp: Application = await import(server.entryPath);

		// TODO: Scope custom process.env
		this._serversRouter.use(server.name, serverExpressApp);
	}
}
