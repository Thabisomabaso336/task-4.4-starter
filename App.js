let tasks = [];
    function addTask() {
      const input = document.getElementById("taskInput");
      const text = input.value.trim();
      if (!text) return alert("Enter a task!");
      const task = { text, done: false };
      tasks.push(task);
      input.value = "";
      render();
    }
    function toggleDone(index) {
      tasks[index].done = !tasks[index].done;
      render();
    }
    function deleteTask(index) {
      tasks.splice(index, 1);
      render();
    }
    function render() {
      const list = document.getElementById("taskList");
      list.innerHTML = "";
      tasks.forEach((task, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleDone(${i})">
          <span style="text-decoration:${task.done ? 'line-through' : 'none'}">${task.text}</span>
          <button onclick="deleteTask(${i})">X</button>
        `;
        list.appendChild(li);
      });
      document.getElementById("counter").textContent =
        "Tasks remaining: " + tasks.filter(t => !t.done).length;
    }