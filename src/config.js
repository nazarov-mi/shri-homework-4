const { join } = require('path')

const IS_PROD = false // process.env.NODE_ENV === 'production'
const DEFAULT_HASH = 'HEAD'
const ROOT_PATH = join(__dirname, '../')
const REPOSITORY_PATH = join(ROOT_PATH, IS_PROD ? 'local-repository' : 'local-test-repository')
console.log(process.env.NODE_ENV)
module.exports = {
	IS_PROD,
	DEFAULT_HASH,
	ROOT_PATH,
	REPOSITORY_PATH
}
