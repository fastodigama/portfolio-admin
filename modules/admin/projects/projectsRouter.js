
import express from "express"; // Import Express framework
import { ObjectId } from "mongodb";

const router = express.Router(); // Create a router to define admin routes

import model from "./projectsFunctions.js"; //import the exported functions
import links from "../menuLinks/linksFunctions.js" // import links


//configure route for project admin page

router.get("/", async (req , res) => {
    try{
        const projectList = await model.getProjects();
        const linkList = await links.getLinks();
        res.render("admin/admin-projects.pug", {title: "Manage Projects",
        projects: projectList , links : linkList
    });
    }catch{
        console.error(err);
        res.status(500).send("Server error");
    }
    

      
});

//for API request

router.get("/api", async (req,res) => {
    try{
        const projectList = await model.getProjects();
        res.json(projectList);
    }catch(err){
       res.status(500).json({ error: "Something went wrong." });
    }

});

//get project by slug api

router.get("/api/:slug", async (req,res) => {
    try{
    const {slug} = req.params;
    const project = await model.getProjectBySlug(slug);
    if (!project) {
            return res.status(404).json({ error: "Project not found." });
        }
    res.json(project);

    } catch (err) {
        res.status(500).json({ error: "Something went wrong." });
    }
    
});


// add new project

//get menu links first
router.get("/add", async (req , res) => {
     const linkList = await links.getLinks();
     res.render("admin/projects/project-add.pug", {title:"Add project",links: linkList});
     
});

//submit the add project form

router.post("/add/submit", async (req, res) => {
    const slug = req.body.name.toLowerCase().trim().replace(/\s+/g, "-");
    const newProject = {
        name: req.body.name,
        slug: slug,
        description: req.body.description,
        technologies: req.body.technologies
    };
    await model.addProject(newProject);
    res.redirect("/admin/projects");
});

//Delete project
router.get("/delete", async (req,res) => {
    await model.deleteProject(req.query.projectId);
    res.redirect("/admin/projects");
});

//UPDATE express route

router.get("/edit", async(req,res) => {
    if (req.query.projectId) {
        const projectToEdit = await model.getSingleProject(req.query.projectId);
        const linkList = await links.getLinks();
        res.render("admin/projects/project-edit", {title: "Edit project", links:linkList, editProject: projectToEdit});
    } else {
        res.redirect("/admin/projects");
    };
});

//edit form submit router
router.post("/edit/submit", async (req,res) => {
    const idFinder = { _id: new ObjectId(req.body.projectId)};
    const slug = req.body.name.toLowerCase().trim().replace(/\s+/g, "-");
    
    const project = {
        name: req.body.name,
        slug:slug,
        description: req.body.description,
        technologies: req.body.technologies,

    };
    await model.editProject(idFinder, project);
    res.redirect("/admin/projects");
});



export default router; // Export the router to use it in other files
