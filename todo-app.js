let taskList = []
var tim = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
var check=[]
var newList=[]
var currDate = new Date();
var date = currDate.getDate() + "/" + currDate.getMonth() + 1;

class Task {
    constructor(name, currentDate, isDone, dueDate, taskId) {
      if (typeof taskId === "undefined") {
        this.taskId = Date.now();
        this.name = name;
        this.currentDate = date;
        this.isDone = isDone;
        this.dueDate = dueDate;
      } else {
        this.taskId = taskId;
        this.name = name;
        this.currentDate = currentDate;
        this.isDone = isDone;
        this.dueDate = dueDate;
      }
    }

    toString() {
        let htmlText = '<li class="task" ><div class ="eachTask">';
        htmlText += this.name;
        htmlText += ", " + this.currentDate;
        htmlText += ", " + "Due date: " + this.dueDate;
        htmlText +=
          '<input type="checkbox" onclick="strkoff(' +
          this.taskId +
          ')" name="isDone" id="isDone">';
        htmlText += '<button onclick="deleteTask(';
        htmlText += this.taskId;
        htmlText += ')">Delete</button>';
        htmlText += "</div></li>";
        return htmlText;
      }
    }

function render() {
    console.log("entered")
    const listUI = document.getElementById("todolist");
    listUI.innerHTML = "";
    if (newList.length === 0) listUI.innerHTML = "No tasks todo :-)";
    newList.forEach((task) => {
      listUI.innerHTML += task.toString();
    });
  }

function deleteTask(taskId) {
    newList = newList.filter(
        (t) => {
            if(t.taskId != taskId) 
            return t;
        }
    );
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/api/update/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(newList));
    render()
    console.log(newList);
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    const dueDate = document.getElementById("dueDate").value;
    let msg = document.getElementById("message");
    console.log(taskName);
  
    if (taskName === "") {
      document.querySelector(".message").innerHTML = "Enter Task name.";
      return;
    }
  
    if (dueDate < tim) {
      document.querySelector(".message").innerHTML = "Enter a valid date.";
      return;
    }
  
    addTask(new Task(taskName, new Date(), false, dueDate));
  }
function addTask(t) {
    newList.push(t)
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/api/update/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(newList));
    render();
    console.log(taskList)
}
function strkoff(x) {
    let id = x;
  
    if (isChecked(id) === 1) {
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].taskId === id) {
          newList[i].isDone = false;
          let updatedName = newList[i].name;
          updatedName = updatedName.replace("<strike>", "");
          updatedName = updatedName.replace("</strike>", "");
          newList[i].name = updatedName;
          render();
          deleteId(id);
        }
      }
    } else {
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].taskId === id) {
          check.push(id);
          newList[i].isDone = true;
          newList[i].name = "<strike>" + newList[i].name + "</strike>";
          render();
        }
      }
    }
  }
  
  function deleteId(taskId) {
    check = check.filter((t) => {
      if (t != taskId) return t;
    });
  }
  
  function isChecked(id) {
    if (check.length === 0) return 0;
    for (let k = 0; k < check.length; k++) {
      if (check[k] === id) {
        return 1;
      }
    }
  }

  function fetchData() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:5000/api/todo/", true);
    request.onload = function () {
      if (request.status === 200) {
        let data = JSON.parse(request.responseText);
        taskList = data;
        console.log(taskList);
        console.log(taskList);
        for (let i = 0; i < taskList.length; i++) {
          task = new Task(
            taskList[i].name,
            taskList[i].currentDate,
            taskList[i].isDone,
            taskList[i].dueDate,
            taskList[i].taskId
          );
          console.log(task);
          newList.push(task);
          render();
        }
        console.log(check);
        return data;
      }
    };
    request.send();
  }
function init() {   
    console.log("init called");
    fetchData();
    render();
}

init();