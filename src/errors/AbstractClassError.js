
/**
 * Класс ошибки создания абстракного класса
 * @class
 */
class AbstractClassError extends Error {

	/**
	 * Создаёт экземпляр AbstractClassError
	 * @constructs
	 */
	constructor () {
		super('Попытка создания экземпляра абстрактного класса')
	}
}

module.exports = AbstractClassError
