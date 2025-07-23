require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/models'); // 👈 Import your Sequelize instance

app.use(cors());
app.use(express.json());


// Optional health check route
app.get('/', (req, res) => {
  res.send('Server is running.');
});

require("./app/routes/projects.routes")(app);
require("./app/routes/comments.routes")(app);
require("./app/routes/project_members.routes")(app);
require("./app/routes/tasks.routes")(app);
require("./app/routes/users.routes")(app);
// Test DB connection before starting server
const PORT = process.env.PORT || 5000;

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err.message);
  });
