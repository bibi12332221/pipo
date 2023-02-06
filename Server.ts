import express , {Express,Request ,Response} from  'express'
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({extended : true}))

app.get('/', (req: Request,res : Response )=> {
    res.sendFile(__dirname + '/bmi.html')
})
app.post('/',(req: Request,res : Response) => {
    const weight = Number (req.body.weight)
    const height = Number (req.body.height)
    const bmi = weight / height*height
    res.send('BMI ='+ bmi)
})
app.get('/aboutme', (req: Request,res : Response )=> {
    res.send('<h1>tao</h1>')
})

app.listen(port,()=> {
    console.log(`[SERVER].Server is running at http://localhost:${port}`)
    
})