const express = require('express');
const app = require('./app');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('dotenv').config();
const routes = require('./routes');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
