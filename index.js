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



app.get("/tasks/:id", async (req, res) => {
    const db = await connection();
    const collection = db.collection(collectionName)
    let id = req.params.id;
    const result = await collection.findOne({_id:new ObjectId(id)});
    if (result) {
        res.send({ message: "Update List", success: true, result })
    } else {
        res.send({ message: "Something Wrong", success: false, result })
    }
})

app.post("/updateTask/:id", async (req, res) => {
    try {
        const db = await connection();
        const collection = db.collection(collectionName);

        const taskId = req.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(taskId)) {
            return res.status(400).send({ 
                message: "Invalid task ID format", 
                success: false 
            });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(taskId) },  // filter
            { $set: req.body }              // update data
        );

        if (result.modifiedCount > 0) {
            res.send({ message: "Task Updated Successfully", success: true, result });
        } else {
            res.send({ message: "No task found or nothing to update", success: false, result });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong", success: false, error });
    }
});



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



app.delete("/delete-multiple", async (req, res) => {
    const db = await connection();
    const collection = db.collection(collectionName)
    let ids = req.body;
    let deleteTaskIds=ids.map((item)=>new ObjectId(item))
    
     const result = await collection.deleteMany({_id:{$in:deleteTaskIds}});
    if (result) {
        res.send({ message: "Item successfully Deleted", success: true ,result})
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