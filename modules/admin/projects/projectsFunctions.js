import { MongoClient, ObjectId } from "mongodb";

//setup client and retrieve the db

const dbUrl = process.env.ATLAS;
const db = new MongoClient(dbUrl).db("portfolio");

//list all progexts
async function getProjects() {
    let results = db.collection("projects").find({}).sort({_id:-1 }); //sort by newest first
    return await results.toArray(); // return the results as an array
}

//get project by slug
async function getProjectBySlug(slug) {
    let result = db.collection("projects").findOne({slug});
    return await result
    
}


//add new project

async function addProject(projectDoc) {

    let result = await db.collection("projects").insertOne(projectDoc);
    if (result.insertedId)
        console.log("project added successfully");
    
}

//Delete project

async function deleteProject(id) {

    const deleteFilter = {_id: new ObjectId(String(id))};
    const result = await db.collection("projects").deleteOne(deleteFilter);
    if (result.deletedCount == 1) {
        console.log("project deleted successfully")
    }
    
}



    //update logic, first find the edit project id
async function getSingleProject(id) {
    const editIdFilter = { _id: new ObjectId(String(id)) };
    const result = await db.collection("projects").findOne(editIdFilter);
    return result;

    
};

    
//edit project
async function editProject(filter, skill) {

    const result = await db.collection("projects").updateOne(filter,
       { $set: skill }
    );
    if(result.modifiedCount > 0){
        console.log("project updated successfully");
        
    }else{
        console.log("update failed");
        
    }
    
}


export default {getProjects, addProject, deleteProject,getSingleProject,editProject, getProjectBySlug};