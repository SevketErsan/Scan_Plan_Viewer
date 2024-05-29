import {IProject, ProjectStatus, UserRole} from "./classes/Project"
import { ProjectsManager } from "./classes/ProjectsManager"

function toggleModal(id:string){
    const modal = document.getElementById(id)
    if(modal && modal instanceof HTMLDialogElement) {
        if (modal.open)
            {modal.close()} else modal.showModal()
        
    } else{
        console.warn("The provided modal wasn't found. ID: ", id)
    } 
}


const projectsListUI = document.getElementById("projects-list") as HTMLElement
const projectsManager = new ProjectsManager(projectsListUI)

// Get the New Project Form

const newProjectBtn = document.getElementById("new-project-btn")
if(newProjectBtn){
    newProjectBtn.addEventListener("click", () => {toggleModal("new-project-modal")})
} else {
    console.warn("New projects button was not found")
}

// Get the Form Data

const projectForm = document.getElementById("new-project-form")
const cancelBtn = document.getElementById("cancel-project-btn")

if(projectForm && projectForm instanceof HTMLFormElement){
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(projectForm)
        const projectData:IProject = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            status: formData.get("status") as ProjectStatus,
            userRole: formData.get("userRole") as UserRole,
            finishDate: new Date(formData.get("finishDate") as string),
        }
        try{
            const project = projectsManager.newProject(projectData)
            projectForm.reset()
            toggleModal("new-project-modal")    
        } catch(error){
            alert(error)
        }

    })

    // Cancel Button

    if(cancelBtn){
        cancelBtn.addEventListener("click", () => {
            projectForm.reset()
            toggleModal("new-project-modal")
        })
    }
} else {
    console.warn("The project form was not found. Check the ID!")
}

//Export Project Button

const exportProjectBtn = document.getElementById("export-projects-btn")
if(exportProjectBtn) {
    exportProjectBtn.addEventListener("click", () => {
        projectsManager.exportToJSON()
    })
}

//Import Project Button

const importProjectBtn = document.getElementById("import-projects-btn")
if(importProjectBtn){
    importProjectBtn.addEventListener("click", () => {
        projectsManager.importFromJSON()
    })
}


// Projects/Home Button

const projectsBtn = document.getElementById("project-button") 
if(projectsBtn) {
    projectsBtn.addEventListener("click", () => {
        const projectsPage = document.getElementById("projects-page") as HTMLDivElement
        const detailsPage = document.getElementById("project-details") as HTMLDivElement
        projectsPage.style.display = "flex"
        detailsPage.style.display = "none"

    })
}