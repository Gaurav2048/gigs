const express  = require('express');
const exp_hbs = require('express-handlebars');
const body_parser = require('body-parser');
const path = require('path');
const db = require('./config/database'); 


db.authenticate().then(()=>{
    console.log('database connected');
    
}).catch(err=>{
    console.log('error occured ', err);
     
})

const app = express();

// handlebars 
app.engine('handlebars', exp_hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 

// body parser 
app.use(body_parser.urlencoded({
    extended: false
}))

// static module 
app.use(express.static(path.join(__dirname, 'public'))); 


app.get('/',(req, res)=>{
     res.render('index', {layout:'landing'})
})


app.use('/gigs', require('./routes/routes'));


const port = process.env.port ||5000; 

app.listen(port, console.log('Process started'));