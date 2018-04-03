const CommitsList = require('../../src/CommitsList')

const parsedList = [
	['18b73375cf5e8f216d2194ec9dd34664b93577b0', 'Nazarov MI', 'March 28th 2018', 'Branch Master commit'],
	['72853a56404f21c7b7f74102186da9609aff658a', 'Nazarov MI', 'March 28th 2018', 'init']
]

describe('Работа со списком коммитов Git', () => {
	it('Парсинг', () => {
		const data = CommitsList._parse([
			'18b73375cf5e8f216d2194ec9dd34664b93577b0\t72853a5\tNazarov MI\t2018-03-28T16:39:54+03:00\tBranch Master commit',
			'72853a56404f21c7b7f74102186da9609aff658a\t\tNazarov MI\t2018-03-28T16:26:37+03:00\tinit',
			'' // для проверки корректности работы
		].join('\n'))

		expect(data).toBeInstanceOf(Array)
		expect(data.length).toBe(2)

		const len = data.length

		for (let i = 0; i < len; ++ i) {
			const parsed = parsedList[i]
			const item = data[i]

			expect(item.hash).toBe(parsed[0])
			expect(item.author).toBe(parsed[1])
			expect(item.date).toBe(parsed[2])
			expect(item.subject).toBe(parsed[3])
			expect(item.isMerged).toBeFalsy()
		}
	})
})