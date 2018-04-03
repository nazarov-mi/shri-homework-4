const {
	REPOSITORY_PATH
} = require('./config')

const List = require('./List')
const Branch = require('./Branch')
const split = require('./util/split')

/**
 * Класс — представление списка веток Git
 * @class
 * @extends List
 */
class BranchesList extends List {

	/**
	 * Создаёт экземпляр BranchesList
	 * @constructs
	 */
	constructor () {
		super()
	}

	/**
	 * @inheritdoc
	 */
	async fetch () {
		const res = await this._reader.start('git', ['branch', '-v'], {
			cwd: REPOSITORY_PATH
		})

		const data = this.constructor._parse(res)

		this._setData(data)
	}

	/**
	 * Парсит строки в объекты Branch
	 * @private
	 * @param  {String} data - строки
	 * @return {Array<Branch>}
	 */
	static _parse (data) {
		const rows = data.split(/\n/).filter(row => (!!row))

		return rows.map(line => this._parseLine(line))
	}

	/**
	 * Парсит строку в объект Branch
	 * @param  {String} line - строка
	 * @return {Branch}
	 */
	static _parseLine (line) {
		const item = split(line, /\s+/, 4)
		const isHead = item[0] === '*'
		const hash = isHead ? 'HEAD' : item[2]

		return new Branch(
			hash, // hash
			item[1], // name
			item[3] // subject
		)
	}
}

module.exports = BranchesList
