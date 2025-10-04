const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize(){
    return new Promise((resolve, reject) =>{
        try {
            projects = [];

            projectData.forEach(proj => {
                const sectorMatch = sectorData.find(sec => sec.id === proj.sector_id);
                const sectorName = sectorMatch ? sectorMatch.sector_name : "Unknown";

                const projWithSector = {
                    ...proj,
                    sector: sectorName
                };
                
                projects.push(projWithSector);
            });
            resolve();
        } catch(err) {
            reject("Failed to initialize project data.");
        }
    });     
}

function getAllProjects(){
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects available. Call Initialize() first.")
        }
    });
}

function getProjectById(projectId){ //
    return new Promise((resolve, reject) => {
        const found = projects.find(proj => proj.id === projectId);
        if (found) {
            resolve(found);
        } else {
            reject(`Project with ID ${projectId} not found.`);
        }
    });
}

//
//return 

function getProjectsBySector(sector){
    return new Promise((resolve, reject) => {
        const lowerSector = sector.toLowerCase();
        const matches = projects.filter(proj => proj.sector.toLowerCase().includes(lowerSector));

        if (matches.length > 0) {
            resolve(matches);
        } else {
            reject(`No projects found for sector containing "${sector}".`);
        }
    });
}

module.exports = { 
    initialize, 
    getAllProjects, 
    getProjectById, 
    getProjectsBySector
};