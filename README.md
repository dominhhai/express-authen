# express-authen
Auto redirect to login page middleware for Expressjs. The main features:

1. Auto redirect to login page when access the required-logged-in page
2. Save the referer into session before redirect to login page

[![npm version](https://badge.fury.io/js/express-authen.svg)](http://badge.fury.io/js/express-authen)

# Installation

```
$ npm install express-authen
```

If you want to save this module into the `package.json`, simply use:

```
$ npm install --save express-authen
```

# API
This middleware uses session to check wherether user logged-in or not, and save the referer before redirecting to login page. So, you should declare it after declaring the session middleware.

## Example for v2.x.x

```javascript
var authen = require('express-authen')
app.use(authen({
    'user': {
        'member':{
            'login':'/',
            'logout':'/customers/logout',
            'home':'/customers/dashboard'
        },
        'admin':{
            'login':'/admin/login',
            'logout':'/admin/logout',
            'home':'/admin/home'
        }
    },
    'default_page':'/',
    'auto_refer':true,
    'referer': 'referer',
    'excepts':['/api/list/members', '/api/add/members']
}))

```

## authen 2.x.x (options)
`options` is an object for config middleware. `options` includes:

No | Property | Default value | Description |
--- | --- | --- | --- |
1 | `user` | `{}` | Object with keys to user identity which represent the session name to validate |
2 | `default_page` | `/` | neutral page or homepage of the app that maybe not require any authentication |
3 | `excepts` | `[]` | an array - non-required auth page |
4 | `auto_refer` | `boolean` | (Optional) true or false to redirect or resume to refered page on login
5 | `referer` | `referer` | session' key for save the referer page |

## Example for v1.x.x

```javascript
var authen = require('express-authen')
app.use(authen({
    'login': '/',
    'home': '/home',
    'user': 'user',
    'referer': 'referer',
}))

```

## authen 1.x.x (options)
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
