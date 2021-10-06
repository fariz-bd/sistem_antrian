const con = require('./config');
const Bull = require('bull');
const antrianku = new Bull('antrianku');
const express = require('express');
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
  
antrianku.process(async (job, done) => {
  con.query(`select * from stok where name='${job.data.item}'`, function (err, result) {  
      if(result.rows.length>0){
        if(result.rows[0].jumlah >= job.data.jml){
              let sisa = result.rows[0].jumlah - job.data.jml;
              con.query(`update stok set jumlah = '${sisa}' where name='${job.data.item}'`, function (err, result) {     
                  done(null, `berhasil ambil ${job.data.jml} stock`);
              })
          }else{
                  done(null, `maaf sisa stock tingal ${result.rows[0].jumlah}`);
          }
      }else{
        done(null, `maaf stock habis`);
      }
    });
});

app.get('/', (req, res)=>{
  con.query(`SELECT * FROM stok`, (err, data)=>{
    res.json({message: `Selamat Datang!.`, stok: data.rows});
  })
})

app.post('/add', async(req, res)=>{
  let jml = parseInt(req.body.jml)
  let job = await antrianku.add({
    item: req.body.item,
    jml: jml
  });
  let hasil = await job.finished();
  res.json({data: hasil});

});

antrianku.on('completed', (job, result) => {
  console.log(`Job completed with result ${result}`);
});

app.listen(3000, ()=> console.log(`connected!.`));