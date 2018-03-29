const {
	REPOSITORY_PATH
} = require('./config')

const BranchesList = require('./BranchesList')
const CommitsList = require('./CommitsList')
const Directory = require('./Directory')
const ExecStreamReader = require('./ExecStreamReader')
const { join } = require('path')

class App {

	constructor () {
		this._branches = new BranchesList()
		this._commits = new CommitsList()
		this._directory = new Directory()
		this._hash = 'HEAD'
		this._path = ''
	}

	async change (hash, path) {
		let currentHash = hash || 'HEAD'
		let currentPath = path || ''

		if (this._hash !== currentHash) {
			currentPath = ''
		}

		if (currentPath !== '') {
			currentPath = path.replace(/(^\.?\/|\/$)/g, '')
		}

		await this._branches.change()
		await this._commits.change(currentHash)
		await this._directory.change(currentHash, currentPath)

		this._hash = currentHash
		this._path = currentPath
	}

	async getFileData (hash, path) {
		const reader = new ExecStreamReader()
		const blobIhs = `${hash}:${path}`

		return await reader.start('git', ['show', blobIhs], {
			cwd: REPOSITORY_PATH
		})
	}

	getPrevPath (path) {
		if (typeof path !== 'string') {
			return null
		}

		const formatedPath = path.replace(/(^\.\/|\/$)/g, '')

		if (formatedPath === '') {
			return null
		}

		const parts = formatedPath.split('/')

		if (parts.length === 1) {
			return './'
		}

		parts.pop()

		return parts.join('/')
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

	get hash () {
		return this._hash
	}

	get path () {
		return this._path
	}
}

module.exports = App
