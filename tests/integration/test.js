const { assert } = require('chai')

describe('Тестовый интеграционный тест :)', () => {
	it('Заголовок страницы соответствует ожидаемому', async function () {
		const title = await this.browser
			.url('/')
			.getTitle()

		assert.equal(title, 'Git')
	})
})
