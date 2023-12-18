const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config.js');

mongoose
  .connect(config.mongoose.url)
  .then(() => {
    app.listen(config.port, () => {
      console.log('Connected to DB at', config.mongoose.url);
      console.log(`[Server] is running 🚀 on port ${config.port}`);
    });
  })
  .catch((error) => console.log(`Error occured ${error}`));
