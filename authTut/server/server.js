const express = require('express')
const session = require('express-session')
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session);
const app = express()
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [{id: '334edff', email: "test@test.com", password: "password"}]


passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    const user = users[0];
    if (email === user.email && password === user.password) {
        return done(null, user);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = user[0].id === id ? user[0] : false;
    done(null, user)
})


// add & configure middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    'genid': (req) => {
        console.log('Inside the session middleware!')
        console.log(req.sessionID)
        return uuid();
    }, store: new FileStore(), secret: 'test cat', resave: false, saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session())

app.listen(3000, () => {
    console.log('Listening to local host');
})


app.get('/', (req, res) => {
    console.log('you are in the homepage');
    console.log(req.sessionID)
    res.send('inside the homepage\n');

})


app.get('/login', (req, res) => {
    console.log('Inside the get method');
    res.send('Get returned');

})

app.post('/login', (req, res, next) => {
    console.log('Inside the post method');

    passport.authenticate('local', (err, user, info) => {
        console.log(`req.session.passport = ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user = ${JSON.stringify(req.user)}`);
        req.login(user, (err) => {
            console.log(`req.session.passport in login = ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user in login  = ${JSON.stringify(req.user)}`);
            res.send(`You were authenticated and login`);
        })
    })(req,res,next)

})
