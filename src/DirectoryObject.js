const split = require('./util/split')

class DirectoryObject {

	/**
	 * @return {DirectoryObject}
	 */
	constructor () {
		this._hash = null
		this._name = null
		this._type = null
	}

	/**
	 * @param  {String} data
	 */
	parse (data) {
		const item = split(data, /\s+/, 4)

		this._hash = item[2]
		this._name = item[3]
		this._type = item[1]
	}


	get hash () {
		return this._hash
	}

	get name () {
		return this._name
	}

	get type () {
		return this._type
	}

	get isDirectory () {
		return this._type === 'tree'
	}
}

module.exports = DirectoryObject
