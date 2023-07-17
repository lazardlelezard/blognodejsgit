const User = require('../../models/user')
const bcrypt = require('bcrypt')

exports.getConnexion = (req, res, next)=>{

  res.render('connexion')
}
exports.postConnexion = (req, res, next)=>{
    const {username, mdp} = req.body;

    console.log('username : ' + username)
 
    User.find()
    .then((user) => {
        const foundUser = user.some(u => u.user === user && bcrypt.compareSync(mdp, u.mdp));
        if (foundUser) {
          const currentUser = user.find(u => u.username === email);
          console.log(`Connexion REUSSIE ! bienvenue ${currentUser.username}`);
          req.session.user = currentUser;
          console.log('ma user session : ' + req.session.user);
          res.redirect('/views/categorie');
        } else {
          res.render('401')
          console.log('erreur lors de votre connexion, mot de passe ou email invalide')
        }
      })
        .catch((err) =>{
            console.log(err)
        })
}