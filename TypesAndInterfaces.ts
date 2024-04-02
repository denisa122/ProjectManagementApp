
type Project = {
    title: string,
    progress: string,
    projectManager: string,
    collaborators?: User[]
}  // maybe status?

type Task = {
    title: string,
    assignedTo: string,
    status: string,
    priority: string,  // or maybe number instead
    complexity: string   // or maybe number instead

}

type Team = {
    name: string,    // or maybe number instead of name
    members: User[]
}

type User = {
    username: string,
    password: string,
    firstName: string,
    lastName: string
}

type Department = {  // do i really need it if i have team as well? or maybe just add department to the user instead
    title: string
}
