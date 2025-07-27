
//Handle form submit

const form = document.getElementById('todo-form')
const input = document.getElementById('todo-input')
const list = document.getElementById('todo-list')

//Step 1 : Add task
form.addEventListener('submit',function (e){
    debugger

    e.preventDefault() // stops the default behavior of the form, stop from reload

    const task = input.value.trim();
    if(task === '') return; // If the input is empty (after trimming), the function just stops (returns nothing).

    addTask(task)
    input.value = '';
})

//Stpe 2 : create task item

function addTask(text) {
    debugger
    const li = document.createElement('li');

    // Create a span for text so we don't lose it
    const span = document.createElement('span');
    span.textContent = text;

    // ✅ Done button
    const doneBtn = document.createElement('button');
    doneBtn.textContent = '✅';

    doneBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌'

    deleteBtn.addEventListener('click',()=> {
        li.remove()
        saveTasks();
    })

    li.addEventListener('click',() =>{
        debugger
        li.classList.toggle('completed')
        saveTasks();
    })
    // Append both span and button to li
    li.append(span, deleteBtn);
    list.appendChild(li);

    saveTasks();
}

//✅ Step 5: Save to localStorage
function saveTasks() {
    debugger

    const tasks = [];
    list.querySelectorAll('li').forEach((li) => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed'),
        });
    });
    console.log(tasks)
    localStorage.setItem('todos', JSON.stringify(tasks));
}

function loadTasks() {
    debugger
    const saved = JSON.parse(localStorage.getItem('todos')) || [];
    saved.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', () => {
            debugger
            li.remove();
            saveTasks();
        });

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

loadTasks();
