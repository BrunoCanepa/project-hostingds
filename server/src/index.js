const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const { notify } = require('./notificationSend.js')


require('dotenv').config();
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2)

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./routes/clientRoutes.js'));
app.use(require('./routes/serviceTypeRoutes.js'));
app.use(require('./routes/serviceRoutes.js'));
app.use(require('./routes/notificationRoutes.js'));
app.use(require('./routes/contactRoutes.js'));

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

cron.schedule('0 6 * * *', () => {
    notify();
    console.log('funciona');
})
