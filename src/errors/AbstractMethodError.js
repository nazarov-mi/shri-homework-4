
/**
 * Класс ошибки вызова абстрактного метода
 * @class
 */
class AbstractMethodError extends Error {

	/**
	 * Создаёт экземпляр AbstractMethodError
	 * @constructs
	 */
	constructor () {
		super('Метод не реализован')
	}
}

module.exports = AbstractMethodError
