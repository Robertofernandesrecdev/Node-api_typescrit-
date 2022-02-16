// Rotas a serem criadas.

// get/users

import {  Response, Request, NextFunction, Router } from 'express';
import {StatusCodes} from 'http-status-codes'; //para padronizar o status

const usersRouter = Router();

usersRouter.get('/users', (req: Request, res: Response, next: NextFunction) => {
       const users = [{userName: 'Roberto'}];
       res.status(StatusCodes.OK).send(users); 
});



//exportar a configuração da rota userRouter.get e importar no servidor em index.ts. 

// get/users/:uuid  // req:Resquest<{ uuid: string }> especificando requisição do tipo string!
                                 
usersRouter.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    
    res.status(StatusCodes.OK).send({uuid});
});


// post/users // para testar usar o insomnia ou postman! 

usersRouter.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    console.log(req.body);

    res.status(StatusCodes.CREATED).send(newUser);
});

//put/users/:uuid

usersRouter.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;
    res.status(StatusCodes.OK).send({ modifiedUser });
});


//delete/users/:uuid

usersRouter.delete('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);

});

export default usersRouter; 