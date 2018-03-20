const { exec } = require('child_process')
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const express = require('express')

const router = express.Router()

function getDirData (path) {
	path = join('./', path)

	return readdirSync(path).map(name => {
		const source = join(path, name)
		const isDirectory = lstatSync(source).isDirectory()

		return {
			source,
			isDirectory
		}
	})
}

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', { title: 'Express' })
})

router.get('/directory/:path*?', (req, res) => {
	const path = req.params.path ? join(req.params.path, req.params['0']) : '/'
	const data = getDirData(path)

	res.render('directory', {
		title: 'Directory',
		path,
		data
	})
})

router.get('/branches', (req, res) => {
	exec('ls -1 -d */ .*/', (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`)
			return
		}

		console.log(`stdout: ${stdout}`)
		console.log(`stderr: ${stderr}`)


	})

	res.render('branches', {
		title: 'Branches',
		branches: []
	})
})

module.exports = router
