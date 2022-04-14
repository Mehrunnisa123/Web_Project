const express = require('express');
const user = require('./model/user');
const app = express();
const User = require('./model/user');



app.set('view engine', 'ejs');
app.set('views', 'views')

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const Validpassword = await bcrypt.compare(password, user.password)
    if (Validpassword) {
        res.send("Login Successfull!")
    }
    else {
        res.send("Login Failed!")
    }

})

app.post('/logout', (req, res) => {
    req.session.destory()
    res.redirect('/login')


})


app.get('/logout', (req, res) => {
    res.redirect('/login')
})
app.listen(3000, () => {
    console.log("Serving Your App")
})