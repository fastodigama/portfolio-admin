import "dotenv/config" // automatically loads environment variables and make it available throughout the app

import express from "express"; // 
import path from "path"; //

const __dirname = import.meta.dirname; 

//Page routes

import adminDashboard from "./modules/admin/menuLinks/linksRouter.js"
import projectsRouter from "./modules/admin/projects/projectsRouter.js";
import skillsRouter from "./modules/admin/skills/skillsRouter.js";


//create an express application
const app = express();
const port = process.env.PORT;


// Let Express read data sent from HTML forms
app.use(express.urlencoded({extended:true}));
// Allow reading JSON data sent by other API requests
app.use(express.json());


//configure the views and path
app.set("views", path.join(__dirname,"views"));
//setup the view engine
app.set("view engine", "pug");

//setup access to static files like css, js, and img
app.use(express.static(path.join(__dirname,"public")));

//assigning a base URL path
app.use("/", adminDashboard);
app.use("/admin/dashboard", adminDashboard);
app.use("/admin/projects", projectsRouter);
app.use("/admin/skills",skillsRouter);


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`); //to show the url on the node.js log 
});


