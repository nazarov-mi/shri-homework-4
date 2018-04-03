const {
	REPOSITORY_PATH
} = require('./config')

const BranchesList = require('./BranchesList')
const CommitsList = require('./CommitsList')
const Directory = require('./Directory')
const ExecStreamReader = require('./ExecStreamReader')
const Uid = require('./Uid')

/**
 * @class
 */
class App {

	/**
	 * @return {Branch}
	 */
	constructor () {
		this._branches = new BranchesList()
		this._commits = new CommitsList()
		this._directory = new Directory()
		this._uid = new Uid()
	}

	/**
	 * @async
	 * @param  {Uid} uid
	 * @return {Promise}
	 */
	async change (uid) {
		const currentUid = this._uid.copy(uid)

		await this._branches.change()
		await this._commits.change(currentUid)
		await this._directory.change(currentUid)
	}

	/**
	 * @async
	 * @param  {Uid} uid
	 * @return {String}
	 */
	async getFileData (uid) {
		const reader = new ExecStreamReader()

		this._uid.set(uid.hash, uid.prevPath)

		const res = await reader.start('git', ['show', uid.src], {
			cwd: REPOSITORY_PATH
		})

		return res
	}


	/**
	 * @return {BranchesList}
	 */
	get branches () {
		return this._branches
	}

	/**
	 * @return {CommitsList}
	 */
	get commits () {
		return this._commits
	}

	/**
	 * @return {Directory}
	 */
	get directory () {
		return this._directory
	}

	/**
	 * @return {Uid}
	 */
	get uid () {
		return this._uid
	}
}

module.exports = App
