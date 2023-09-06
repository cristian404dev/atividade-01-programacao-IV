const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(express.json())

const tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/addTask', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
  }
  res.redirect('/');
});

app.post('/deleteTask', (req, res) => {
  const { taskIndex } = req.body;
  if (taskIndex >= 0 && taskIndex < tasks.length) {
    tasks.splice(taskIndex, 1);
  }
  res.redirect('/')
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
