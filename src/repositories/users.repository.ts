
import DatabaseError from '../models/errors/database.error.model';
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
        try {
            const query = `
                SELECT uuid,username 
                FROM application_user
                WHERE uuid = $1
            `;

            const values = [uuid];
            const {rows} = await db.query<User>( query, values );
            const [user] = rows;
            return user;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error); //criar esse modelo de error
        }   

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


    // update 
    async update(user: User): Promise<void> {
        const script = `
            UPDATE application_user 
            SET  
                username = $1,
                password = crypt($2, 'my_salt')
            WHERE uuid = $3    
              
        `;   // lembrar de ocultar a senha em variavel de ambiente! 
        // parametros username, password, uuid 
        const values = [user.username, user.password, user.uuid];
        await db.query(script, values);
        
    }


    // Delete 
    async remove(uuid:string): Promise<void>{
        const cript = `
            DELETE 
            FROM application_user
            WHERE uuid = $1
        `;
        const values = [uuid];
        await db.query(cript, values);
    }

}

export default new UserRepository();