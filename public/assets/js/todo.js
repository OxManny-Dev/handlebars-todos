const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');

addTodoBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  if (todoInput.value.trim().length === 0) {
    alert('Todo must not be empty');
    return;
  }

  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: todoInput.value,
      })
    });

    await response.json();
    window.location.reload();
  } catch (error) {
    alert(error);
  }


});