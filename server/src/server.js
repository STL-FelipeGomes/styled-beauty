const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 3333;
const cors = require('cors');

const routes = require('./routes');

app.use(cors());

app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
