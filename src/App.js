const {
	REPOSITORY_PATH
} = require('./config')

const BranchesList = require('./BranchesList')
const CommitsList = require('./CommitsList')
const Directory = require('./Directory')
const ExecStreamReader = require('./ExecStreamReader')
const Uid = require('./Uid')

class App {

	constructor () {
		this._branches = new BranchesList()
		this._commits = new CommitsList()
		this._directory = new Directory()
		this._uid = new Uid()
	}

	async change (uid) {
		const currentUid = this._uid.copy(uid)

		await this._branches.change()
		await this._commits.change(currentUid)
		await this._directory.change(currentUid)
	}

	async getFileData (uid) {
		const reader = new ExecStreamReader()

		this._uid.set(uid.hash, uid.prevPath)

		const res = await reader.start('git', ['show', uid.src], {
			cwd: REPOSITORY_PATH
		})

		return res
	}


	get branches () {
		return this._branches
	}

	get commits () {
		return this._commits
	}

	get directory () {
		return this._directory
	}

	get uid () {
		return this._uid
	}
}

module.exports = App
