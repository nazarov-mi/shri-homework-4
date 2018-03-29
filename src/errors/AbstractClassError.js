
/**
 * Класс ошибки создания абстракного класса
 * @class
 */
class AbstractClassError {

	/**
	 * Создаёт экземпляр AbstractClassError
	 * @constructs
	 */
	constructor () {
		throw new Error('Попытка создания экземпляра абстрактного класса')
	}
}

module.exports = AbstractClassError
