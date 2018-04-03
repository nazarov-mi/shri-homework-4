const { format } = require('date-fns')

/**
 * @class
 */
class Commit {

	/**
	 * @param {String} hash
	 * @param {String} author
	 * @param {String} date
	 * @param {String} subject
	 * @param {Boolean} isMerged
	 * @return {Commit}
	 */
	constructor (hash, author, date, subject, isMerged) {
		this._hash = hash
		this._author = author
		this._date = format(date, 'MMMM Do YYYY')
		this._subject = subject
		this._isMerged = isMerged
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
	get author () {
		return this._author
	}

	/**
	 * @return {String}
	 */
	get date () {
		return this._date
	}

	/**
	 * @return {String}
	 */
	get subject () {
		return this._subject
	}

	/**
	 * @return {Boolean}
	 */
	get isMerged () {
		return this._isMerged
	}
}

module.exports = Commit
