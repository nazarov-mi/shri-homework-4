const {
	REPOSITORY_PATH
} = require('./config')

const List = require('./List')
const Branch = require('./Branch')

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
	 * @param  {String} data - Строки
	 * @return {Array<Branch>}
	 */
	static _parse (data) {
		const rows = data.split(/\n/).filter(row => (!!row))

		return rows.map((row) => {
			const branch = new Branch()

			branch.parse(row)

			return branch
		})
	}
}

module.exports = BranchesList
