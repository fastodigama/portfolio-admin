import { MongoClient, ObjectId } from "mongodb";

//Retrieve the db

const dbUrl = process.env.ATLAS; // connection string save on .env 
const db = new MongoClient(dbUrl).db("portfolio"); // create the client and select the portfolio database

//retrieve the menuLink documents in the collection db

async function getLinks() {

    let results = db.collection("menuLinks").find({}).sort({sortId: 1});
    return await results.toArray(); // returns a promise array
    
}

export default {
    getLinks
}