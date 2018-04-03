const {
	REPOSITORY_PATH
} = require('./config')

const List = require('./List')
const Commit = require('./Commit')
const split = require('./util/split')

/**
 * Класс — представление списка коммитов Git
 * @class
 * @extends List
 */
class CommitsList extends List {

	/**
	 * Создаёт экземпляр CommitsList
	 * @constructs
	 */
	constructor () {
		super()
	}

	/**
	 * @inheritdoc
	 */
	async fetch (uid) {
		const res = await this._reader.start('git', ['log', '--pretty=format:%H\t%p\t%an\t%aI\t%s', uid.hash], {
			cwd: REPOSITORY_PATH
		})

		const data = this.constructor._parse(res)

		this._setData(data)
	}

	/**
	 * Парсит строки в объекты Commit
	 * @private
	 * @param  {String} data - Строки
	 * @return {Array<Commit>}
	 */
	static _parse (data) {
		const rows = data.split(/\n/).filter(row => (!!row))

		return rows.map(line => this._parseLine(line))
	}

	/**
	 * Парсит строку в объект Commit
	 * @param  {String} line - строка
	 * @return {Commit}
	 */
	static _parseLine (line) {
		const item = split(line, /\t/, 5)
		const parents = item[1].split(' ')

		return new Commit(
			item[0], // hash
			item[2], // author
			item[3], // date
			item[4], // subject
			parents.length > 1 // is merged
		)
	}
}

module.exports = CommitsList
