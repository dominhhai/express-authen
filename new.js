let default_options = {
    'user': {},
    'auto_refer': true,
    'referer': 'referer',
    'auth_method':'manual', //yes, manual for now. will support firebase, passport later.#TODO
    'excepts': [],
    'default_page':''
};
let current_url = '';

let error_handler = (msg)=>{
    let err = new Error(msg);
    return err;
};

let save_refer = (req)=>{
    req.session[default_options.referer] = current_url;
}

let redirect_refer = (req, res, next)=>{
    let current_refer = req.session.referer;
    req.session.referer = null; //null every refer on redirected to
    //before saving refer link. confirm its not among defined urls in the options
    //if yes. clear(set to null) the refer session 
    if(default_options.excepts.indexOf(current_url) > -1 || current_url === default_options.default_page){
        return next();
    }
    else{
        return res.redirect(current_refer);
    }
    
}

// let url_match_excepts = ()=>{
//     for(let index in default_options.excepts){
//         if(current_url.startsWith(default_options.excepts[index])){
//             return true;
//         }
//     }
//     return false;
// };

let handle_manual_user = (req, res, next)=>{
    for(let key in default_options.user){
        let url_config = default_options.user[key];
        if(!url_config.hasOwnProperty('login')) return next(error_handler('*'+key+'* has *login* property missing.'));
        if(!url_config.hasOwnProperty('home')) return next(error_handler('*'+key+'* has *home* property missing.')); 
        default_options.excepts.push(url_config.login);
        if(req.session[key] && current_url === url_config.login){
            save_refer(req);
            if(default_options.auto_refer && req.session.referer){
                return redirect_refer(req, res, next);
            }
            return res.redirect(url_config.home);
        }
        if(current_url === url_config.logout){
            //once user is on logout page or has logged out.
            //null all related sessions
            req.session[key] = null;
            req.session[default_options.referer] = null;
        }
        if(req.session[key] || default_options.excepts.indexOf(current_url) > -1){
            save_refer(req);
            return next();
        } 
        //gets here? check the next user object defination
    }
    //if program gets here. means no user is logged in at all, so... open the default page for all users
    return res.redirect(default_options.default_page);
};

module.exports = (options)=>{
    Object.keys(options).forEach((key, index)=>{
        if(default_options.hasOwnProperty(key)){
            default_options[key] = options[key];
        }
    });
    
    return (req, res, next)=>{
        current_url = req.path;
        if(Object.keys(default_options.user).length === 0){
            return next(error_handler('No/Bad *user* Authen handler defined'));
        }
        return handle_manual_user(req, res, next);
    }
};