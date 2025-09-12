import e from 'express'
const app = e();
app.get("/",(req,res)=>{
res.send({
    name:"Gaurav",
    Email:"singhgaurav.1144@gmail.com"
})
})

app.listen(8989)