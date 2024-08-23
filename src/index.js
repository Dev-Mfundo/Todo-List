import "./styles.css";

class AddTodoItem {
    constructor(title, description, notes, dueDate, priority) {
            this.title = title,
            this.description = description,
            this.notes,
            this.dueDate = dueDate,
            this.priority = priority
    }
}
const item1 = new AddTodoItem("Shopping","Groceries","Something to sustain myself with","today","High");
console.log(item1.title);
const toDoItems=[];
const projectsToDo=[];

//function to add items to toDoitems[].
//function to add selected projects to projectsToDo[].
//Add local storage.
//Project function to make a project then add toDo items later.
//due date should count using a calender date and time and minus the difference and be able to say due in "what day and time".