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
            <h2>${project.name}</h2>
            <p><strong>Description:</strong> ${project.description}</p>
            <p><strong>Start Date:</strong> ${project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</p>
            <p><strong>End Date:</strong> ${project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Project Status:</strong> ${project.projectStatus}</p>
            <h3>Team:</h3>
            <ul>
            <li><strong>Team Leader:</strong> ${project.team.teamLeader.firstName} ${project.team.teamLeader.lastName}</li>
            <li><strong>Members:</strong>
                <ul>
                    ${project.team.members.map(member => `<li>${member.firstName} ${member.lastName}</li>`).join('')}
                </ul>
            </li>
        </ul>
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