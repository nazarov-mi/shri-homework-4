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

collapses.forEach((el, index) => {
	const trigger = el.querySelector('.col__header')

	if (trigger) {
		trigger.addEventListener('click', () => onCollapseTrigger(index))
	}
})

function onCollapseTrigger (index) {
	const el = collapses[index]

	collapses.forEach(el => {
		el.classList.remove('col--open')
	})

	if (el) {
		el.classList.add('col--open')
		currentIndex = index
	}
}

// onCollapseTrigger(currentIndex)

window.addEventListener('click', e => {
	const el = e.target

	if (el.tagName !== 'A') {
		return
	}

	e.preventDefault()

	const href = el.getAttribute('href')

	window.location.assign(`${href}?col=${currentIndex}`)

	return false
})
