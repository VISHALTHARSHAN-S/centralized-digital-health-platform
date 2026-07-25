const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect Database & Start Express Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`  CHMS ENTERPRISE BACKEND REST API SERVER RUNNING  `);
    console.log(`  Environment : ${process.env.NODE_ENV || 'development'}`);
    console.log(`  Port        : ${PORT}`);
    console.log(`  Base URL    : http://localhost:${PORT}/api/v1`);
    console.log(`==================================================\n`);
  });
});
