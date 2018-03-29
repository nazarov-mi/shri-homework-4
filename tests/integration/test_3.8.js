const { assert } = require('chai')
const formatLabel = require('../helpers/formatLabel')

describe('3.8. Отображение содержимого файла в ветке отличной от ветки по умолчанию', () => {
	it('3.8.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it(formatLabel([
		'3.8.2. Выбрать ветку отличную от ветки по умолчанию',
		'3.8.3. Перейти в каталог, содержащий файлы',
		'3.8.4. Открыть файл',
		'3.8.5. Проверить, что содержимое файла отображается'
	]), async function () {
		const text = await this.browser
			.url('/01e345e?col=2')
			.click('#directory .directory li:nth-child(3) a')
			.click('#directory .directory li:first-child a')
			.getText('pre')

		assert.equal(text, '1234567890')
	})

	it(formatLabel([
		'3.8.6. Закрыть файл',
		'3.8.7. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/blob/01e345e/dir_b/123.txt?col=2')
			.click('a.back')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'123.txt',
			'bla-bla.txt'
		])
	})
})
