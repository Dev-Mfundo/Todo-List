class TodoItem {
    constructor(title, description, notes, dueDate, dueTime, priority) {
        this.title = title;
        this.description = description;
        this.notes = notes;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.priority = priority;
    }
}

const calculateTimeLeft = (dueDate, dueTime) => {
    const now = new Date();
    const due = new Date(`${dueDate}T${dueTime}`);
    const timeDiff = due - now;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? `${daysLeft} days left` : "Past due";
};

const title = prompt("Enter the title of the task:");
const description = prompt("Enter the description of the task:");
const notes = prompt("Enter any notes:");
const dueDate = prompt("Enter the due date (YYYY-MM-DD):");
const dueTime = prompt("Enter the due time (HH:MM):");

const priorityOptions = ["high", "medium", "low"];
let priority;

do {
    priority = prompt(`Select priority: (${priorityOptions.join(", ")}):`);
} while (!priorityOptions.includes(priority.toLowerCase()));

const item = new TodoItem(
    title,
    description,
    notes,
    calculateTimeLeft(dueDate, dueTime),
    priority.toLowerCase()
);

const toDoItems = JSON.parse(localStorage.getItem('toDoItems')) || [];

toDoItems.unshift(item);

localStorage.setItem('toDoItems', JSON.stringify(toDoItems));


const savedItems = JSON.parse(localStorage.getItem('toDoItems')) || [];

console.log("Saved Items:", savedItems);

const projectsToDo = [];

const addProject = (projectName) => {
    projectsToDo.push({ name: projectName, items: [] });
};

const addItemToProject = (projectName, item) => {
    const project = projectsToDo.find((project) => project.name === projectName);
    if (project) {
        project.items.push(item);
    }
};

addProject('My First Project');
addItemToProject('My First Project', item);
console.log(projectsToDo);
