const {
	DEFAULT_HASH
} = require('./config')

const split = require('./util/split')

class Branch {

	/**
	 * @return {Branch}
	 */
	constructor () {
		this._hash = null
		this._name = null
		this._subject = null
	}

	/**
	 * @param  {String} data
	 */
	parse (data) {
		const item = split(data, /\s+/, 4)
		const isHead = item[0] === '*'

		this._hash = isHead ? DEFAULT_HASH : item[2]
		this._name = item[1]
		this._subject = item[3]
	}


	get hash () {
		return this._hash
	}

	get name () {
		return this._name
	}

	get subject () {
		return this._subject
	}
}

module.exports = Branch
