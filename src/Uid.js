/**
 * @class
 */
class Uid {

	/**
	 * @param  {String} hash
	 * @param  {String} path
	 * @return {Uid}
	 */
	constructor (hash, path) {
		this._hash = null
		this._path = null

		this.set(hash, path)
	}

	/**
	 * @param  {String} hash
	 * @param  {String} path
	 * @return {Uid}
	 */
	set (hash, path) {
		if (path !== false) {
			this.setPath(path)
		}

		if (hash !== false) {
			this.setHash(hash)
		}

		return this
	}

	/**
	 * @param  {String} hash
	 * @return {Uid}
	 */
	setHash (hash) {
		if (this._hash && !this.equalHash(hash)) {
			this._path = null
		}

		this._hash = hash || 'HEAD'

		return this
	}

	/**
	 * @param  {String} path
	 * @return {Uid}
	 */
	setPath (path) {
		this._path = this.constructor._formatPath(path)

		return this
	}

	/**
	 * @param  {String} hash
	 * @return {Boolean}
	 */
	equalHash (hash) {
		return hash
			? this._hash === hash
			: this._hash === 'HEAD'
	}

	/**
	 * @param  {String} path
	 * @return {Boolean}
	 */
	equalPath (path) {
		const formatedPath = this.constructor._formatPath(path)

		return this._path === formatedPath
	}

	/**
	 * @param  {Uid} uid
	 * @return {Boolean}
	 */
	equal (uid) {
		return uid && this.src === uid.src
	}

	/**
	 * @param  {Uid} uid
	 * @return {Uid}
	 */
	copy (uid) {
		if (uid) {
			this.set(uid.hash, uid.path)
		}

		return this
	}

	/**
	 * @param {String} path
	 * @return {String}
	 */
	static _formatPath (path) {
		if (typeof path !== 'string') {
			return null
		}

		return path.replace(/(^\.\/|\/$)/g, '')
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
	get path () {
		return this._path
	}

	/**
	 * @return {String}
	 */
	get src () {
		const path = this._path
		const hash = this._hash

		return hash + (path ? `:${path}` : '')
	}

	/**
	 * @return {String}
	 */
	get prevPath () {
		const path = this._path

		if (typeof path !== 'string') {
			return null
		}

		const formatedPath = this.constructor._formatPath(path)

		if (!formatedPath) {
			return null
		}

		const parts = formatedPath.split('/')

		if (parts.length === 1) {
			return './'
		}

		parts.pop()

		return parts.join('/')
	}
}

module.exports = Uid
