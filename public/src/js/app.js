import '../sass/app.sass'

function getQuery () {
	const query = window.location.search.replace('?', '')
	const parts = query.split('&')

	return parts.reduce((acc, part) => {
		const item = part.split('=')
		const name = item[0]
		const value = item[1]

		acc[name] = value

		return acc
	}, {})
}

function getIndex () {
	const query = getQuery()

	return query.col || 0
}

let currentIndex = getIndex()
const collapses = Array.from(document.querySelectorAll('.col'))

function onCollapseTrigger (index) {
	const col = collapses[index]

	collapses.forEach((el) => {
		el.classList.remove('col--open')
	})

	if (col) {
		col.classList.add('col--open')
		currentIndex = index
	}
}

collapses.forEach((el, index) => {
	const trigger = el.querySelector('.col__header')

	if (trigger) {
		trigger.addEventListener('click', () => onCollapseTrigger(index))
	}
})

window.addEventListener('click', (e) => {
	const el = e.target

	if (el.tagName !== 'A') {
		return e
	}

	e.preventDefault()

	const href = el.getAttribute('href')

	window.location.assign(`${href}?col=${currentIndex}`)

	return false
})
