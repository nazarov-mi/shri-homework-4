const AbstractClassError = require('./errors/AbstractClassError')
const AbstractMethodError = require('./errors/AbstractMethodError')
const ExecStreamReader = require('./ExecStreamReader')
const Uid = require('./Uid')

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
		this._uid = new Uid()
		this._reader = new ExecStreamReader()
	}

	/**
	 * Устанавливает текущий идентификатор и запускает метод fetch
	 * @param  {Uid} uid - Уникальный идентификатор
	 * @return {Promise}
	 */
	change (uid) {
		if (this._uid.equal(uid) && this.hasData) {
			return Promise.resolve()
		}

		this._uid.copy(uid)

		return this.fetch(this._uid)
	}

	/* eslint-disable */
	/**
	 * Запускает выполнение команды и обрабатывает полученные данные
	 * @abstract
	 * @async
	 * @param  {Uid} uid - Уникальный идентификатор
	 * @return {Promise}
	 */
	async fetch (uid) {
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
	 * Идентификатор списка
	 * @return {Uid}
	 */
	get uid () {
		return this._uid
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
