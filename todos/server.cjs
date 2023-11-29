const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser')
const dayjs = require('dayjs')

app.use(bodyParser.json())

const tableData = [
  { id: 1, createDate: '2023-10-01', item: '寫vue期中作業', dueDate: '2023-11-01', status: 0 },
  { id: 2, createDate: '2023-10-02', item: 'vue開會1', dueDate: '2023-11-01', status: 0 },
  { id: 3, createDate: '2023-10-02', item: 'vue開會2', dueDate: '2023-11-01', status: 1 },
  { id: 4, createDate: '2023-10-02', item: 'vue開會3', dueDate: '2023-11-01', status: 0 },
  { id: 5, createDate: '2023-10-02', item: 'vue開會4', dueDate: '2023-11-01', status: 2 },
  { id: 6, createDate: '2023-10-02', item: 'vue開會5', dueDate: '2023-11-01', status: 0 }
]

const users = {
  '1': { id: 1, name: 'Sharon', birthday: '2023-01-01', gender: 'female', password: '123', email: '1' }
}

const authenticate = function (req, res, next) {
  console.log('headers:', req.headers.authorization);
  const token = req.headers.authorization
  if (token === "Bearer 123") {
    req.user = Object.assign({}, users['1']);
    console.log('authenticate:', req.user)
    next()
    return
  }
  res.send({ code: 1 })
}

app.use((req, res, next) => {
  console.log('----')
  console.log(req.path)
  console.log(req.body)
  console.log('----')

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  next();
})

app.get('/todos', (req, res) => {
  res.send(tableData)
})

app.post('/todo', (req, res) => {
  const todo = req.body;
  todo.id = todo.id || (tableData.length > 0 ? tableData[tableData.length - 1].id + 1 : 1);
  todo.createDate = todo.createDate || dayjs().format('YYYY-MM-DD');
  todo.dueDate = dayjs(todo.dueDate).format('YYYY-MM-DD')
  todo.status = todo.status || 0
  console.log('id', todo.id)
  const index = tableData.findIndex(e => e.id === todo.id)

  if (index >= 0) {
    tableData.splice(index, 1, todo)
  } else {
    tableData.push(todo);
  }
  res.status(200).send(tableData);
})

app.put('/todo', (req, res) => {
  const todo = req.body;
  const index = todo.id - 1;
  tableData[index].createDate = todo.createDate;
  tableData[index].item = todo.item;
  tableData[index].dueDate = todo.dueDate;
  tableData[index].status = todo.status;
  res.status(200).send(tableData);
})

app.delete('/todo/:index', (req, res) => {
  const { index } = req.params;
  tableData.splice(index, 1);
  res.status(200).send(tableData);
})

app.post('/signUp', (req, res) => {
  console.log('I am signUp')
  const form = req.body;
  console.log('form', form)
  res.status(200).send('success')
})

app.post('/signIn', (req, res) => {
  console.log('I am signIn', req.body)
  const { email, password } = req.body;
  const user = Object.assign({}, users[email]);
  console.log(user, user.password)
  if (user && user.password === password) {
    delete user.password
    res.status(200).send({ code: 0, jwt: "123", user, msg: 'SUCCESS' })
    return
  }
  res.status(200).send({ code: 1, msg: 'Failure' })
})

app.post('/authToken', authenticate, (req, res) => {
  res.status(200).send({ code: 0, user: { name: req.user.name } })
})

app.get('/user', authenticate, (req, res) => {
  const user = {}
  user.name = req.user.name
  user.email = req.user.email
  user.birthday = req.user.birthday
  user.gender = req.user.gender
  console.log("get user", user)
  res.status(200).send({ code: 0, user })
})

app.post('/user', authenticate, (req, res) => {
  const newSetting = req.body;
  users[req.user.email].name = newSetting.name
  users[req.user.email].birthday = newSetting.birthday
  users[req.user.email].gender = newSetting.gender

  const user = Object.assign({}, users[req.user.email])
  delete user.password

  console.log("post user", user)
  res.status(200).send({ code: 0, user })
})

app.listen(port, () => {
  console.log(`this is listening on http://localhost:${port}`)
})