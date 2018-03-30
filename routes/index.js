const express = require('express')
const App = require('../src/App.js')
const Uid = require('../src/Uid.js')

const router = express.Router()
const app = new App()

router.get('/blob/:hash/:path*', async (req, res) => {
	const uid = new Uid(req.params.hash, req.params.path + req.params['0'])

	const data = await app.getFileData(uid)

	res.render('blob', {
		title: 'Git',
		data,
		uid
	})
})

router.get('/:hash?/:path*?', async (req, res) => {
	const uid = new Uid(req.params.hash, req.params.path + req.params['0'])

	await app.change(uid)

	const {
		branches,
		commits,
		directory
	} = app

	const col = parseInt(req.query.col, 10) || 0

	res.render('index', {
		title: 'Git',
		branches,
		commits,
		directory,
		uid,
		col
	})
})

module.exports = router
