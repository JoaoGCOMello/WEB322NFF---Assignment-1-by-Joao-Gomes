/********************************************************************************
*  WEB322 – Assignment 01
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Joao Gomes Carolino de Oliveira Mello. Student ID: 109307249 Date: 2025-10-03
*
********************************************************************************/


const projectData = require("./modules/projects");

const express = require("express");
const app = express();
// seeing as my 8080 port is not working for some reason, I used 3000
//under my professors instructions
const HTTP_PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Assignment 1: Joao Gomes Carolino de Oliveira Mello - 109307249");
});

app.get("/solutions/projects", (req, res) => {
    projectData.getAllProjects()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err));
});

app.get("/solutions/projects/id-demo", (req, res) => {
    projectData.getProjectById(9)
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
});

app.get("/solutions/projects/sector-demo", (req, res) => {
    projectData.getProjectsBySector("agriculture")
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
});

projectData.initialize()
    .then(() =>{
        app.listen(HTTP_PORT, () => {
            console.log('Listen to the port', HTTP_PORT)
        });    
    })
    .catch(err => {
        console.log("Failed to initialize project data:", err);
    });