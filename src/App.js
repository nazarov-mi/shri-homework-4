const { exec: nativeExec } = require('child_process')
const { promisify } = require('util')

const exec = promisify(nativeExec)

function App() {
	this.defaultHash = 'HEAD'
	this.currentHead = this.defaultHash
	this.currentHash = this.defaultHash
	this.branches = []
	this.directory = []
}

App.prototype.parseBranches = function (data) {
	const rows = String(data).split(/\n/).filter((row) => (!!row))

	return rows.map((row) => {
		const item = row.match(/^(\*)?\s+([^\s]+)\s+([^\s]+)\s+(.+)$/)

		return {
			isCurrent: item[1] === '*',
			name: item[2],
			hash: item[3],
			message: item[4]
		}
	})
}

App.prototype.changeBranch = async function (hash) {
	const currentHash = hash || this.defaultHash

	try {
		const res = await exec('git branch -v')

		this.currentHead = currentHash
		this.branches = this.parseBranches(res.stdout)

		return this.branches
	} catch (e) {
		throw e
	}
}

App.prototype.parseCommits = function (data) {
	const rows = String(data).split(/\n/).filter((row) => (!!row))

	return rows.map((row) => {
		const item = row.match(/^([^\t]*)\t+([^\t]*)\t+([^\t]*)\t+([^\t]*)\t+(.+)$/)

		return {
			isMerged: String(item[2]).split(/\s/).length > 1,
			hash: item[1],
			author: item[3],
			date: item[4],
			message: item[5]
		}
	})
}

App.prototype.changeCommit = async function (hash) {
	const currentHash = hash || this.defaultHash

	try {
		const res = await exec(`git log --pretty=format:"%H\t%p\t%an\t%ad\t%s" ${currentHash}`)

		return this.parseCommits(res.stdout)
	} catch (e) {
		throw e
	}
}

App.prototype.parseDirectory = function (data) {
	const rows = String(data).split(/\n/).filter((row) => (!!row))

	return rows.map((row) => {
		const item = row.match(/^([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.+)$/)

		return {
			type: item[2],
			hash: item[3],
			name: item[4]
		}
	})
}

App.prototype.changeDirectory = async function (hash) {
	const currentHash = hash || this.defaultHash

	try {
		const res = await exec(`git ls-tree --full-name ${currentHash}`)

		this.currentHash = currentHash
		this.directory = this.parseDirectory(res.stdout)
 
		return this.directory
	} catch (e) {
		throw e
	}
}

module.exports = new App()
