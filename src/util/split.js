
/**
 * @param  {any} value
 * @param  {String|RegExp} separator
 * @param  {Number} limit
 * @return {String}
 */
module.exports = (value, separator, limit) => {
	let string = String(value)

	if (limit <= 1) {
		return string
	}

	const parts = []
	let i = 0

	while (i ++ < limit - 1 && string !== '') {
		const match = string.match(separator)
		const skip = match && match[0]

		if (!skip) {
			break
		}

		const part = string.slice(0, match.index)

		parts.push(part)
		string = string.slice(match.index + skip.length)
	}

	if (string !== '') {
		parts.push(string)
	}

	return parts
}
