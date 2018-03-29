const { spawn } = require('child_process')

/**
 * Класс для выполнения команд и записи полученных данных
 * @class
 */
class ExecStreamReader {

	/**
	 * Создаёт экземпляр ExecStreamReader
	 * @constructs
	 */
	constructor () {
		this._ls = null
		this._stdout = ''
		this._stderr = ''
		this._inProcessing = false

		this._resolve = null
		this._reject = null
	}

	/**
	 * Запускает команду
	 * @param  {String} command - Команда для выполнения
	 * @param  {Array} args - Аргументы команды
	 * @param  {Object} options - Опции для выполнения
	 * @return {Promise<String>}
	 */
	start (command, args, options) {
		if (this._inProcessing) {
			return
		}

		const promise = this._createPromise()
		const ls = spawn(command, args, options)

		ls.stdout.on('data', data => this._onStdOutData(data))
		ls.stderr.on('data', data => this._onStdErrData(data))
		ls.on('close', code => this._onClose(code))
		ls.on('error', error => this._onError(error))

		this._inProcessing = true
		this._ls = ls

		return promise
	}

	/**
	 * Очищает экземпляр
	 */
	clear () {
		if (this._inProcessing) {
			return
		}

		this._ls = null
		this._stdout = ''
		this._stderr = ''
	}

	/**
	 * Закрывает текущий стрим
	 */
	close () {
		this._inProcessing = false

		if (this._ls) {
			this._ls.kill()
		}

		this.clear()
	}

	_createPromise () {
		return new Promise((resolve, reject) => {
			this._resolve = resolve
			this._reject = reject
		})
	}

	/**
	 * Функция-слушатель для обработки события получения данных
	 * @private
	 * @param  {Uint8Array} data - Данные
	 */
	_onStdOutData (data) {
		this._stdout += String(data)
	}

	/**
	 * Функция-слушатель для обработки события получния ошибки во время выполнения
	 * @private
	 * @param  {Uint8Array} data - Ошибки
	 */
	_onStdErrData (data) {
		this._stderr += String(data)
	}

	/**
	 * Функция-слушатель для обработки события окончания выполнения команды
	 * @private
	 * @param  {Number} code - Код выхода
	 */
	_onClose (code) {
		if (code === 0) {
			this._resolve(this._stdout)
		} else {
			this._reject(this._stderr)
		}

		this.close()
	}

	/**
	 * Функция-слушатель для обработки события получения ошибки
	 * @private
	 * @param  {String} error - Текст ошибки
	 */
	_onError (error) {
		this._reject(error)
		this.close()
	}


	/**
	 * Является true, если идёт выполнение команды
	 * @return {Boolean}
	 */
	get inProcessing () {
		return this._inProcessing
	}
}

module.exports = ExecStreamReader
