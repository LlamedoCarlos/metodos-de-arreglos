// Lista inicial de tareas
let tasks = [
    { id: 16, description: "Hacer mercado", completed: true },
    { id: 60, description: "Estudiar para la prueba", completed: false },
    { id: 24, description: "Sacar a pasear a Tobby", completed: false },
  ];
  
  // Inicializamos un contador global a partir del último ID existente
  let taskIdCounter = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  
  // Elementos del DOM
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const totalTasks = document.getElementById("totalTasks");
  const completedTasks = document.getElementById("completedTasks");
  
  // Renderizar tareas
  function renderTasks() {
    taskList.innerHTML = ""; // Limpiar lista
    tasks.forEach(task => {
      const row = document.createElement("tr");
      row.className = task.completed ? "completed" : "";
  
      // Celda de ID
      const idCell = document.createElement("td");
      idCell.textContent = task.id;
  
      // Celda de descripción
      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = task.description;
  
      // Celda de acciones (checkbox y botón eliminar)
      const actionsCell = document.createElement("td");
      actionsCell.className = "actions";
      actionsCell.innerHTML = `
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} 
          onclick="toggleTaskState(${task.id})">
        <span class="delete-btn" onclick="deleteTask(${task.id})">&times;</span>
      `;
  
      // Agregar celdas a la fila
      row.appendChild(idCell);
      row.appendChild(descriptionCell);
      row.appendChild(actionsCell);
      taskList.appendChild(row);
    });
    updateSummary();
  }
  
  // Actualiza el resumen de tareas
  function updateSummary() {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(t => t.completed).length;
  }
  
  // Agrega una nueva tarea
  addTaskButton.addEventListener("click", () => {
    const description = taskInput.value.trim();
    if (description === "") return;
  
    const newTask = {
      id: taskIdCounter++, // Usamos el contador y lo incrementamos
      description: description,
      completed: false
    };
  
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  });
  
  // Cambia el estado de una tarea
  function toggleTaskState(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      renderTasks();
    }
  }
  
  // Elimina una tarea
  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
  }
  
  // Renderiza las tareas iniciales
  renderTasks();