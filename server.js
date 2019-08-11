const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('WELCOME TO SERVER!');
})

app.listen(PORT, () => {
  console.log(`Server Started, Listening to port ${PORT}`);
})