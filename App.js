// Mini Task Tracker -
        let tasks = [];
        let taskIdCounter = 1;
        function initializeApp() {
            const root = document.getElementById('root');
            const appContainer = document.createElement('div');
            appContainer.className = 'task-tracker';
            appContainer.style.cssText = `
                max-width: 500px;
                margin: 20px auto;
                padding: 20px;
                font-family: Arial, sans-serif;
                background: #3547ebff;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            `;
            // Create and add the title
            const title = document.createElement('h1');
            title.textContent = 'Mini Task Tracker';
            title.style.cssText = `
                text-align: center;
                color: #cdddecff;
                margin-bottom: 20px;
                font-size: 24px;
                font-weight: bold;
            `;
            // Create the input section (input + button)
            const inputSection = createInputSection();
            // Create the task counter display
            const taskCounter = createTaskCounter();
            // Create the task list container
            const taskList = createTaskList();
            // Add all elements to our main container
            appContainer.appendChild(title);
            appContainer.appendChild(inputSection);
            appContainer.appendChild(taskCounter);
            appContainer.appendChild(taskList);
            // Add the main container to the root
            root.appendChild(appContainer);
        }
        // Creates the input field and add button
        function createInputSection() {
            const inputSection = document.createElement('div');
            inputSection.style.cssText = `
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
            `;
            // Create the input field
            const taskInput = document.createElement('input');
            taskInput.type = 'text';
            taskInput.id = 'taskInput';
            taskInput.placeholder = 'Enter a new task...';
            taskInput.style.cssText = `
                flex: 1;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 5px;
                font-size: 16px;
            `;
            // Create the add button
            const addButton = document.createElement('button');
            addButton.textContent = 'Add Task';
            addButton.style.cssText = `
                padding: 12px 20px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            `;
            // Add hover effect to button
            addButton.addEventListener('mouseenter', () => {
                addButton.style.background = '#45a049';
            });
            addButton.addEventListener('mouseleave', () => {
                addButton.style.background = '#4caf50';
            });
            // Add click event to button
            addButton.addEventListener('click', addTask);
            // Allow Enter key to add task
            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
            inputSection.appendChild(taskInput);
            inputSection.appendChild(addButton);
            return inputSection;
        }
        // Creates the task counter display
        function createTaskCounter() {
            const counter = document.createElement('div');
            counter.id = 'taskCounter';
            counter.style.cssText = `
                text-align: center;
                margin-bottom: 20px;
                padding: 10px;
                background: #141414ff;
                border-radius: 5px;
                font-weight: bold;
                color: #cdddecff;
            `;
            counter.textContent = 'Tasks remaining: 0';
            return counter;
        }
        // Creates the task list container
        function createTaskList() {
            const taskList = document.createElement('ul');
            taskList.id = 'taskList';
            taskList.style.cssText = `
                list-style: none;
                padding: 0;
                margin: 0;
            `;
            return taskList;
        }
        // Adds a new task to our tracker
        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskText = taskInput.value.trim();
            // Prevent adding empty tasks
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
            // Create new task object
            const newTask = {
                id: taskIdCounter++,
                text: taskText,
                completed: false
            };
            // Add to our tasks array
            tasks.push(newTask);
            // Clear the input field
            taskInput.value = '';
            // Update the display
            renderTasks();
            updateTaskCounter();
        }
        // Renders all tasks in the list
        function renderTasks() {
            const taskList = document.getElementById('taskList');
            // Clear existing tasks
            taskList.innerHTML = '';
            // Create list item for each task
            tasks.forEach(task => {
                const taskItem = createTaskItem(task);
                taskList.appendChild(taskItem);
            });
        }
        // Creates a single task item element
        function createTaskItem(task) {
            const listItem = document.createElement('li');
            listItem.style.cssText = `
                display: flex;
                align-items: center;
                padding: 12px;
                margin-bottom: 8px;
                background: white;
                border-radius: 5px;
                border: 1px solid #ddd;
            `;
            // Create checkbox for marking complete
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.style.cssText = `
                margin-right: 12px;
                transform: scale(1.2);
            `;
            // Add event listener to checkbox
            checkbox.addEventListener('change', () => {
                toggleTaskComplete(task.id);
            });
            // Create task text element
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.style.cssText = `
                flex: 1;
                font-size: 16px;
                ${task.completed ? 'text-decoration: line-through; color: #888;' : 'color: #333;'}
            `;
            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.cssText = `
                padding: 6px 12px;
                background: #f44336;
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                font-size: 14px;
            `;
            // Add hover effect to delete button
            deleteButton.addEventListener('mouseenter', () => {
                deleteButton.style.background = '#d32f2f';
            });
            deleteButton.addEventListener('mouseleave', () => {
                deleteButton.style.background = '#f44336';
            });
            // Add click event to delete button
            deleteButton.addEventListener('click', () => {
                deleteTask(task.id);
            });
            // Add all elements to list item
            listItem.appendChild(checkbox);
            listItem.appendChild(taskText);
            listItem.appendChild(deleteButton);
            return listItem;
        }
        // Toggles the completed status of a task
        function toggleTaskComplete(taskId) {
            // Find the task and toggle its completed status
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
                updateTaskCounter();
            }
        }
        // Deletes a task from the list
        function deleteTask(taskId) {
            // Remove task from array
            tasks = tasks.filter(task => task.id !== taskId);
            // Update the display
            renderTasks();
            updateTaskCounter();
        }
        // Updates the task counter display
        function updateTaskCounter() {
            const counter = document.getElementById('taskCounter');
            const remainingTasks = tasks.filter(task => !task.completed).length;
            counter.textContent = `Tasks remaining: ${remainingTasks}`;
            // Change color based on remaining tasks
            if (remainingTasks === 0 && tasks.length > 0) {
                counter.style.cssText += 'background: #c8e6c9; color: #2e7d32;';
                counter.textContent = 'Ekse braa🎉 All tasks completed!';
            } else {
                counter.style.cssText += 'background: #e3f2fd; color: #1976d2;';
            }
        }
        // Initialize the app when the page loads
        document.addEventListener('DOMContentLoaded', initializeApp);
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp);
        } else {
            initializeApp();
        }
