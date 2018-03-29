const { assert } = require('chai')
const formatLabel = require('../helpers/formatLabel')

describe('3.9. Работа с деревом файлов для коммита из ветки отличной от ветки по умолчанию', () => {
	it('3.9.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it(formatLabel([
		'3.9.2. Выбрать ветку отличную от ветки по умолчанию',
		'3.9.3. Перейти в коммит из ветки',
		'3.9.4. Проверить, что в корне дерева файлов коммита отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/dbb7efbfc6d171c4ddec29e7cc048968422c8b6c?col=2')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'.gitignore',
			'dir_a',
			'lorem.txt'
		])
	})

	it(formatLabel([
		'3.9.5. Перейти в один из каталогов',
		'3.9.6. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/dbb7efbfc6d171c4ddec29e7cc048968422c8b6c?col=2')
			.click('#directory .directory li:nth-child(2) a')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'file_a.txt',
			'file_b.txt',
			'file_c.txt'
		])
	})

	it(formatLabel([
		'3.9.7. Вернуться на каталог выше',
		'3.9.8. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/dbb7efbfc6d171c4ddec29e7cc048968422c8b6c/dir_a?col=2')
			.click('#directory a.directory-back')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'.gitignore',
			'dir_a',
			'lorem.txt'
		])
	})
})
