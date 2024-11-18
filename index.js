const express = require('express');
const app = express();

let tasks = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Список задач</title>
    </head>
    <body>
      <h1>Список задач</h1>
      <ul id="taskList">
        ${tasks
          .map(
            (task, index) =>
              `<li>${task} <form method="POST" action="/delete/${index}"><button type="submit">Удалить</button></form></li>`
          )
          .join('')}
      </ul>

      <h2>Добавить задачу</h2>
      <form method="POST" action="/add">
        <input type="text" name="task" placeholder="Введите задачу">
        <button type="submit">Добавить</button>
      </form>
    </body>
    </html>
  `);
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push(task);
  }
  res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
