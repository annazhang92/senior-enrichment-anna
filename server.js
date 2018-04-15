const express = require('express');
const app = express();
const port =3000;
const Sequelize = require('sequelize');
const conn = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost/senior_enrichment_db')
const path = require('path');
var bodyParser = require('body-parser');
app.use(require('body-parser').json());

app.listen(port,()=>console.log(`listening on port ${port}`) );

app.use(express.static(path.join(__dirname, "."))); //was is das???
//static file: html.... direct everythings to the index.html?


const Puppy = conn.define('puppy',{
    name:{
        type:Sequelize.STRING
    },
    gpa:{
        type:Sequelize.STRING  
    }
})

const School = conn.define('school',{
    name:{
        type:Sequelize.STRING
    },
    location:{
        type:Sequelize.STRING  
    }
})

Puppy.belongsTo(School);
School.hasMany(Puppy);

conn.sync({force:true})
.then(()=>Promise.all[
    School.create({name:'Pup-School-one',location:'new york city'}),
    School.create({name:'Pup-School-two', location: 'berlin'}),
    School.create({name:'Pup-School-three',location:'hongkong'}),
    Puppy.create({name:'foo',gpa:'3.6',schoolId:1}),
    Puppy.create({name:'bar',gpa:'3.7',schoolId:1}),
    Puppy.create({name:'bazz',gpa:'4.0',schoolId:2})
])

app.get('/api/puppies',(req,res,next)=>{
    Puppy.findAll()
    .then(puppies=>res.send(puppies))
})

app.get('/api/schools',(req,res,next)=>{
    School.findAll()
    .then(schools=>res.send(schools))
})


app.post('/api/schools',(req,res,next)=>{
    School.create(req.body)
    .then(school=>res.send(school))
})

app.post('/api/puppies',(req,res,next)=>{
    Puppy.create(req.body)
    .then(puppy=>res.send(puppy))
})

app.put('/api/updateschools/:id', (req, res, next)=> {
    School.findById(req.params.id)
      .then( school => {
        Object.assign(school, req.body)
        return school.save();
      })
      .then( school => res.send(school))
      .catch(next);
  });

app.put('/api/updatepuppies/:id', (req, res, next)=> {
    Puppy.findById(req.params.id)
      .then( puppy => {
        Object.assign(puppy, req.body)
        return puppy.save();
      })
      .then( puppy => res.send(puppy))
      .catch(next);
  });
  

app.delete('/api/schools/:id', (req, res, next)=> {
    School.findById(req.params.id)
      .then( school => {
        return school.destroy();
      })
      .then(school=>res.send(school))
      .catch(next);
  });



  app.delete('/api/puppies/:id', (req, res, next)=> {
    Puppy.findById(req.params.id)
      .then( puppy => {
        return puppy.destroy();
      })
      .then(puppy=>res.send(puppy))
      .catch(next);
  });
