const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const singin = require('./controllers/singin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    conection: {
        connectionString: 'postgres://rkarjipzrmitlm:44632497250af1152384ea5c13fcdaba3a59c060c4d7f562f5b917aa8b0479b6@ec2-52-71-161-140.compute-1.amazonaws.com:5432/df8e5e63vjs45a',
        ssl: true,
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('success');
})
app.post('/signin', (req, res)=> {singin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)})
app.get('/profile/:id', (req, res,)=> {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res)=> image.handleImage(req, res, db))
app.post('/imageurl', (req, res)=> image.handleApiCall(req, res))

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/