const confiq = require('./config');

let query = `CREATE TABLE IF NOT EXISTS stok(
    id serial PRIMARY KEY,
    name varchar (25) NOT NULL,
    jumlah integer
)`;

confiq.query(query, (err, data)=>{
    if (err){
        console.log(err)
    }else{
        // console.log(`Berhasil membuat table!`)
        console.log(data.rows)
    }
})