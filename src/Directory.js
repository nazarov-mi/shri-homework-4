const {
	REPOSITORY_PATH
} = require('./config')

const List = require('./List')
const DirectoryObject = require('./DirectoryObject')

/**
 * Класс — представление директории Git
 * @class
 * @extends List
 */
class Directory extends List {

	/**
	 * Создаёт экземпляр Directory
	 * @constructs
	 */
	constructor () {
		super()

		this._treeIsh = null
		this._hash = null
		this._path = null
	}

	change (hash, path) {
		const treeIsh = `${hash}:${path}`

		if (treeIsh === this._treeIsh && this.hasData) {
			return Promise.resolve()
		}

		this._treeIsh = treeIsh
		this._hash = hash
		this._path = path

		return this.fetch(treeIsh)
	}

	/**
	 * @inheritdoc
	 */
	async fetch (treeIsh) {
		const res = await this._reader.start('git', ['ls-tree', '--full-name', treeIsh], {
			cwd: REPOSITORY_PATH
		})

		const data = this.constructor._parse(res)

		this._setData(data)
	}

	/**
	 * Парсит строки в объекты DirectoryObject
	 * @private
	 * @param  {String} data - Строки
	 * @return {Array<DirectoryObject>}
	 */
	static _parse (data) {
		const rows = data.split(/\n/).filter(row => (!!row))

		return rows.map((row) => {
			const obj = new DirectoryObject()

			obj.parse(row)

			return obj
		})
	}


	/**
	 * Хеш текущего списка
	 * @return {String}
	 */
	get hash () {
		return this._hash
	}

	/**
	 * Адрес текущей директории
	 * @return {String}
	 */
	get path () {
		return this._path
	}
}

module.exports = Directory
