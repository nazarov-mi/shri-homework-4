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

		this._hash = null
	}

	change (hash) {
		if (this._hash === hash && this.hasData) {
			return Promise.resolve()
		}

		this._hash = hash

		return this.fetch(hash)
	}

	/**
	 * @inheritdoc
	 */
	async fetch (hash) {
		const res = await this._reader.start('git', ['log', '--pretty=format:%H\t%p\t%an\t%aI\t%s', hash], {
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


	/**
	 * Хеш текущего списка
	 * @return {String}
	 */
	get hash () {
		return this._hash
	}
}

module.exports = CommitsList
