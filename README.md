# express-authen
Auto redirect to login page middleware for Expressjs. The main features:

1. Auto redirect to login page when access the required-logged-in page
2. Save the referer into session before redirect to login page

# Installation

```
$ npm install express-authen
```

If you want to save this module into `package.json`, simply use:

```
$ npm install --save express-authen
```

# API
This middleware uses session to check wherether user logged-in or not, and save the referer before redirecting to login page. So, you should declare it after declaring session middleware.

## Example

```javascript
var authen = require('express-authen')
app.use(authen({
    'login': '/',
    'home': '/home',
    'userSession': 'user',
    'referer': 'referer',
}))

```

## authen(options)
`options` is an object for config middleware. `options` includes:

No | Property | Default value | Description |
--- | --- | --- | --- |
1 | `login` | `/login` | login page path |
2 |  `home` | `/` | default redirected page after logged-in |
3 | `excepts` | `[]` | an array - non-required auth page |
4 | `user` | `user` | session' key for determine wherether user logged-in |
5 | `referer` | `referer` | session' key for save the referer page |

# License
[MIT](https://github.com/dominhhai/express-authen/blob/master/LICENSE)
