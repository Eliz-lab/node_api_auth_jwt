//npm init / npm install express jsonwebtoken / npm install -g nodemon
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.get('/api', (req, res) => {
    res.json({ 
        message: 'Welcome to the API'
    });
});
app.post('/api/posts', verifyToken,(req, res) => {
    jwt.verify(req.token,'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...', 
                authData
            })
        }
    })
    res.json({ 
        message: 'Post created'
    });
});
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

//verify Token (middleware)
function verifyToken(req,res,next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if berer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //next middleware
        next();
    }else{
        //forbidden
        res.sendStatus(403);
    }
}

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'Brad',
        email: 'brad@gamil.com'
    }
    jwt.sign({user: user},'secretkey', {expiresIn:'30s'},(err, token) => {
        res.json({ 
            token: token
        });
    });
});


app.listen(5000, () => console.log('Server started on port 5000'));