import "./styles.css";

const header = document.createElement('header');
header.id = 'header';
header.innerHTML = '<h1>Things-ToDo</h1>';
document.body.prepend(header);


const container = document.createElement('div');
container.id = 'todo-container';
document.body.appendChild(container);

const addButton = document.createElement('button');
addButton.textContent = 'Add Task';
addButton.id = 'add-task-button';
header.appendChild(addButton);

const modal = document.createElement('div');
modal.id = 'modal';
modal.style.display = 'none';
document.body.appendChild(modal);

modal.innerHTML = `
  <div id="form-container">
    <h2>Add New Task</h2>
    <form id="todo-form">
      <label>Title:</label>
      <input type="text" id="title" required><br>
      <label>Description:</label>
      <input type="text" id="description" required><br>
      <label>Notes:</label>
      <input type="text" id="notes"><br>
      <label>Due Date:</label>
      <input type="datetime-local" id="dueDate" required><br>
      <label>Priority:</label>
      <select id="priority">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select><br>
      <label>Project:</label>
      <input type="text" id="project"><br>
      <button type="submit">Add Task</button>
    </form>
  </div>
`;

addButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

const toDoItems = [];

document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const notes = document.getElementById('notes').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;
  const project = document.getElementById('project').value;

  const calculateTimeLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - now;

    if (timeDiff <= 0) {
      return "Past due";
    }

    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (daysLeft > 0) {
      return `${daysLeft} days left`;
    }

    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    if (hoursLeft > 0) {
      return `${hoursLeft} hours left`;
    }

    const minutesLeft = Math.floor(timeDiff / (1000 * 60));
    return `${minutesLeft} minutes left`;
  };

  const formatDate = (dueDate) => {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dueDate).toLocaleDateString(undefined, options);
  };

  const newItem = {
    title,
    description,
    notes,
    dueDate: calculateTimeLeft(dueDate),
    formattedDueDate: formatDate(dueDate),
    priority,
    project,
  };

  toDoItems.unshift(newItem);

  localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
  renderItems();

  modal.style.display = 'none';
  document.getElementById('todo-form').reset();
});

const renderItems = () => {
  container.innerHTML = '';
  toDoItems.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'todo-item';
    itemDiv.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p>Notes: ${item.notes}</p>
      <p>Due: ${item.formattedDueDate} (${item.dueDate})</p>
      <p>Priority: ${item.priority}</p>
      <p>Project: ${item.project}</p>
      <button class="remove-button" data-index="${index}">Remove</button>
    `;
    container.appendChild(itemDiv);
  });

  document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      toDoItems.splice(index, 1);
      localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
      renderItems();
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const savedItems = JSON.parse(localStorage.getItem('toDoItems')) || [];
  savedItems.forEach(item => toDoItems.push(item));
  renderItems();
});

const footer = document.createElement('footer');
footer.id = 'footer';
footer.innerHTML = '<p>Created by Dev Mfundo</p>';
document.body.appendChild(footer);
