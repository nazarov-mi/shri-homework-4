/**
 * @class
 */
class DirectoryObject {

	/**
	 * @param {String} hash
	 * @param {String} name
	 * @param {String} type
	 * @return {DirectoryObject}
	 */
	constructor (hash, name, type) {
		this._hash = hash
		this._name = name
		this._type = type
	}


	/**
	 * @return {String}
	 */
	get hash () {
		return this._hash
	}

	/**
	 * @return {String}
	 */
	get name () {
		return this._name
	}

	/**
	 * @return {String}
	 */
	get type () {
		return this._type
	}

	/**
	 * @return {Boolean}
	 */
	get isDirectory () {
		return this._type === 'tree'
	}
}

module.exports = DirectoryObject
