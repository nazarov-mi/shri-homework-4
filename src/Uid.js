
class Uid {
	constructor (hash, path) {
		this._hash = null
		this._path = null

		this.set(hash, path)
	}

	set (hash, path) {
		if (path !== false) {
			this.setPath(path)
		}

		if (hash !== false) {
			this.setHash(hash)
		}
	}

	setHash (hash) {
		if (this._hash && !this.equalHash(hash)) {
			this._path = null
		}

		this._hash = hash || 'HEAD'
	}

	setPath (path) {
		this._path = this.constructor._formatPath(path)
	}

	equalHash (hash) {
		return hash
			? this._hash === hash
			: this._hash === 'HEAD'
	}

	equalPath (path) {
		const formatedPath = this.constructor._formatPath(path)

		return this._path === formatedPath
	}

	equal (uid) {
		return uid && this.src === uid.src
	}

	copy (uid) {
		if (uid) {
			this.set(uid.hash, uid.path)
		}

		return this
	}

	static _formatPath (path) {
		if (typeof path !== 'string') {
			return null
		}

		return path.replace(/(^\.\/|\/$)/g, '')
	}


	get hash () {
		return this._hash
	}

	get path () {
		return this._path
	}

	get src () {
		const path = this._path
		const hash = this._hash

		return hash + (path ? `:${path}` : '')
	}

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
