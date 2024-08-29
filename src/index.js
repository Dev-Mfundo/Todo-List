import "./styles.css";

class TodoItem {
    constructor(title, description, notes, dueDate, priority) {
            this.title = title,
            this.description = description,
            this.notes = notes,
            this.dueDate = dueDate,
            this.priority = priority
    }
}
const title = prompt("Title?");
const description = prompt("Description?");
const notes = prompt("notes?");
const dueDate = prompt("due?");
const priority = prompt("priority?");
const item = new TodoItem(title, description, notes, dueDate, priority);

const toDoItems=[];

const addItem=(()=>{
    toDoItems.unshift({item})
})();
console.log(toDoItems);
const projectsToDo=[];


//function to add selected projects to projectsToDo[].
//Add local storage. 
//Project function to make a project then add toDo items later.
//due date should count using a calender date and time and minus the difference and be able to say due in "what day and time".
