'use strict';

function onInit() {
    console.log('Hi');
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    var strHTMLs = '';
    if (todos.length === 0) {
        switch (gFilterBy) {
            case 'all':
                strHTMLs += 'No Todos';
                break;
            case 'active':
                strHTMLs += 'No Active Todos';
                break;
            case 'done':
                strHTMLs += 'No Done Todos';
                break;
            default:
                break;
        }
        document.querySelector('.todo-list').innerHTML = strHTMLs;
    } else {
        strHTMLs = todos.map(function (todo) {
            var className = (todo.isDone) ? 'done' : '';
            return `<li class="${className}" onclick="onToggleTodo('${todo.id}')">
                        ${todo.txt}
                        <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
                    </li>`
        })
        document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    }
    // console.log('strHTMLs', strHTMLs)
    document.querySelector('.total-todos').innerText = getTodosCount();
    document.querySelector('.active-todos').innerText = getActiveTodosCount();
}

function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
    var isConfirm = confirm('are you sure you want to delete?')
    if (isConfirm) {
        removeTodo(todoId);
        renderTodos();
    }
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos();
}

function onAddTodo(ev) {
    ev.preventDefault();
    var elTodoTxt = document.querySelector('input[name=todoTxt]');
    var txt = elTodoTxt.value;
    if (txt === '') return alert('you most to put add todo');
    var elTodoImportance = document.querySelector('select[name=importance]');
    var importance = elTodoImportance.value;
    console.log(`Adding todo: ${txt} and importance are ${importance}`);
    addTodo(txt, importance);
    elTodoTxt.value = ''
    elTodoImportance.value = 1;
    renderTodos();
}

function onSetFilter(ev) {
    ev.stopPropagation();
    var elFilterBy = document.querySelector('select[name=filterBy]');
    var filterBy = elFilterBy.value;
    console.log('Filtering by', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSoryBy(ev) {
    ev.stopPropagation();
    var elSortBy = document.querySelector('select[name=SoryBy]');
    var sotyBy = elSortBy.value;
    console.log('sortingby', sotyBy);
    setSort(sotyBy);
    renderTodos();
}