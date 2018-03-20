const app = require('../src/App.js')
const express = require('express')

const router = express.Router()


/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', { title: 'Express' })
})

router.get('/directory/:hash?', async (req, res, next) => {
	const hash = req.params.hash
	const data = await app.changeDirectory(hash)

	res.render('directory', {
		title: 'Directory',
		hash,
		data
	})
})

router.get('/branches', async (req, res) => {
	const data = await app.changeBranch()

	res.render('branches', {
		title: 'Branches',
		data
	})
})

router.get('/commits', async (req, res) => {
	const data = await app.changeCommit()

	res.render('commits', {
		title: 'Commits',
		data
	})
})

module.exports = router
