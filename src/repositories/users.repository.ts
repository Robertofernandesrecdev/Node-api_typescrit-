
import db from '../db';
import User from '../models/user.model';


class UserRepository{

    // buscando do banco isso vai ser usado lá na rota! 

   async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, username 
            FROM application_user
        `;

        // melhorando o código 
        const {rows} = await db.query<User>(query);
        return rows || [];

    }  // criar os modelos de usuários models/user.model

    // busca por uuid no banco 
    async findById(uuid: string): Promise<User> {
        const query = `
            SELECT uuid,username 
            FROM application_user
            WHERE uuid = $1
        `;

        const values = [uuid];
        const {rows} = await db.query<User>( query, values );
        const [user] = rows;
        return user;

    }

    // fazendo isert / post no banco

    async create(user: User): Promise<string> {
        const script = `
            INSERT INTO application_user (
                username,
                password
            )
            VALUES ($1, crypt($2, 'my_salt'))
            RETURNING uuid  
        `;   // lembrar de ocultar a senha em variavel de ambiente! 

        const values = [user.username, user.password];
        const {rows} = await db.query<{uuid: string}>(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }

}

export default new UserRepository();