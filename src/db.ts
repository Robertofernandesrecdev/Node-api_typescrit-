//Configurando o Banco de Dados!

import { Pool } from 'pg';

const connectionString = process.env.KEY

const db = new Pool({ connectionString });

export default db;