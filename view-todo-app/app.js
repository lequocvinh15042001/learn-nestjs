const API_URL = 'http://localhost:3000/todos';

// Load danh sách todos
async function loadTodos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

// Tạo mới todo
async function createTodo(title) {
  try {
    const newTodo = { id: Date.now(), title: title, completed: false };
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    if (response.ok) {
      loadTodos();
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error creating todo:', error);
  }
}

// Xóa todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            loadTodos();  // Cập nhật lại danh sách todos sau khi xóa
        } else {
            throw new Error(`Failed to delete todo with id ${id}`);
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Hiển thị danh sách todos
function renderTodos(todos) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';  // Xóa danh sách cũ

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = `${todo.title} - ${todo.completed ? 'Completed' : 'Not Completed'}`;
    
    // Tạo nút xóa
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTodo(todo.id);  // Gọi hàm xóa khi nhấn nút

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// Lắng nghe sự kiện thêm todo từ form
document.getElementById('todo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('todo-title').value;
  createTodo(title);
});

loadTodos();  // Tải todos khi trang web được tải
