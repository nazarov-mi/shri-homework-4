const BranchesList = require('../../src/BranchesList')

const parsedList = [
	['01e345e', 'branch_a', 'Branch A commit'],
	['dbb7efb', 'branch_b', 'Branch B commit'],
	['HEAD', 'master', 'Branch Master commit']
]

describe('Работа со списком веток Git', () => {
	it('Парсинг', () => {
		const data = BranchesList._parse([
			'  branch_a 01e345e Branch A commit',
			'  branch_b dbb7efb Branch B commit',
			'* master   18b7337 Branch Master commit',
			'' // для проверки корректности работы
		].join('\n'))

		expect(data).toBeInstanceOf(Array)
		expect(data.length).toBe(3)

		const len = data.length

		for (let i = 0; i < len; ++ i) {
			const parsed = parsedList[i]
			const item = data[i]

			expect(item.hash).toBe(parsed[0])
			expect(item.name).toBe(parsed[1])
			expect(item.subject).toBe(parsed[2])
		}
	})
})