import db from '../db';
import User from '../models/user.model';


class UserRepository{

    // buscando do banco isso vai ser usado lá na rota! 

   async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, username 
            FROM application_user
        `;

        const result = await db.query<User>(query);
        const rows = result.rows;
        return rows || [];

    }  // criar os modelos de usuários models/user.model

}

export default new UserRepository();