/* 

Todo CLI
Write an interactive CLI todo list application using Node's readline and fs modules. The following describes what each action does. It would be best to implement each action as its own function.

The Menu
When the todoCLI.js is first executed, a menu as shown below should be displayed. These are all the options the user should be able to perform.

View
From the Todo Menu, pressing v then Enter should display the contents of the todo list then the Todo Menu again. See the example below.

Add
From the Todo Menu pressing n then Enter should ask the user what item to add to the list. The user can then write a response. Save their response as a new item at the end of the todo list.

Complete
From the Todo Menu pressing cX where X refers to the index of a Todo item then Enter should mark that item as complete. Tell the user which item was marked. Then, re-display the Todo Menu.

When displaying the list, completed items should have a checkmark (i.e. `✓`) besides their title. For example:

Delete
From the Todo Menu pressing dX where X refers to the index of a Todo item then `Enter` should remove that from the list. Tell the user which item was deleted. Then, re-display the Todo Menu.

Quit
From the Todo Menu pressing q quits the application. Say farewell.

All Together
As a complete example, here's an interaction with the application using all possible actions.

Stretch
Open File
Add support to load a todo list from a JSON file as an argument. The application must still work if its not given a file as an argument.

To process JSON files, you'll have to read them with fs.readFile then you'll have to convert the file's data into a JavaScript data structure with

JSON.parse.

A [sample todo](https://certifiedin.s3.amazonaws.com/uploads/attachment/file/2182/myTodos.json) file has been provided as an example. However, its contents may not be structured in the same way as your previous code.

Save File
Add the ability to save a file. Create a new menu item. Here's an example interaction with the new menu item:

*/

// Require dependancies

const fs = require('fs');
const { hostname } = require('os');
const readLine = require('readline');

// Stretch #1
const fileName = process.argv[2];

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const home = `
Welcome to Todo CLI!

----------------------`;

const menuMessage = `\n(v) View \u2022 (n) New \u2022 (cX) Complete \u2022 (dX) Delete \u2022 (s) Save \u2022 (q) Quit`;
console.log(home);
rl.prompt();

// Todo Class
class ToDo {
  constructor(id, name, completed) {
    (this.id = id), (this.name = name), (this.completed = completed);
  }
}

class cliFunctions {
  // Initialize a constructor for ToDo List
  constructor() {
    this.count = 0;
    // this.todos = fileName ? ['seedData'] : [];
    // this.todos = fileName ? 'yes' : 'no';
    this.todos = [];
  }

  viewTodos(input) {
    const todoArr = this.todos;
    todoArr.forEach((todo) => {
      const { id, name, completed } = todo;

      console.log(`${id} ${completed ? `[\u2713]` : `[ ]`} ${name}`);
    });
    console.log(menuMessage);
    return this.todos;
  }
  addTodo(input) {
    rl.prompt();
    rl.question(`What? \n`, (result) => {
      const newTodo = new ToDo(this.count, result.trim(), false);
      this.todos.push(newTodo);
      console.log(`New todo successfully`);
      console.log(menuMessage);
      this.count += 1;
      return;
    });
  }
  completeTodo(input) {
    const index = parseInt(input.slice(1, input.length));

    const idMap = this.todos.map((todo) => {
      return todo.id;
    });

    if (input.slice(0, 1) === 'c' && idMap.includes(index)) {
      this.todos[index].completed = true;
      console.log(`Completed "${this.todos[index].name}"`);
    }
    console.log(menuMessage);
    return;
  }
  deleteTodos(input) {
    const idMap = this.todos.map((todo) => {
      return todo.id;
    });

    const index = parseInt(input.slice(1, input.length));

    if (input.slice(0, 1) === 'd' && idMap.includes(index)) {
      console.log(`Deleted "${this.todos[index].name}"`);
      this.todos.splice(index, 1);
    } else {
      console.log(
        `You entered ${input} and the id ${input.slice(
          1
        )} does not exist in the database`
      );
    }
    console.log(menuMessage);
  }
  save() {
    rl.question(`Where? (myTodos.json)`, (answer) => {
      const path = answer || `${__dirname}/myTodos.json`;

      fs.writeFile(path, JSON.stringify(this.todos), (err) => {
        console.log(this.todos);
      });
    });
  }
  quit() {
    console.log(`Quitting the Todo CLI program... \nSee you soon! 😄`);
    rl.close();
  }
  cliMenu() {
    console.log(menuMessage);
    rl.on('line', (input) => {
      if (input === 'v') {
        newCli.viewTodos(input);
      } else if (input === 'n') {
        newCli.addTodo(input);
      } else if (input.slice(0, 1).includes('c')) {
        newCli.completeTodo(input);
      } else if (input.slice(0, 1).includes('d')) {
        newCli.deleteTodos(input);
      } else if (input === 's') {
        newCli.save();
      } else if (input === 'q') {
        newCli.quit(input);
      }
    });
  }
}

const newCli = new cliFunctions();
newCli.cliMenu();

/* Stretch Code */

if (fileName) {
  fs.readFile(`${__dirname}/${fileName}`, `utf8`, (data, err) => {
    if (!err) {
      console.log(JSON.parse(data));
    } else {
      console.log(err);
    }
  });
} else {
  // console.log(`No fileName provided file`);
}
