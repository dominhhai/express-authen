# express-authen
Auto redirect to login page middleware for Expressjs. The main features:
1. Auto redirect to login page when access the required-logged-in page
2. Save the referer into session before redirect to login page

# Installation

# API

## Example

```javascript
var auth = require('express-auth')
app.use(auth({
    'login': '/',
    'home': '/home',
    'userSession': 'user',
    'referer': 'referer',
}))

```

## auth(options)
`options` is an object for config middleware. `options` include:

    1. login: login page path
    2. home: default redirected page after logged-in
    3. excepts: non-required auth page
    4. user: session' key for determine wherether user logged-in
    5. referer: session' key for save the referer page

# License
[MIT](https://github.com/dominhhai/express-auth/blob/master/LICENSE)
