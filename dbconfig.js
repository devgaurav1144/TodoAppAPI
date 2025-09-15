import {MongoClient} from "mongodb";
 const url = "mongodb://localhost:27017/"
//const url = "mongodb+srv://singhgaurav1144_db_user:mxGfIhjYZtbMKTat@cluster0.2amrxr6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const dbname="TodoApp"
export const collectionName= "todo";

const client = new MongoClient(url);

export const connection = async()=>{
    const connect = await client.connect();
    return connect.db(dbname);
  
}