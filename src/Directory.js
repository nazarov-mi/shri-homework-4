const {
	REPOSITORY_PATH
} = require('./config')

const List = require('./List')
const DirectoryObject = require('./DirectoryObject')
const split = require('./util/split')

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
	 * @return {Array.<DirectoryObject>}
	 */
	static _parse (data) {
		const rows = data.split(/\n/).filter(row => (!!row))

		return rows.map(line => this._parseLine(line))
	}

	/**
	 * Парсит строку в объект DirectoryObject
	 * @param  {String} line - строка
	 * @return {DirectoryObject}
	 */
	static _parseLine (line) {
		const item = split(line, /\s+/, 4)

		return new DirectoryObject(
			item[2], // hash
			item[3], // name
			item[1] // type
		)
	}
}

module.exports = Directory
