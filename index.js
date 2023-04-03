
import express from 'express'
import connect from './src/config/database.js';
import bodyParser from 'body-parser';
import passport from 'passport';

import apiRoutes from './routes/index.js'
import { passportAuth } from './src/config/jwt-middleware.js';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(passport.initialize())
passportAuth(passport)

app.use('/api',apiRoutes)

import TweetService from './services/tweet-service.js';
import {UserRepository} from './src/repository/index.js';
import LikeService from './services/like-service.js';

app.listen(3000,async ()=>{
    console.log('server started')
    await connect();
    console.log('connected to db')
    
    

})

