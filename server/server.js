// Here comes code that executes when server is initialized
const { app } = require("./app");

//models
const { initModels } = require("./models/initModels");

//utils database conecxion
const { db } = require("./utils/database");

// Authenticate database credentials
db.authenticate()
  .then(() => console.log("Database Authenticated"))
  .catch((err) => console.log(err));

initModels();

// Sync sequelize models
db.sync()
  .then(() => console.log("synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`express app running on port ${PORT} `);
});
