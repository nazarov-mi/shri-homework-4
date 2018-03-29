
/**
 * Класс ошибки вызова абстрактного метода
 * @class
 */
class AbstractMethodError {

	/**
	 * Создаёт экземпляр AbstractMethodError
	 * @constructs
	 */
	constructor () {
		throw new Error('Метод не реализован')
	}
}

module.exports = AbstractMethodError
