const Todo = require('./Todo');

let nextTodoId = 1;
const todos = {};

const getAll = (req, res) => {
    res.json(todos);
}

const getById = (req, res) => {
    const id = req.params.id;

    if (!todos[id]) {
        return res.status(404).json({
            errors: [`Todo not found for the passed id '${id}'.`]
        })
    }

    res.json(todos[id]);
}

const create = async (req, res) => {
    console.log("Req user", req.user)
    const todo = new Todo(req.body);

    if (!await todo.isValid()) {
        return res.status(400).json({
            errors: todo.errors
        })
    }

    todos[nextTodoId] = todo.values;
    nextTodoId++;
    res.status(201).json();
}

const deleteById = (req, res) => {
    const id = req.params.id;

    if (!todos[id]) {
        return res.status(404).json({
            errors: [`Todo not found for the passed id '${id}'.`]
        })
    }

    delete todos[id];
    res.status(200).json();
}

const updateById = async (req, res) => {
    const id = req.params.id;

    if (!todos[id]) {
        return res.status(404).json({
            errors: [`Todo not found for the passed id '${id}'.`]
        })
    }

    const todo = new Todo(req.body);

    if (!await todo.isValid()) {
        return res.status(400).json({
            errors: todo.errors
        })
    }

    todos[id] = todo.values;
    res.status(200).json();
}

module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    updateById
}