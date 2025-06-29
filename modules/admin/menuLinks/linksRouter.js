import express from "express";
const router = express.Router();

import model from "./linksFunctions.js";

router.get("/" , async(request,response) => {
    let linkList = await model.getLinks();
    response.render("admin/admin-home.pug", {title: "Admin Dashboard",links: linkList});
    });
export default router;