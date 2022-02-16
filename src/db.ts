//Configurando o Banco de Dados!

import { Pool } from 'pg';

const connectionString = 'postgres://ziwwcccq:k2vcu96m5ImU4whrYzBoFSyVw3s-HCap@kesavan.db.elephantsql.com/ziwwcccq';

const db = new Pool({ connectionString });

export default db;