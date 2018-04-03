const Uid = require('../../src/Uid')

describe('Работы с идентификаторами Git', () => {
	it('#1', () => {
		const uid = new Uid()

		expect(uid.src).toBe('HEAD')
	})

	it('#2', () => {
		const uid = new Uid('master', '')

		expect(uid.src).toBe('master')
	})

	it('#3', () => {
		const uid = new Uid('', './a/b/')

		expect(uid.src).toBe('HEAD:a/b')
	})

	it('#4', () => {
		const uid = new Uid('asd', './a/b/')

		expect(uid.src).toBe('asd:a/b')
		expect(uid.prevPath).toBe('a')
	})

	it('#5', () => {
		const uid = new Uid('asd', './a/')

		expect(uid.src).toBe('asd:a')
		expect(uid.prevPath).toBe('./')
	})
})