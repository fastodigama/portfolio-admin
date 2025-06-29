
import express from "express"; // Import Express framework
const router = express.Router(); // Create a router to define admin routes
import { ObjectId } from "mongodb";

import model from "./skillsFunctions.js"; //import the exported functions
import links from "../menuLinks/linksFunctions.js" //import the links from links function (getLinks)
import { title } from "process";
//configure route for project admin page



router.get("/", async (req , res) => {
    const skillList = await model.getSkills();
    const linkList = await links.getLinks();
    res.render("admin/admin-skills.pug", {title: "Manage Skills",
        skills: skillList , links : linkList
    });
});


// add new skill

//get menu links first
router.get("/add", async (req , res) => {
     const linkList = await links.getLinks();
     res.render("admin/skills/skill-add.pug", {title:"Add Skill",links: linkList});
});

//skill add submit form

router.post("/add/submit", async (req, res) => {

    const newSkill = {
        name: req.body.name,
        level: req.body.level,
        category: req.body.category
        
    };
    await model.addSkill(newSkill);
    res.redirect("/admin/skills")
});

//Delete skill
router.get("/delete", async (req,res) => {
    await model.deleteSkill(req.query.skillId);
    res.redirect("/admin/skills");
});

router.post("/update", async (req,res) =>{
    await model.updateSkill(req.body.skillId)
});

//Update skill

//UPDATE skill express route

router.get("/edit", async(req,res) => {
    if (req.query.skillId) {
        const skillToEdit = await model.getSingleSkill(req.query.skillId);
        const linkList = await links.getLinks();
        res.render("admin/skills/skill-edit", {title: "Edit skill", links:linkList, editSkill: skillToEdit});
    } else {
        res.redirect("/admin/skills");
    };
});

//edit form submit router
router.post("/edit/submit", async (req,res) => {
    const idFinder = { _id: new ObjectId(req.body.skillId)};
   
    
    const skill = {
        name: req.body.name,
        level:req.body.level,
        category:req.body.category
    };
    await model.editSkill(idFinder, skill);
    res.redirect("/admin/skills");
});


export default router; // Export the router to use it in other files
