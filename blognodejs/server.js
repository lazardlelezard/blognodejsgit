const express = require('express');
const swig = require('swig');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const User = require('./model/user')
const bcrypt = require('bcrypt')

require('dotenv').config()
const uri = process.env.URI
const app = express();

app.use(logger('dev')); // Ajouter le middleware morgan pour la journalisation

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', function(req, res) {
  const data = { title: 'le petit soldat' };
  res.render('index', data);
});



app.get('/connexion', (req, res) => {
  res.render('connexion')
});

app.get('/inscription', (req, res) => {
  res.render('inscription')
  
});


app.post('/inscription', (req, res , next) =>{
  const {username , password , email} = req.body
  const user = new User({
    username : username,
    password : password,
    email : email,

  })
  user.save()
  .then((user)=>{
    console.log('inscription ok !')
    res.redirect('/connexion')

})
.catch((err)=> {
    console.log(`une erreur est survenue : ${err}`)
    res.send('Erreur :/' + err + '<a href="/inscription">Revenir au menu d\'inscription</a>'
    )
})
}) 

app.post('/views/categorie', (req, res) => {
  // Logique de traitement de la soumission du formulaire
  // Redirection vers la page "categorie.ejs"
  res.render('categorie');
});


////connexion server////
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
     
  app.listen(3000, function() {
    console.log('App running on http://localhost:3000');
  });
  
}).catch((err)=>{
      console.log('erreur lors de la connxion à la bdd ' + err)
})