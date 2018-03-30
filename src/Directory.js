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
	}

	/**
	 * @inheritdoc
	 */
	async fetch (uid) {
		const res = await this._reader.start('git', ['ls-tree', '--full-name', uid.src], {
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
}

module.exports = Directory
