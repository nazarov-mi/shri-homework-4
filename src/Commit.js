const split = require('./util/split')

class Commit {

	/**
	 * @return {Commit}
	 */
	constructor () {
		this._hash = null
		this._author = null
		this._date = null
		this._subject = null
		this._isMerged = false
	}

	/**
	 * @param  {String} data
	 */
	parse (data) {
		const item = split(data, /\t/, 5)
		const parents = item[1].split(' ')

		this._isMerged = parents.length > 1
		this._hash = item[0]
		this._author = item[2]
		this._date = item[3]
		this._subject = item[4]
	}


	get hash () {
		return this._hash
	}

	get author () {
		return this._author
	}

	get date () {
		return this._date
	}

	get subject () {
		return this._subject
	}

	get isMerged () {
		return this._isMerged
	}
}

module.exports = Commit
