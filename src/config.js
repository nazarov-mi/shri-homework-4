const { join } = require('path')

const IS_PROD = process.env.NODE_ENV !== 'development'
const DEFAULT_HASH = 'HEAD'
const ROOT_PATH = join(__dirname, '../')
const REPOSITORY_PATH = join(ROOT_PATH, IS_PROD ? 'local-repository' : 'local-test-repository')

module.exports = {
	IS_PROD,
	DEFAULT_HASH,
	ROOT_PATH,
	REPOSITORY_PATH
}
