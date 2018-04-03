const split = require('../../src/util/split')

describe('Функция split', () => {
	it('Разделить строку на с 5 вхождениями на 4 части', () => {
		const res = split('a b c d e', ' ', 4)

		expect(res).toEqual(['a', 'b', 'c', 'd e'])
	})

	it('Разделить сроку на с 5 вхождениями на 5 частей', () => {
		const res = split('a b c d e', ' ', 5)

		expect(res).toEqual(['a', 'b', 'c', 'd', 'e'])
	})

	it('Разделить сроку на с 5 вхождениями на 6 частей', () => {
		const res = split('a b c d e', ' ', 6)

		expect(res).toEqual(['a', 'b', 'c', 'd', 'e'])
	})

	it('Использование регулярных выражений', () => {
		const res = split('a.b..c...d....e', /\.+/, 4)

		expect(res).toEqual(['a', 'b', 'c', 'd....e'])
	})
})