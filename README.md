## Run Locally

Clone the project

```bash
  git clone https://github.com/xzodus000/my-demo-node-express.git
```

Go to the project directory

```bash
  cd my-demo-node-express
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```

Postman Test cURL

List To do list

```bash
curl --location 'http://localhost:3000/to-do/tasks' \
--header 'Content-Type: application/json'
```

Add Task to do

```bash
curl --location 'http://localhost:3000/to-do/tasks' \
--header 'Content-Type: application/json' \
--data '{"title": "Sample Task", "desc": "Description for the task"}'
```

Update Task to do

```bash
curl --location --request PUT 'http://localhost:3000/to-do/tasks/1' \
--header 'Content-Type: application/json' \
--data '{"title": "Updated Task Title", "desc": "Updated description", "completed": true}'
```

Delete Task to do

```bash
curl --location --request DELETE 'http://localhost:3000/to-do/tasks/1'
```
# dexian-test-node-express
