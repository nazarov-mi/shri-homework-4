const app = require('../src/App.js')
const express = require('express')

const router = express.Router()
const defaultHash = 'HEAD'

router.get('/:branch?/:commit?/:tree?', async (req, res) => {
	const branchHash = req.params.branch || defaultHash
	const commitHash = req.params.commit || branchHash
	const treeHash = req.params.tree || commitHash

	const branches = await app.changeBranch()
	const commits = await app.changeCommit(req.params.branch || defaultHash)
	const directory = await app.changeDirectory([req.params.tree, req.params.commit, req.params.branch].find(it => (it && it.toLowerCase() !== 'head')) || defaultHash)

	res.render('index', {
		title: 'Git',
		branches,
		commits,
		directory,
		branchHash,
		commitHash,
		treeHash
	})
})

module.exports = router
