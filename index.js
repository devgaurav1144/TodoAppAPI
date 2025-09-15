import express from 'express';
import { collectionName, connection } from './dbconfig.js';
import cors from 'cors';
const app = express();
app.use(express.json())
app.use(cors())

/***
 * Post Api to Add Task 
 */
app.post("/addTask", async (req, res) => {
    const db = await connection();
    const collection = db.collection(collectionName)
    const result = await collection.insertOne(req.body)
    if (result) {
        res.send({ message: "Task Successfully Added", success: true, result })
    } else {
        res.send({ message: "Something Wrong", success: false, result })
    }
})


/**
 * Get Api For Testing
 */
app.get("/", (req, res) => {
    res.send({
        name: "Gaurav",
        Email: "singhgaurav.1144@gmail.com"
    })
})

app.listen(8989)