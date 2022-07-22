const express = require('express');
const as = express();
const cors = require('cors');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const dotenv=require('dotenv').config();
const URL = process.env.DB;
//const URL = "mongodb://localhost:27017";


as.use(express.json());
as.use(cors({
    orgin: "*"
}));
let users = []
as.get("/", async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("to-do");
        const result=await db.collection("students").find().toArray();
        await connection.close();
        res.json(result);
    } catch (error) {
        console.log(error);
    }
})

as.post("/", async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("to-do");
        await db.collection("students").insertOne(req.body);
        await connection.close();
        res.json({
            message: "student added successfully"
        })
    } catch (error) {
        console.log(error);
    }
})


as.get("/:id",async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("to-do");
        const result=await db.collection("students").findOne({_id:mongodb.ObjectId(req.params.id)});
        await connection.close();
        res.json(result);
    } catch (error) {
        console.log(error);
    }
})


as.put("/:id", async function (req, res) {

    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("to-do");
        const result=await db.collection("students").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body});
        await connection.close();
        res.json({ message: "updated successfully" });
    } catch (error) {
        console.log(error);
    }
})


as.delete("/:id", async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("to-do");
        const result=await db.collection("students").deleteOne({_id:mongodb.ObjectId(req.params.id)});
        await connection.close();
        res.json({ message: "deleted successfully" })
    } catch (error) {
        console.log(error);
    }
    
})
as.listen(process.env.PORT || 5000)