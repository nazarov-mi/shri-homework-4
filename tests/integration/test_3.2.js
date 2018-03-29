const { assert } = require('chai')
const formatLabel = require('../helpers/formatLabel')

describe('3.2. Работа с деревом файлов в ветке по умолчанию', () => {
	it('3.2.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it(formatLabel([
		'3.2.2. Перейти в один из каталогов',
		'3.2.3. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/?col=2')
			.click('#directory .directory li:nth-child(2) a')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'file_a.txt',
			'file_b.txt'
		])
	})

	it(formatLabel([
		'3.2.4. Вернуться на каталог выше',
		'3.2.5. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/HEAD/dir_a?col=2')
			.click('#directory a.directory-back')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'.gitignore',
			'dir_a',
			'lorem.txt',
			'lorem_ru.txt'
		])
	})
})
