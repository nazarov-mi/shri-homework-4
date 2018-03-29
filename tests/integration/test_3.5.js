const { assert } = require('chai')
const formatLabel = require('../helpers/formatLabel')

describe('3.5. Отображение содержимого файла для коммита из ветки по умолчанию', () => {
	it('3.5.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it(formatLabel([
		'3.5.2. Перейти в коммит из ветки',
		'3.5.3. Перейти в каталог, содержащий файлы',
		'3.5.4. Открыть файл',
		'3.5.5. Проверить, что содержимое файла отображается'
	]), async function () {
		const text = await this.browser
			.url('/72853a56404f21c7b7f74102186da9609aff658a?col=2')
			.click('#directory .directory li:nth-child(2) a')
			.click('#directory .directory li:first-child a')
			.getText('pre')

		assert.equal(text, 'Content A')
	})

	it(formatLabel([
		'3.5.6. Закрыть файл',
		'3.5.7. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/blob/72853a56404f21c7b7f74102186da9609aff658a/dir_a/file_a.txt?col=2')
			.click('a.back')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'file_a.txt',
			'file_b.txt'
		])
	})
})
