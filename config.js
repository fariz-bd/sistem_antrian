const {Pool} = require('pg')

const sql = new Pool({
    user : 'postgres',
    password : 'Berkahamin46',
    host: 'localhost',
    database: 'bull',
    port: 5432
})


sql.connect((err, data)=>{
    if(err) throw err;
    console.log(`connected!`);
})

module.exports = sql;