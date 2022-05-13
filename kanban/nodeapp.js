const mysql=require('mysql2')
const express=require('express')
const port =8000;
const app=express();
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
app.use(cors({
    orgin: "*",
}))

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

 const connection=mysql.createConnection(
     {
         host:'localhost',
         user:'root',
         password:'4009',
         database:'pmt'
     }
 )
connection.connect((err)=>
{
    if(!err)
    console.log('Database connection eshtablished....!')
    else
    console.log('Error')
})

app.listen(port,()=>
{
    console.log('Connection Eshtablished successfully....!!!')
}
)

app.get('/test1', (req, res) => {
    connection.query('select * from user', (err, data) => {
        if(!err){
            return res.json(data)
        }
        else{
            return res.sendStatus(500).end()
        }
    })
})

