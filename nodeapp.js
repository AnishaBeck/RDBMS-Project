const mysql=require('mysql2')
const express=require('express')
const port =7500;
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
         password:'12345@Don',
         database:'PTM'
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
app.get('/getjson',(req,res)=>
{
    connection.query("SELECT * from tasks",(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log('Error in Displaying')
    })
})
app.get('/',(req,res)=>
{
    //res.sendFile(__dirname +"/index.html");
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/homepage',(req,res)=>
{
    //res.sendFile(__dirname +"/index.html");
    res.sendFile(path.join(__dirname+'/homepage.html'));
})
app.post('/add',(req,res)=>
{
    var title = req.body.title;
    var progress = 0;
    //var startdate = req.body.startdate;
   
    var sql = `INSERT INTO tasks(title, progress, startdate) VALUES("${title}", "${progress}", NOW())`;
 //var sql="INSERT INTO tasks(title, progress, startdate) VALUES("+req.body.title+"','"+parseInt(req.body.progress)+"','"+req.body. event+"','"+req.body.team+"');"
    console.log(req.body.title)
    connection.query(sql,(err,rows,fields)=>
    {
        if(!err)
        console.log('Data has been inserted successfully...!');
        else
        console.log(err)
    })
    //res.sendFile(path.join(__dirname+'/homepage.html'));
    res.redirect('/homepage');
})

app.get('/del/:id',(req,res)=>
    {
        console.log(req.params.id)
        connection.query('DELETE FROM tasks WHERE task_id=?',[req.params.id],(err,rows,fields)=>
        {
            if(!err)
            // console.log("DATA deleted");
            res.send(rows)
            else
            console.log("error");
        })
        // res.sendFile(path.join(__dirname+'/homepage.html'));
    })

app.get('/edit/:id/:title',(req,res)=>
    {
        console.log(req.params.title)
        connection.query('UPDATE tasks SET title=?WHERE task_id=?',[req.params.title,req.params.id],(err,rows,fields)=>
        {
            if(!err)
             //console.log("DATA updated");
            res.send(rows)
            else
            console.log("error");
        })
        // res.sendFile(path.join(__dirname+'/homepage.html'));
    })
    var id;
app.get('/activities/:id', (req,res)=>
    {
        id=req.params.id;
        
        app.get('/view',(req,res)=>
        {
            var sql = "SELECT * from activity WHERE task_id="+id;
            console.log(id);
            connection.query(sql,(err,rows,fields)=>
            {
                if(!err)
                    res.send(rows);
                else
                    console.log('Error in Displaying')
            })  
    })

    res.sendFile(path.join(__dirname+'/activity.html'));
})
    // app.get('/activity/:id/view',(req,res)=>
    // {
    //     connection.query("SELECT * from activity WHERE task_id=?",[req.params.id],(err,rows,fields)=>
    //     {
    //         if(!err)
    //             res.send(rows);
    //         else
    //             console.log('Error in Displaying')
    //     })  
    // })

