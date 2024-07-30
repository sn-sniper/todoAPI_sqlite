const { db } = require('../database/data');

const getAllTodos = (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM todos');
        const todos = stmt.all();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching todos' });
    }
};

const getTodoById = (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
        const todo = stmt.get(id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching todo' });
    }
};

const createTodo = (req, res) => {
    const { title, content } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO todos (title, content) VALUES (?, ?)');
        const result = stmt.run(title, content);
        res.status(201).json({ id: result.lastInsertRowid, title, content });
    } catch (error) {
        res.status(500).json({ error: 'Error creating todo' });
    }
};

const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const stmt = db.prepare('UPDATE todos SET title = ?, content = ? WHERE id = ?');
        const result = stmt.run(title, content, id);
        if (result.changes) {
            res.json({ id, title, content });
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating todo' });
    }
};

const deleteTodo = (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
        const result = stmt.run(id);
        if (result.changes) {
            res.json({ message: 'Todo deleted' });
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting todo' });
    }
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};
