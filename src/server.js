require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

//autenticación

db.authenticate()
  .then(() => console.log('Database authenticated ✌'))
  .catch((err) => console.log(err));

//sincronización
db.sync()
  .then(() => console.log('Database synced 👏'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 😁 😎...`);
});
