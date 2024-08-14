document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const tableBody = document.querySelector('#todo-table tbody');

    // Функция для отображения всех дел
    function displayTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        tableBody.innerHTML = '';
        todos.forEach((todo, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${todo}</td>
                <td><button class="delete" data-index="${index}">Удалить</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Обработка отправки формы
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTodo = input.value.trim();
        if (newTodo) {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(todos));
            input.value = '';
            displayTodos();
        }
    });

    // Обработка удаления дела
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const index = event.target.getAttribute('data-index');
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        }
    });

    // Отображаем все дела при загрузке
    displayTodos();
});
