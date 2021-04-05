const express = require('express')

const app = express()
const path = require('path')
const port = 3000
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({extended: false})

const {nextTick} = require('process')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname+'/src/templates'))

app.use('/assets', express.static('src/assets'))


app.get('/', (req, res) =>{
    req.query.text = req.query.text ?? ""
    res.render('index', req.query)
})

app.get('/traitement', (req, res) => {
    req.query.text = req.query.text ?? ""
    res.render('traitement', req.query)
})

app.post('/traitement', urlencodedParser, (req, res) =>{
    req.body.text = req.body.text ?? ""
    req.body.text = cesar(req.body.text, 5)
    res.render('traitement', req.body)
})

app.post('/', urlencodedParser, (req, res) =>{
    req.body.text = req.body.text ?? ""
    req.body.text = cesar(req.body.text, -5)
    res.render('index', req.body)
})

app.listen(port)


let cesar = (str, amount) => {
  
    if (amount < 0)
      return cesar(str, amount + 26);
    
    // variable pour stocker le résultat
    var res = '';
    // Parcourir chaque caractére
    for (var i = 0; i < str.length; i++) {
      // Récupérer le caractére que nous allons ajouter
      var c = str[i];
      // Vérifier si c'est une lettre
      if (c.match(/[a-z]/i)) {
        // Récupérer son code
        var code = str.charCodeAt(i);
        // Lettres majuscules
        if ((code >= 65) && (code <= 90))
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        // Lettres minuscules
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
      // Ajouter le caractére
      res += c;
    }
    // Résultat
    return res;
  };