import express, {Request, Response, NextFunction} from 'express';  // express é uma biblioteca agerenciadora de rotas http.

const app = express();

app.get('/status', (req:Request, res:Response, next:NextFunction ) => {    //padrão express para tratamento de rota!
    res.status(200).send({foo: 'Aplicação automatizada, restartando '});

});

app.listen(3000, () => {
    console.log('Aplicação escutando a porta 3000!');
});

//Node
// Servidor rodando na porta 3000! 
// fazendo uma requisição... 