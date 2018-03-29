const { assert } = require('chai')
const formatLabel = require('../helpers/formatLabel')

describe('3.10. Отображение содержимого файла для коммита из ветки отличной от ветки по умолчанию', () => {
	it('3.10.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it(formatLabel([
		'3.10.2. Выбрать ветку отличную от ветки по умолчанию',
		'3.10.3. Перейти в коммит из ветки',
		'3.10.4. Перейти в каталог, содержащий файлы',
		'3.10.5. Открыть файл',
		'3.10.6. Проверить, что содержимое файла отображается'
	]), async function () {
		const text = await this.browser
			.url('/dbb7efbfc6d171c4ddec29e7cc048968422c8b6c?col=2')
			.click('#directory .directory li:nth-child(2) a')
			.click('#directory .directory li:last-child a')
			.getText('pre')

		assert.equal(text, 'Content C')
	})

	it(formatLabel([
		'3.10.7. Закрыть файл',
		'3.10.8. Проверить, что отображается корректный список файлов и папок'
	]), async function () {
		const arr = await this.browser
			.url('/blob/dbb7efbfc6d171c4ddec29e7cc048968422c8b6c/dir_a/file_c.txt?col=2')
			.click('a.back')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'file_a.txt',
			'file_b.txt',
			'file_c.txt'
		])
	})
})
