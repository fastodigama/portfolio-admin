import { MongoClient, ObjectId } from "mongodb";

//setup client and retrieve the db

const dbUrl = process.env.ATLAS;
const db = new MongoClient(dbUrl).db("portfolio");

//function to list all the skills from the database
async function getSkills() {
    let results = db.collection("skills").find({}).sort({_id: -1}); //sort by newest first
    return await results.toArray();// return the results as an array
}

//Add new skill

async function addSkill(skillDoc) {

    let result = await db.collection("skills").insertOne(skillDoc);
    if (result.insertedId){
        console.log("skill added successfully")
    }
    
}
//Delete skill
async function deleteSkill(id) {
    const deleteFilter = { _id: new ObjectId(String(id))};
    const result = await db.collection("skills").deleteOne(deleteFilter);
    if (result.deletedCount == 1) {
        console.log("skill deleted successfully")
    }
 }   
    //update logic, first find the edit skill id
async function getSingleSkill(id) {
    const editIdFilter = { _id: new ObjectId(String(id)) };
    const result = await db.collection("skills").findOne(editIdFilter);
    return result;

    
};

    

//edit skill function
async function editSkill(filter, skill) {

    const result = await db.collection("skills").updateOne(filter,
       { $set: skill }
    );
    if(result.modifiedCount > 0){
        console.log("skill updated successfully");
        
    }else{
        console.log("update failed");
        
    }
    
}
export default {getSkills,
     addSkill, deleteSkill,getSingleSkill, editSkill
    };

