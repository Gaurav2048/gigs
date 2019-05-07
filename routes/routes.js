const express = require('express');
const router = express.Router(); 
const gig  = require('../model/Gig');
const Sequelize = require('sequelize'); 
const Op = Sequelize.Op; 

// get gig list 
router.get('/', (req, res)=>{
    gig.findAll().then((gigs)=>{
        res.render('gigs', {
            gigs
        })        
    }).catch(err=>{
        console.log(err);
        
    })
});

// display add gigs form 

router.get('/add', (req, res)=>{
    res.render('add')
})

// add gig list 
router.post('/add', (req, res)=>{
    let {title, technologies, budget, description, contact_email} = req.body;
    error =[];
    // validate field
    if(!title){
        error.push({text: "please add a title"})
    }
    
    if(!technologies){
        error.push({text: "please add a technology"})
    }

    if(!description){
        error.push({text: "please add a description"})
    }


    if(!contact_email){
        error.push({text: "please add a email"})
    }

    //chec for error 

    if(error.length > 0 )
    {
        res.render('add', {
            error, title, technologies, budget, description, contact_email
        })
    }else {
        if(!budget){
            budget = "UNKNOWN"; 
        }else {
            budget = `$${budget}`; 
        }

         
    // insert into table 
    gig.create({
        title, 
        technologies, 
        description, 
        budget, 
        contact_email
    }).then((gig)=>{
        res.redirect('/gigs')
    }).catch((err)=>{

    })

    }

})

//search for gigs 

router.get('/search', ( req, res)=>{

    const { term} = req.query ; 
    gig.findAll({
            where: {
                technologies: {[Op.like]: '%'+term+'%'}
            }
    }).then((gigs)=>{
        res.render('gigs', {gigs})
    }).catch(error=>{

    })

});

module.exports = router; 