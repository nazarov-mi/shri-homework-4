const { assert } = require('chai')
const formatLabel = require('../helpers/formatLabel')

describe('3.7. Работа с деревом файлов в ветке отличной от ветки по умолчанию', () => {
	it('3.7.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it(formatLabel([
		'3.7.2. Выбрать ветку отличную от ветки по умолчанию',
		'3.7.3. Перейти в один из каталогов',
		'3.7.4. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/01e345e?col=2')
			.click('#directory .directory li:nth-child(3) a')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'123.txt',
			'bla-bla.txt'
		])
	})

	it(formatLabel([
		'3.7.5. Вернуться на каталог выше',
		'3.7.6. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/01e345e/dir_b?col=2')
			.click('#directory a.directory-back')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'.gitignore',
			'dir_a',
			'dir_b',
			'lorem.txt'
		])
	})
})
