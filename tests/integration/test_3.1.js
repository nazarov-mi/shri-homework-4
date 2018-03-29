const { assert } = require('chai')

describe('3.1. Отображение ветки по умолчанию', () => {
	it('3.1.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it('3.1.2. Проверить, что из списка всех веток отображается ветка по умолчанию', async function () {
		const text = await this.browser
			.url('/')
			.getText('#branches .selected-row td:nth-child(2)')

		assert.equal(text, 'master')
	})

	it('3.1.3. Проверить, что для ветки отображается список коммитов', async function () {
		const arr = await this.browser
			.url('/?col=1')
			.getText('#commits tbody td:nth-child(3)')

		assert.deepEqual(arr, [
			'18b73375cf5e8f216d2194ec9dd34664b93577b0',
			'72853a56404f21c7b7f74102186da9609aff658a'
		])
	})

	it('3.1.4. Проверить, что для ветки отображается корректный список файлов и папок', async function () {
		const arr = await this.browser
			.url('/?col=2')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'.gitignore',
			'dir_a',
			'lorem.txt',
			'lorem_ru.txt'
		])
	})
})
