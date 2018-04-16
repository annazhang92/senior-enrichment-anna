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
    },
    imgUrl:{
        type:Sequelize.STRING  
    }
})

const School = conn.define('school',{
    name:{
        type:Sequelize.STRING
    },
    location:{
        type:Sequelize.STRING  
    },
    imgUrl:{
        type:Sequelize.STRING  
    },
    description:{
        type:Sequelize.TEXT  
    }
})

Puppy.belongsTo(School);
School.hasMany(Puppy);

conn.sync({force:true})
.then(()=>Promise.all[
    School.create({name:'Pup-School-one',location:'new york city',imgUrl:'https://media.gettyimages.com/photos/washington-square-girl-walking-the-dog-picture-id523743889',description:'Lorem1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}),
    School.create({name:'Pup-School-two', location: 'berlin',imgUrl:'https://media.gettyimages.com/photos/street-scene-in-kreuzberg-alternative-neighborhood-in-berlin-picture-id501840600',description:'Lorem2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}),
    School.create({name:'Pup-School-three',location:'hongkong',imgUrl:'https://media.gettyimages.com/photos/owners-and-their-dogs-take-part-in-hk-doggie-dash-2018-an-event-held-picture-id946446864',description:'Lorem3 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}),
    School.create({name:'Pup-School-four',location:'zuerich',imgUrl:'https://media.gettyimages.com/photos/bernese-mountain-dog-is-hugged-by-owner-outside-picture-id801341208',description:'Lorem4 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}),
    School.create({name:'Pup-School-five', location: 'paris',imgUrl:'https://media.gettyimages.com/photos/person-holding-a-dog-in-paris-picture-id717174477',description:'Lorem5 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}),
    School.create({name:'Pup-School-six',location:'amsterdam',imgUrl:'https://media.gettyimages.com/photos/woman-walking-with-her-dog-in-the-park-picture-id659162952',description:'Lorem6 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}),
    School.create({name:'Pup-School-seven',location:'hawaii',imgUrl:'https://media.gettyimages.com/photos/man-in-a-kayak-with-four-labradors-at-a-beach-resort-on-the-south-of-picture-id135577013',description:'Lorem7 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}),
    Puppy.create({name:'foo',gpa:'3.6',schoolId:1,imgUrl:'https://media.gettyimages.com/photos/pictured-puppy-bowl-on-thursday-feb-1-2018-picture-id913170662'}),
    Puppy.create({name:'bar',gpa:'3.7',schoolId:null,imgUrl:'https://media.gettyimages.com/photos/beautiful-yorkshire-terrier-playing-with-a-ball-on-a-grass-picture-id652401198'}),
    Puppy.create({name:'bazz',gpa:'4.0',schoolId:null,imgUrl:'https://media.gettyimages.com/photos/waiting-picture-id172254814'}),
    Puppy.create({name:'moe',gpa:'3.6',schoolId:4,imgUrl:'https://media.gettyimages.com/photos/norfolk-terrier-puppy-picture-id839040870'}),
    Puppy.create({name:'larry',gpa:'3.7',schoolId:1,imgUrl:'https://media.gettyimages.com/photos/yawning-chocolate-labrador-puppy-sitting-in-large-dog-bowl-5-weeks-picture-id866757656'}),
    Puppy.create({name:'curly',gpa:'4.0',schoolId:2,imgUrl:'https://media.gettyimages.com/photos/portrait-of-fluffy-pembroke-corgi-picture-id573628081'}),
    Puppy.create({name:'jan',gpa:'3.6',schoolId:3,imgUrl:'https://media.gettyimages.com/photos/small-dog-picture-id460533799'}),
    Puppy.create({name:'max',gpa:'3.7',schoolId:1,imgUrl:'https://media.gettyimages.com/photos/sharpei-pitbull-puppy-laying-on-couch-picture-id840226604'}),
    Puppy.create({name:'michele',gpa:'4.0',schoolId:1,imgUrl:'https://media.gettyimages.com/photos/closeup-portrait-of-dog-picture-id697553675'}),
    Puppy.create({name:'manon',gpa:'4.0',schoolId:2,imgUrl:'https://media.gettyimages.com/photos/toy-poodle-holding-bone-in-his-mouth-picture-id551696191'}),
    Puppy.create({name:'babette',gpa:'3.6',schoolId:2,imgUrl:'https://media.gettyimages.com/photos/corgi-puppy-picture-id512536165'}),
    Puppy.create({name:'lis',gpa:'3.7',schoolId:3,imgUrl:'https://media.gettyimages.com/photos/yorkshire-terrier-puppy-picture-id163818535'}),
    Puppy.create({name:'sara',gpa:'4.0',schoolId:4,imgUrl:'https://media.gettyimages.com/photos/boxer-puppy-picture-id861718610'})
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
