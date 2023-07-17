exports.getCompte = (req, res, next)=>{
    const user = req.session.user
    let isAdmin = false;
    if(user){
        if(user.email === ('lazard_0@protonmail.com')){
            isAdmin = true;
        }else{
            isAdmin = false;
        }
    }
    res.render('account', {user, isAdmin})
}

exports.postCompte = (req, res, next)=>{
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('session detruite')
            res.redirect('/');
        }
    });
}