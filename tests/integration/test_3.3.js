const { assert } = require('chai')
const formatLabel = require('../helpers/formatLabel')

describe('3.3. Отображение содержимого файла в ветке по умолчанию', () => {
	it('3.3.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it(formatLabel([
		'3.3.2. Перейти в каталог, содержащий файлы',
		'3.3.3. Открыть файл',
		'3.3.4. Проверить, что содержимое файла отображается'
	]), async function () {
		const text = await this.browser
			.url('/?col=2')
			.click('#directory .directory li:nth-child(2) a')
			.click('#directory .directory li:first-child a')
			.getText('pre')

		assert.equal(text, 'Content A')
	})

	it(formatLabel([
		'3.3.5. Закрыть файл',
		'3.3.6. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/blob/HEAD/dir_a/file_a.txt?col=2')
			.click('a.back')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'file_a.txt',
			'file_b.txt'
		])
	})
})
