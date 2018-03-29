const AbstractClassError = require('./errors/AbstractClassError')
const AbstractMethodError = require('./errors/AbstractMethodError')
const ExecStreamReader = require('./ExecStreamReader')

/**
 * Абстрактный класс для работы со списками git
 * @abstract
 * @class
 */
class List {

	/**
	 * Создаёт экземпляр List
	 * @constructs
	 */
	constructor () {
		if (this.constructor === List) {
			throw new AbstractClassError()
		}

		this._data = null
		this._reader = new ExecStreamReader()
	}

	// /**
	//  * Устанавливает текущий хеш для списка и запускает метод fetch
	//  * @param  {String} hash - Git хеш
	//  * @return {Promise}
	//  */
	// change (addr) {
	// 	if (this._addr === addr && this.hasData) {
	// 		return Promise.resolve()
	// 	}

	// 	this._hash = hash || DEFAULT_HASH

	// 	return this.fetch(this._hash)
	// }

	/* eslint-disable */
	/**
	 * Запускает выполнение команды и обрабатывает полученные данные
	 * @abstract
	 * @async
	 * @return {Promise}
	 */
	async fetch () {
		throw new AbstractMethodError()
	}
	/* eslint-enable */

	/**
	 * Устанавливает данные списка
	 * @private
	 * @param {Array} data - Массив с данными
	 */
	_setData (data) {
		this._data = Array.isArray(data) ? data : null
	}


	/**
	 * Данные списка
	 * @return {Array}
	 */
	get data () {
		return this._data
	}

	/**
	 * Является true, если список не пуст
	 * @return {Boolean}
	 */
	get hasData () {
		return (this._data && this._data.length > 0)
	}
}

module.exports = List
