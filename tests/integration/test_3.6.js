const { assert } = require('chai')
const formatLabel = require('../helpers/formatLabel')

describe('3.6. Отображение ветки отличной от ветки по умолчанию', () => {
	it('3.6.1. Открыть страницу приложения', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})

	it(formatLabel([
		'3.6.2. Выбрать ветку отличную от ветки по умолчанию',
		'3.6.3. Проверить, что в списке всех веток теперь отображается выбранная'
	]), async function () {
		const text = await this.browser
			.url('/')
			.click('#branches tbody tr:first-child a')
			.getText('#branches .selected-row td:nth-child(2)')

		assert.equal(text, 'branch_a')
	})

	it('3.6.4. Проверить, что для ветки отображается список коммитов', async function () {
		const arr = await this.browser
			.url('/01e345e?col=1')
			.getText('#commits tbody td:nth-child(3)')

		assert.deepEqual(arr, [
			'01e345e54296aed0c59e7771119884bbc3410955',
			'72853a56404f21c7b7f74102186da9609aff658a'
		])
	})

	it('3.6.5. Проверить, что для ветки отображается корректный список файлов и папок', async function () {
		const arr = await this.browser
			.url('/01e345e?col=2')
			.getText('#directory .directory a')

		assert.deepEqual(arr, [
			'.gitignore',
			'dir_a',
			'dir_b',
			'lorem.txt'
		])
	})
})
