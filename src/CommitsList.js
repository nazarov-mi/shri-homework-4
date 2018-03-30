const {
	REPOSITORY_PATH
} = require('./config')

const List = require('./List')
const Commit = require('./Commit')

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

		return rows.map((row) => {
			const commit = new Commit()

			commit.parse(row)

			return commit
		})
	}
}

module.exports = CommitsList
