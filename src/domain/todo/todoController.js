let nextTodoId = 1;
const todos = {};

const getAll = (req, res) => {
    res.json(todos);
}

const getById = (req, res) => {
    res.json(todos[req.params.id]);
}

const create = (req, res) => {
    todos[nextTodoId] = req.body
    nextTodoId++;
    res.status(201).json();
}

const deleteById = (req, res) => {
    delete todos[req.params.id];
    res.status(200).json();
}

const updateById = (req, res) => {
    todos[req.params.id] = req.body;
    res.status(200).json();
}

module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    updateById
}