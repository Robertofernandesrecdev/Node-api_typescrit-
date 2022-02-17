require('dotenv').config()

import express, {Request, Response, NextFunction} from 'express';  // express é uma biblioteca agerenciadora de rotas http.
import usersRouter from './routes/users.route';  // após importar, chamar a configuração!
import statusRoute from './status.route';



const app = express();

// Configurações da aplicação
app.use(express.json());  // vai interpretar e converter para acessar o body denro da aplicação 
app.use(express.urlencoded({ extended: true })); // enterder que é string e outras questões!

//Configurações de Rotas
app.use(usersRouter);  // chamando a configuração! 
app.use(statusRoute);


// Inicialização do servidor
app.listen( process.env. PORT ||3000, () => {
    console.log('Aplicação escutando a porta 3000!');
});

//Node
// Servidor rodando na porta 3000! 
// fazendo uma requisição... 
//proximo passo criar as rotas /src/routes...