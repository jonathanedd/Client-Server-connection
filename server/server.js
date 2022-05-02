// Here comes code that execute when server is initialized
const { app } = require('./app');




//utils database conecxion
const { db } = require('./utils/database')

// Authenticate database credentials
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch( err => console.log(err))

// Sync sequelize models
db.sync()
    .then(() => console.log('synced'))
    .catch( err => console.log(err))

const PORT = 4000;


app.listen(PORT, () => {
    console.log(`express app running on port ${PORT} `);
});