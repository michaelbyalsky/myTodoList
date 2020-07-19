const taskInput = document.querySelector("#textInput");
const priorety = document.querySelector("#prioritySelector");
const addButton = document.querySelector("#addButton");
const container = document.querySelector(".todoContainer");
const taskCounter = document.querySelector("#counter");
let taskCounterNumber = 0;

document.addEventListener("click", (e) => {
    //check if we pressed on the insert button
    if (e.target.id === "addButton") {
        addTaskFunc();
    }
    if (e.target.id === "sortButton") {
        sortList("priority");
    }

    if (e.target.id === "sortByDateButton") {
        sortList("date");
    }

    if (e.target.className === "delBtn") {
        //call the remove func
        removeItem(e);
    }

    //if you sure section
    if (e.target.className === "deleteSure") {
        let li = e.target.parentElement.parentElement;
        li.parentElement.removeChild(li);
        taskCounterNumber -= 1;
        taskCounter.innerText = taskCounterNumber;
    } else if (e.target.className === "undoBtn") {
        let undo = e.target.parentElement;
        undo.parentElement.removeChild(undo);
    }
});

taskInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 && e.target.id === "textInput") {
        addTaskFunc();
    }
})

const addTaskFunc = () => {
    let currentTaskText = taskInput.value;
    taskInput.value = "";
    //checks if the imput section not empty
    if (currentTaskText) {
        //add 1 to task counter
        taskCounterNumber += 1;
        taskCounter.innerText = taskCounterNumber;
        //add div wrapper for current task
        let taskWrapper = document.createElement("li");
        taskWrapper.classList.add("taskWrapper");
        container.appendChild(taskWrapper);
        //add priority to the current task
        let priorityNum = priorety.options[priorety.selectedIndex].value;
        let currentTaskPriority = document.createElement("div");
        currentTaskPriority.innerText = priorityNum;
         if (Number(priorityNum) === 1) {
            taskWrapper.style.backgroundColor = "blue"
         } else if (Number(priorityNum) === 2) {
            taskWrapper.style.backgroundColor = "green" 
         } else if (Number(priorityNum) === 3) {
            taskWrapper.style.backgroundColor = "yellow" 
         } else if (Number(priorityNum) === 4) {
            taskWrapper.style.backgroundColor = "orange" 
         } else if (Number(priorityNum) === 5) {
            taskWrapper.style.backgroundColor = "red" 
         }
        currentTaskPriority.classList.add("todoPriority");
        taskWrapper.appendChild(currentTaskPriority);
        //add time to the current task
        let dd = new Date();
        let getTime = dd.getFullYear().toString() + "-" +
            ("0" + (dd.getMonth() + 1).toString()).slice(-2) +
            "-" +
            ("0" + dd.getDate().toString()).slice(-2) +
            " " +
            new Date().toString().slice(16, 25);
        let currentTaskTime = document.createElement("div");
        currentTaskTime.innerText = getTime;
        currentTaskTime.classList.add("todoCreatedAt");
        taskWrapper.appendChild(currentTaskTime);
        //add the current task
        let currentTask = document.createElement("div");
        currentTask.innerText = currentTaskText;
        currentTask.classList.add("todoText");
        taskWrapper.appendChild(currentTask);
        //create delete button
        let delBtn = document.createElement("button");
        delBtn.classList.add("delBtn");
        delBtn.textContent = "X";
        taskWrapper.appendChild(delBtn);
    }
};

const removeItem = (e) => {
    //define the father
    let li = e.target.parentElement;
    //create sure father
    const sure = document.createElement("span");
    sure.classList.add("sure");
    li.appendChild(sure)
    sure.textContent = "Are you sure?"
    //create sure buttons (children) 
    //delete button
    var deleteSure = document.createElement("button");
    deleteSure.classList.add("deleteSure");
    sure.appendChild(deleteSure)
    deleteSure.textContent = "delete"
    //undo button
    var undoBtn = document.createElement("button");
    undoBtn.classList.add("undoBtn");
    sure.appendChild(undoBtn)
    undoBtn.textContent = "undo"
}

const sortList = (sortType) => {
    let i, switching, b, shouldSwitch;
    list = document.querySelector(".todoContainer");
    switching = true;
    /* Make a loop that will continue until
no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.querySelectorAll(".todoPriority");
        // Loop through all list items:
        for (i = 0; i < b.length - 1; i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Check if the next item should
      switch place with the current item by priority: */
            if (sortType === "priority") {
                if (b[i].innerHTML < b[i + 1].innerHTML) {
                    /* If next item is alphabetically lower than current item,
              mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
                /* Check if the next item should
          switch place with the current item by date: */
            } else if (sortType === "date") {
                if (b[i].innerHTML.slice(0, 10) > b[i + 1].innerHTML.slice(0, 10) || b[i].innerHTML.slice(11, -1) > b[i + 1].innerHTML.slice(11, -1)) {
                    /* If next item is alphabetically lower than current item,
              mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
      and mark the switch as done: */
            b[i].parentNode.parentNode.insertBefore(
                b[i + 1].parentNode,
                b[i].parentNode
            );
            switching = true;
        }
    }
};