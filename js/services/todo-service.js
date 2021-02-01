'use strict';

const STORAGE_KEY = 'todosDB';
var gTodos;
var gFilterBy = 'all';
var gSoryBy = 'created'

_createTodos();


function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSoryBy = sortBy;
    if (gSoryBy === 'created') {
        gTodos.sort(function (a, b) {
            return b.createdAt - a.createdAt
        })
    } else if (gSoryBy === 'txt') {
        gTodos.sort(function (a, b) {
            var textA = a.txt.toLowerCase(), textB = b.txt.toLowerCase();
            if (textA < textB) return -1;
            if (textA > textB) return 1;
            return 0;
        })
    } else if (gSoryBy === 'importance') {
        gTodos.sort(function (a, b) {
            if (a.importance < b.importance) return -1;
            if (a.importance > b.importance) return 1;
            return 0;
        })
    }
}

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos;
    var todos = gTodos.filter(function (todo) {
        return (gFilterBy === 'done' && todo.isDone) ||
            (gFilterBy === 'active' && !todo.isDone)
    })
    return todos;
}

function removeTodo(todoId) {
    console.log('Removing Todo', todoId);
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    console.log('Toggling Todo', todoId);

    var todoToToggle = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todoToToggle.isDone = !todoToToggle.isDone
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    var todo = _createTodo(txt, importance)
    gTodos.unshift(todo);
    _saveTodosToStorage();
}

function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}


// Those functions are private for this file only

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos || !todos.length) {
        todos = ['Learn CSS', 'Master HTML'].map(_createTodo);
        //diffrent way
        // todos = ['Learn CSS', 'Master HTML'].map(function(txt){
        //     return _createTodo(txt)
        // });
    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, importance) {
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: _makeTimeStamp(),
        importance: importance
    }
    return todo
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}

function _makeTimeStamp() {
    return Date.now();
}