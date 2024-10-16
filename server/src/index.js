const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const { notify } = require('./notificationSend.js')

//Configuraciones
app.set('port', process.env.PORT || 8000);
app.set('json spaces', 2)

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Routes
app.use(require('./routes/clientRoutes.js'));
app.use(require('./routes/serviceTypeRoutes.js'));
app.use(require('./routes/serviceRoutes.js'));
app.use(require('./routes/notificationRoutes.js'));
app.use(require('./routes/contactRoutes.js'));


//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

cron.schedule('0 6 * * *', () => {
    notify();
    console.log('funciona');
})



//clientEmail, clientName, daysToPay, serviceType, endDate