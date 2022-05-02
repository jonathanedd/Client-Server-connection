// Here comes code that executes when server is initialized
const { app } = require('./app');

//models
const { Post  } = require('./models/post.model');
const { User } = require('./models/user.model');


//utils database conecxion
const { db } = require('./utils/database')

// Authenticate database credentials
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch( err => console.log(err))

//Establish relations: one user has many post, Posts belongs to a user
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User);


// Sync sequelize models
db.sync()
    .then(() => console.log('synced'))
    .catch( err => console.log(err))

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`express app running on port ${PORT} `);
});