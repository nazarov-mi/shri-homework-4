const { assert } = require('chai')
const formatLabel = require('../helpers/formatLabel')

describe('3.4. Работа с деревом файлов для коммита из ветки по умолчанию', () => {
	it('3.4.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it(formatLabel([
		'3.4.2. Перейти в коммит из ветки',
		'3.4.3. Проверить, что в корне дерева файлов коммита отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/72853a56404f21c7b7f74102186da9609aff658a?col=2')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'.gitignore',
			'dir_a',
			'lorem.txt'
		])
	})

	it(formatLabel([
		'3.4.4. Перейти в один из каталогов',
		'3.4.5. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/72853a56404f21c7b7f74102186da9609aff658a?col=2')
			.click('#directory .directory li:nth-child(2) a')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'file_a.txt',
			'file_b.txt'
		])
	})

	it(formatLabel([
		'3.4.6. Вернуться на каталог выше',
		'3.4.7. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/72853a56404f21c7b7f74102186da9609aff658a/dir_a?col=2')
			.click('#directory a.directory-back')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'.gitignore',
			'dir_a',
			'lorem.txt'
		])
	})
})
