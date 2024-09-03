const express = require('express');
const bodyParser = require('body-parser');
const { home, user, leave } = require('./routers/index');
const db = require('./module');

const app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/home', home)
app.use('/user', user)
app.use('/leave', leave)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


(async () => {
    console.log("acyncronize");
    await db.sequelize.sync()

})();



app.listen(process.env.PORT || 3001);