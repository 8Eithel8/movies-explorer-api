const port = 3000;
const mongoDbServer = 'mongodb://localhost:27017/moviesdb';
const secretKey = 'some-secret-key';
const jwtSettings = { expiresIn: '7d' };

module.exports = {
  port,
  mongoDbServer,
  secretKey,
  jwtSettings,
};
