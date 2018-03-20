module.exports = {
	"extends": "airbnb",
	"rules": {
		"prefer-destructuring": "off",
		"no-underscore-dangle": "off",
		"comma-dangle": ["error", "never"],
		"semi": ["error", "never"],
		"indent": ["error", "tab"],
		"no-tabs": 0
	},
	"globals": {
		"window": true,
		"document": true,
		"navigator": true
	}
}