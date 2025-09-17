import express from 'express';
import { collectionName, connection } from './dbconfig.js';
import cors from 'cors';
import { ObjectId } from 'mongodb';
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


app.get("/tasks", async (req, res) => {
    const db = await connection();
    const collection = db.collection(collectionName)
    const result = await collection.find().toArray();
    if (result) {
        res.send({ message: "Task List", success: true, result })
    } else {
        res.send({ message: "Something Wrong", success: false, result })
    }
})


app.delete("/delete/:id", async (req, res) => {
    const db = await connection();
    const collection = db.collection(collectionName)
    let id = req.params.id;
    const result = await collection.deleteOne({_id:new ObjectId(id)});
    if (result) {
        res.send({ message: "Item successfully Deleted", success: true, result })
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