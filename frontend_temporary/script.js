// Fetch projects from the API
const fetchProjects = async () => {
    try {
        const response = await fetch('/api/projects/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects: ', error);
        return [];
    }
};

// Render projects in the DOM
const renderProjects = projects => {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p>${project.projectStatus}</p>
        `;
        projectsContainer.appendChild(projectElement);
    });
};

// Display projects
const displayProjects = async () => {
    try {
        const projects = await fetchProjects();
        renderProjects(projects);
    } catch (error) {
        console.error('Error displaying projects: ', error);
    }
};

document.addEventListener('DOMContentLoaded', displayProjects);