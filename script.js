document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const commonTaskDate = document.getElementById('commonTaskDate');
  const taskTime = document.getElementById('taskTime');
  const taskList = document.getElementById('taskList');
  const clearTasksBtn = document.getElementById('clearTasksBtn');
  const totalTasksSpan = document.getElementById('totalTasks');

  function updateTaskCount() {
    const totalTasks = document.querySelectorAll('.task').length;
    totalTasksSpan.textContent = totalTasks;
  }

  function isTaskAlreadyAdded(newTaskText) {
    const existingTasks = taskList.querySelectorAll('span.task-text');
    for (let task of existingTasks) {
      if (task.textContent === newTaskText) {
        return true;
      }
    }
    return false;
  }

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const taskDate = commonTaskDate.value;
    const taskTimeValue = taskTime.value;
    if (taskText !== '') {
      if (isTaskAlreadyAdded(taskText)) {
        alert('Task already exists in the list!');
      } else {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';
        taskItem.innerHTML = `
          <span class="task-text">${taskText}</span>
          <span class="task-time">Time: ${taskTimeValue}</span> <!-- Display time only -->
          <button class="delete-btn">Delete</button>
          <button class="edit-btn">Edit</button>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = '';
        updateTaskCount();
      }
    }
  });

  taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const taskItem = event.target.parentElement;
      taskList.removeChild(taskItem);
      updateTaskCount();
    }
  });

  clearTasksBtn.addEventListener('click', function() {
    taskList.innerHTML = '';
    updateTaskCount();
  });

  taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
      const taskItem = event.target.parentElement;
      const taskText = taskItem.querySelector('.task-text').textContent;
      const newText = prompt('Edit Task:', taskText);
      if (newText !== null) {
        taskItem.querySelector('.task-text').textContent = newText;
      }
    }
  });
});