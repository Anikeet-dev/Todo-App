const todoForm = document.querySelector("#todo-form");
const todoName = document.querySelector("#todo-text");
const discription = document.querySelector("#discription-text");
const addTodo = document.querySelector("#add-todo");
const todoRemaining = document.querySelector("#todo-list");
const todoDone = document.querySelector("#todo-list-done");

todoForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if (todoName.value === '') {
        alert('Please enter fields!');
    } else {
        const todoDetails = {
            todoName: todoName.value,
            discription: discription.value,
        };

        axios.post("https://crudcrud.com/api/34e463c5fa8a4044ad9a2b24526b31fa/todoData", todoDetails)
            .then((response) => {
                const responseData = response.data;
                const todo = document.createElement('li');

                todo.innerHTML = responseData.todoName + ' - ' +
                    responseData.discription;

                    markTodoDone(todo);
                todoRemaining.appendChild(todo);

                clearInputs();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/34e463c5fa8a4044ad9a2b24526b31fa/todoData")
        .then((response) => {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                showTodos(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

function markTodoDone(todo) {
    const completedButton = document.createElement('button');
    completedButton.textContent = 'Done';
    completedButton.addEventListener('click', () => {
      
        todoRemaining.removeChild(todo);
        todoDone.appendChild(todo);
    });

    todo.appendChild(completedButton);
}


function showTodos(todoItemData) {
    const todoItem = document.createElement('li');
    const userElement = document.createElement('span');
    userElement.textContent = 
        todoItemData.todoName + ' - ' +
        todoItemData.discription;

    const markDoneButton = document.createElement('button');
    markDoneButton.textContent = 'Mark as Done';

 
    markDoneButton.addEventListener('click', () => {
  
        todoRemaining.removeChild(todoItem);
        todoDone.appendChild(todoItem);
    });


    todoItem.appendChild(userElement);
    todoItem.appendChild(markDoneButton);

    todoRemaining.appendChild(todoItem);
}



function clearInputs() {
    todoName.value = '';
    discription.value = '';
}
