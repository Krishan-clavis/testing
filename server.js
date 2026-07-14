'use strict';

require('dotenv').config();

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 3005;
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

/* --------------------------------------------------
   Security
--------------------------------------------------- */

app.disable('x-powered-by');

app.use(helmet());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false
}));

app.use(compression());

/* --------------------------------------------------
   Body Parser
--------------------------------------------------- */

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* --------------------------------------------------
   Logger
--------------------------------------------------- */

app.use(
    morgan(
        NODE_ENV === 'production'
            ? 'combined'
            : 'dev'
    )
);

/* --------------------------------------------------
   Request Time Middleware
--------------------------------------------------- */

app.use((req, res, next) => {

    req.requestTime = new Date().toISOString();

    next();

});

/* --------------------------------------------------
   Routes
--------------------------------------------------- */

app.get('/', (req, res) => {

    res.status(200).json({

        success: true,

        message: 'Application Running Successfully',

        environment: NODE_ENV,

        timestamp: req.requestTime

    });

});

/* --------------------------------------------------
   Health Check
--------------------------------------------------- */

app.get('/health', (req, res) => {

    res.status(200).json({

        status: 'UP',

        uptime: process.uptime(),

        memory: process.memoryUsage(),

        node: process.version,

        environment: NODE_ENV,

        timestamp: new Date()

    });

});

/* --------------------------------------------------
   API Example
--------------------------------------------------- */

app.get('/api/v1', (req, res) => {

    res.json({

        success: true,

        message: 'API Working'

    });

});

/* --------------------------------------------------
   404 Handler
--------------------------------------------------- */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: 'Route Not Found'

    });

});

/* --------------------------------------------------
   Error Handler
--------------------------------------------------- */

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({

        success: false,

        message:
            NODE_ENV === 'production'
                ? 'Internal Server Error'
                : err.message

    });

});

/* --------------------------------------------------
   Start Server
--------------------------------------------------- */

const server = app.listen(PORT, HOST, () => {

    console.log(`
==========================================
Application Started Successfully
==========================================
Environment : ${NODE_ENV}
Host        : ${HOST}
Port        : ${PORT}
URL         : http://${HOST}:${PORT}
==========================================
`);

});

/* --------------------------------------------------
   Graceful Shutdown
--------------------------------------------------- */

process.on('SIGINT', shutdown);

process.on('SIGTERM', shutdown);

function shutdown() {

    console.log('Stopping Server...');

    server.close(() => {

        console.log('Server Stopped');

        process.exit(0);

    });

}
