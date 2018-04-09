
module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	extends: 'standard',
	'rules': {
		// "indent": ["off", 1],
		"indent": [2, "tab"],
		"no-tabs": 0,
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
	}
}