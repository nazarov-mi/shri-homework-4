const Directory = require('../../src/Directory')

const parsedList = [
	['513b38d02ed05d7fb615b62cb2845812e521a4c7', '.dockerignore', 'blob'],
	['6f4575a4b10676970d3f4399e097e1bcff0c1626', '.eslintignore', 'blob'],
	['909c432aab76f474ea997978027916173644655e', '.eslintrc.json', 'blob'],
	['2b8d85c7490c3af909ec79ca63d24798571f2fb1', '.gitignore', 'blob'],
	['8e8e6389a87e6be776e7386de16a04bc436d9569', '.hermione.conf.js', 'blob'],
	['dc04d8352b41179fcf55a5c3d3a2ffd6f7907cc9', '.stylelintignore', 'blob'],
	['59e807115562171c756d5b96cc7f5b705cf293e5', '.stylelintrc.json', 'blob'],
	['2fa171438832b23a288d271f0e0f96ad024c9c24', '.travis.yml', 'blob'],
	['b3af6c5b52d5d9a3cab6777a5b6050bf6bc1b997', 'Dockerfile', 'blob'],
	['bb824affb03171bfce5a1a454d5bc738bec0090e', 'README.md', 'blob'],
	['3e80db6f2c4f795d4e10114d2e5111ceaa12b22a', 'app.js', 'blob'],
	['3f5160292db4bde2ca969c8a661075aad9d47cd8', 'bin', 'tree'],
	['a1dd21446b699aa29899cec56b897a9d2706fe84', 'commands', 'blob'],
	['2b8f79bb66e9ce1ae577bd9fd4375ad5604dee9b', 'heroku.yml', 'blob'],
	['1f3bf9382e79a4181ea2da46e5b9bcc7c4aee78a', 'package.json', 'blob'],
	['632046c3a72f30fa159fb4b7740547af146cbf33', 'public', 'tree'],
	['4d07dbfb08d25135e6e99d2ec005a80163fc6d35', 'routes', 'tree'],
	['1d27792f194fdcc82ba82a264e21224569ff339d', 'src', 'tree'],
	['ab5b5953ab29dc3498403483642f73c43cf31987', 'tests', 'tree'],
	['8f4bb63194dbb6694ecc00dac63de1714f6d64ed', 'views', 'tree'],
	['e9d5d6bece9ccec2763a029f1dda657c3f7ba99b', 'webpack.config.js', 'blob']
]

describe('Работа с деревом объектов Git', () => {
	it('Парсинг', () => {
		const data = Directory._parse([
			'100644 blob 513b38d02ed05d7fb615b62cb2845812e521a4c7	.dockerignore',
			'100644 blob 6f4575a4b10676970d3f4399e097e1bcff0c1626	.eslintignore',
			'100644 blob 909c432aab76f474ea997978027916173644655e	.eslintrc.json',
			'100644 blob 2b8d85c7490c3af909ec79ca63d24798571f2fb1	.gitignore',
			'100644 blob 8e8e6389a87e6be776e7386de16a04bc436d9569	.hermione.conf.js',
			'100644 blob dc04d8352b41179fcf55a5c3d3a2ffd6f7907cc9	.stylelintignore',
			'100644 blob 59e807115562171c756d5b96cc7f5b705cf293e5	.stylelintrc.json',
			'100644 blob 2fa171438832b23a288d271f0e0f96ad024c9c24	.travis.yml',
			'100644 blob b3af6c5b52d5d9a3cab6777a5b6050bf6bc1b997	Dockerfile',
			'100644 blob bb824affb03171bfce5a1a454d5bc738bec0090e	README.md',
			'100644 blob 3e80db6f2c4f795d4e10114d2e5111ceaa12b22a	app.js',
			'040000 tree 3f5160292db4bde2ca969c8a661075aad9d47cd8	bin',
			'100644 blob a1dd21446b699aa29899cec56b897a9d2706fe84	commands',
			'100644 blob 2b8f79bb66e9ce1ae577bd9fd4375ad5604dee9b	heroku.yml',
			'100644 blob 1f3bf9382e79a4181ea2da46e5b9bcc7c4aee78a	package.json',
			'040000 tree 632046c3a72f30fa159fb4b7740547af146cbf33	public',
			'040000 tree 4d07dbfb08d25135e6e99d2ec005a80163fc6d35	routes',
			'040000 tree 1d27792f194fdcc82ba82a264e21224569ff339d	src',
			'040000 tree ab5b5953ab29dc3498403483642f73c43cf31987	tests',
			'040000 tree 8f4bb63194dbb6694ecc00dac63de1714f6d64ed	views',
			'100644 blob e9d5d6bece9ccec2763a029f1dda657c3f7ba99b	webpack.config.js',
			'' // для проверки корректности работы
		].join('\n'))

		expect(data).toBeInstanceOf(Array)
		expect(data.length).toBe(21)

		const len = data.length

		for (let i = 0; i < len; ++ i) {
			const parsed = parsedList[i]
			const item = data[i]

			expect(item.hash).toBe(parsed[0])
			expect(item.name).toBe(parsed[1])
			expect(item.type).toBe(parsed[2])
		}
	})
})