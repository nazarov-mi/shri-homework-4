/**
 * @class
 */
class Branch {

	/**
	 * @param {String} hash
	 * @param {String} name
	 * @param {String} subject
	 * @return {Branch}
	 */
	constructor (hash, name, subject) {
		this._hash = hash
		this._name = name
		this._subject = subject
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
	get subject () {
		return this._subject
	}
}

module.exports = Branch
