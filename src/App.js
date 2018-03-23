const { exec: nativeExec } = require('child_process')
const { promisify } = require('util')
const path = require('path')

const exec = promisify(nativeExec)
const currentPath = path.join(__dirname, './local-repository')

function getPath () {
	return currentPath
}

function split (value, separator, limit) {
	let string = String(value)

	if (limit <= 1) {
		return string
	}

	const parts = []
	let i = 0

	while (i ++ < limit - 1) {
		const match = string.match(separator)
		const skip = match && match[0]

		if (!skip) {
			break
		}

		const part = string.slice(0, match.index)

		parts.push(part)
		string = string.slice(match.index + skip.length)
	}

	if (string !== '') {
		parts.push(string)
	}

	return parts
}

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
		const item = split(row, /\s+/, 4)

		return {
			name: item[1],
			hash: item[2],
			message: item[3]
		}
	})
}

App.prototype.changeBranch = async function (hash) {
	const currentHash = hash || this.defaultHash

	try {
		const path = getPath()
		const res = await exec(`cd ${path} && git branch -v`)

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
		const item = split(row, /\t/, 5)

		return {
			isMerged: String(item[1]).split(' ').length > 1,
			hash: item[0],
			author: item[2],
			date: item[3],
			message: item[4]
		}
	})
}

App.prototype.changeCommit = async function (hash) {
	const currentHash = hash || this.defaultHash

	try {
		const path = getPath()
		const res = await exec(`cd ${path} && git log --date=iso8601 --pretty=format:"%H\t%p\t%an\t%aI\t%s" ${currentHash}`)

		return this.parseCommits(res.stdout)
	} catch (e) {
		throw e
	}
}

App.prototype.parseDirectory = function (data) {
	const rows = String(data).split(/\n/).filter((row) => (!!row))

	return rows.map((row) => {
		const item = split(row, /\s+/, 4)

		return {
			isDirectory: item[1] === 'tree',
			type: item[1],
			hash: item[2],
			name: item[3]
		}
	})
}

App.prototype.changeDirectory = async function (hash) {
	const currentHash = hash || this.defaultHash

	try {
		const path = getPath()
		const res = await exec(`cd ${path} && git ls-tree --full-name ${currentHash}`)

		this.currentHash = currentHash
		this.directory = this.parseDirectory(res.stdout)
 
		return this.directory
	} catch (e) {
		throw e
	}
}

module.exports = new App()
