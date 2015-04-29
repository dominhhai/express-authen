function mergeOptions (defaultOpt, options) {
	options = options || {}

	for (var key in defaultOpt) {
		if (options.hasOwnProperty(key)) continue
		options[key] = defaultOpt[key]
	}

	return options
}

/**
 * Control direct page when require auth.
 * 1. Auto redirect to login page 
 *    when non-logged in user access the required-auth page
 * 2. Save the referer in to session
 *
 * @param {Object} middleware options
 *		@login: login page path
 *		@home: default redirected page after logged-in
 *		@excepts: non-required auth page
 *		@user: session' key for determine wherether user logged-in
 *		@referer: session' key for save the referer page
 * @return {Function} Expressjs Middleware
 */
exports = module.exports = function requireLogin (options) {
	// merge with default options
	options = mergeOptions({
		'login': '/login',
		'home': '/',
		'user': 'user',
		'referer': 'referer',
		'excepts': []
	}, options)
	// add login to except page
	options.excepts.push(options.login)

	return function(req, res, next) {
		var url = req.originalUrl
		  , user = req.session[options.user]
		// go to homepage where:
		// 1. logged-in, and
		// 2. on login page
		if (url === options.login && user)
	    	return res.redirect(options.home)
	    
	    // stay on page wherether:
	  	// 1. logged-in, or
	  	// 2. on login page, or
	  	// 3. on non-required login page
	  	if (user || options.excepts.indexOf(url) > -1)
	    	return next()

	  	// save referer into session
	  	req.session[options.referer] = url
	  	// redirect to login page if not login
	  	return res.redirect(options.login)
	}
}

