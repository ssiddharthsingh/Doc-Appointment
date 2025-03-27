// const {port} = require('./src/helper')

const express = require('express')
const app = express();

const bodyParser = require("body-parser")
const { json, urlencoded } = bodyParser;

app.use(urlencoded({extended: false}))
app.use(json());

const cors = require("cors");

app.use(cors({
    origin: "*",
    methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'UPDATE']
}));

app.get('/',(req,res)=>{
    res.send('My api is Connected Successfully!!!');
});

const port = 4500;

//const { lookup } = require("dns");
app.listen(port, ()=>{
    console.log(`API started Port:${port}`);
});


const userRoute = require('./src/routes/user.route')
app.use('/users',userRoute);

const docRoute = require('./src/routes/doc.route')
app.use('/doctors',docRoute);

const loginRoute = require('./src/routes/login.route')
app.use('/login',loginRoute);

const appointmentRoute = require("./src/routes/appointment.route");
app.use("/appointments", appointmentRoute);


app.use(express.static('src'));
app.use('/images',express.static('files'));

const fileRoute = require('./src/routes/file.upload.route');
app.use('/upload',fileRoute);
//localhost:4500/users/getUsers

const feedbackRoute = require('./src/routes/feedback.route');
app.use('/feedback', feedbackRoute);



