import express , {Express,Request ,Response} from  'express'
import { request } from 'http'
import { Schema, Document } from 'mongoose';
import path from 'path';
const date = require(__dirname + '/date.js')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

dotenv.config()
const app = express()
const port = process.env.PORT
const password = process.env.MONGODB_PASSWORD
const dbname = process.env.MONGODB_DB
const mongodb_url = `mongodb+srv://Towcarbomb1:${password}@cluster0.c0r9mcv.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.set('strictQuery', true)
mongoose.connect(mongodb_url);

interface ITOdo extends Document 
{
    task:string,
    isDone : boolean,
    taskTitle:String,
    date : Date
}

const todoSchema = new Schema({
    task: String,
    isDone: Boolean,
    taskTitle:String,
    date:{type:Date,default: Date.now}
})
const Todo = mongoose.model('TODO', todoSchema)


app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))
app.set('view engine' , 'ejs')
const dataOption : Intl.DateTimeFormatOptions = {
    weekday: 'long' ,
    year:'numeric',
    month: 'long',
    day: 'numeric'
}
const toDay = date.getDateToday();
// const todoHome = new Set ()
const todoPipo = new Set ()
app.get('/',(request : Request, response : Response ) =>  {
    Todo.find({taskTitle:'Home'},(err:string,todoHome:ITOdo[])=>{
        if(err)
        response.send(err)
        else
        response.render('index', {today: toDay, tasks : todoHome,taskTitle:'Home' })
    })
   
})
app.get('/Pipo',(request : Request, response : Response ) =>  {
    Todo.find({taskTitle:'School'},(err:string,todoHome:ITOdo[])=>{
        if(err)
        response.send(err)
        else
        response.render('index', {today: toDay, tasks : todoHome,taskTitle:'School' })
    })
})
app.post ('/',(request : Request, response : Response )=>{
    
    let path = '/'
     const taskType = request.body.type
     const newTask = request.body.newTask
    if (request.body.type === 'School'){
        path ='school'
    }
     if (newTask !== ''){
        const task = new Todo ({
            task: newTask,
            isDone:false,
            taskTitle:taskType
        })
        task.save()
        response.redirect(path)
     }
    
    if(request.body.delete !== undefined){
        const delete_id = request.body.delete
        Todo.deleteOne({_id: delete_id},(err:string)=>{
            if (err){
                response.send(err)
            }else {
                response.redirect(path)
            }
        })
    }
     
})  




app.listen(port,()=> {
    console.log(`[SERVER].Server is running at http://localhost:${port}`)
    
})