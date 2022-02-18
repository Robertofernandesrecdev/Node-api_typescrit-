// Rotas a serem criadas.

// get/users

import {  Response, Request, NextFunction, Router } from 'express';
import {StatusCodes} from 'http-status-codes'; //para padronizar o status
import { DatabaseError } from 'pg';
import usersRepository from '../repositories/users.repository';

const usersRouter = Router();

usersRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
       const users =  await usersRepository.findAllUsers(); // consulta do banco 
       res.status(StatusCodes.OK).send(users); 
});

//exportar a configuração da rota userRouter.get e importar no servidor em index.ts. 

// get/users/:uuid  // req:Resquest<{ uuid: string }> especificando requisição do tipo string!
                                 
usersRouter.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
   try{
        const uuid = req.params.uuid;
        const user = await usersRepository.findById(uuid); // consulta por uuid do banco
        res.status(StatusCodes.OK).send(user);
   } catch(error) {
       next(error); // chama a proximo que vai tratar error 
   }
});


// post/users // para testar usar o insomnia ou postman! 

usersRouter.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    
    const uuid = await usersRepository.create(newUser); // isert do banco 

    res.status(StatusCodes.CREATED).send(uuid);
});

//put/users/:uuid

usersRouter.put('/users/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;
    await usersRepository.update(modifiedUser);
    res.status(StatusCodes.OK).send();
});


//delete/users/:uuid

usersRouter.delete('/users/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await usersRepository.remove(uuid);
    res.sendStatus(StatusCodes.OK);

});

export default usersRouter; 