const App = require('../src/App.js')
const express = require('express')

const router = express.Router()
const app = new App()

router.get('/blob/:hash/:path*', async (req, res) => {
	const currentHash = req.params.hash
	const currentPath = req.params.path + req.params['0']

	const data = await app.getFileData(currentHash, currentPath)
	const prevPath = app.getPrevPath(currentPath)

	res.render('blob', {
		title: 'Git',
		data,
		hash: currentHash,
		path: currentPath,
		prevPath
	})
})

router.get('/:hash?/:path*?', async (req, res) => {
	const currentHash = req.params.hash
	const currentPath = req.params.path + req.params['0']

	await app.change(currentHash, currentPath)

	const {
		branches,
		commits,
		directory,
		hash,
		path
	} = app

	const prevPath = app.getPrevPath(app.path)
	const col = parseInt(req.query.col, 10) || 0

	res.render('index', {
		title: 'Git',
		branches,
		commits,
		directory,
		hash,
		path,
		prevPath,
		col
	})
})

module.exports = router
