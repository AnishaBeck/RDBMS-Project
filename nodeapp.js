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

//for each individual tasks    
var id;
app.get('/activities/:id', (req,res)=>
    {
        id=req.params.id;
        
        app.get('/view',(req,res)=>
        {
            var sql = "SELECT * from activity WHERE task_id="+id;
            //console.log(id);
            connection.query(sql,(err,rows,fields)=>
            {
                if(!err)
                    res.send(rows);
                else
                    console.log('Error in Displaying')
        })  
        app.get('/delact/:id',(req,res)=>
        {
            console.log(req.params.id)
            connection.query('DELETE FROM activity WHERE task_id=? and activity_id=?',[id,req.params.id],(err,rows,fields)=>
            {
                if(!err)
                // console.log("DATA deleted");
                res.send(rows)
                else
                console.log("error");
            })
            // res.sendFile(path.join(__dirname+'/homepage.html'));
        })
        app.get('/editact/:id/:name/:wid',(req,res)=>
        {
            //console.log(req.params.title)
            connection.query('UPDATE activity SET name=?, workflow_id=? WHERE task_id=? and activity_id=?',[req.params.name,req.params.wid,id,req.params.id],(err,rows,fields)=>
            {
                if(!err)
                //console.log("DATA updated");
                res.send(rows)
                else
                console.log("error");
            })
            // res.sendFile(path.join(__dirname+'/homepage.html'));
        })
        app.post('/addact',(req,res)=>
        {
            var name = req.body.name;
            var edoc = req.body.edoc;
            var wid = req.body.wid;
            var stat=0;
            var sql = `INSERT INTO activity(task_id, name, EDOC, status,workflow_id) VALUES(${id}, "${name}","${edoc}",${stat},${wid})`;
            //console.log(sql)
            connection.query(sql,(err,rows,fields)=>
            {
                if(!err)
                console.log('Data has been inserted successfully...!');
                else
                console.log(err)
            })
            res.redirect('/activities/'+id);
        })

        app.get('/completeact/:id/:s',(req,res)=>{
            var stat;
            if(req.params.s==1)
            stat=0;
            else
            stat=1;
            connection.query('UPDATE activity SET status=? WHERE task_id=? and activity_id=?',[stat,id,req.params.id],(err,rows,fields)=>
            {
                //console.log(rows);
                if(!err)
                {
                    //console.log("A")
                    
                res.send(rows)
                }
                
                else
                console.log("error");
            })
            //res.redirect('/activities/'+id);
        })

        app.get('/updatepercentage/:val',(req,res)=>{
            connection.query('UPDATE tasks SET progress=? WHERE task_id=?',[req.params.val,id],(err,rows,fields)=>
            {
                //console.log(rows);
                if(!err)
                {
                    console.log("A")
                    
                res.send(rows)
                }
                
                else
                console.log("error");
            })
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

