
//define the task counter
let taskCounterNumber;

/*The function checks if there is there is tasks in the local storage and loads them*/
window.onload = () => {
    if (localStorage.getItem("saveTask") !== null) {
        document.querySelector(".todoContainer").innerHTML = localStorage.getItem("saveTask");
    }
    if (localStorage.getItem("saveCounter") !== null) {
        taskCounterNumber = Number(localStorage.getItem("saveCounter"));
        taskCounter.innerText = taskCounterNumber;
    } else {
        taskCounterNumber = 0;
    }
}

const taskInput = document.querySelector("#textInput");
const priorety = document.querySelector("#prioritySelector");
const addButton = document.querySelector("#addButton");
const container = document.querySelector(".todoContainer");
const taskCounter = document.querySelector("#counter");
const searchBar = document.querySelector("#search");
const deleteAll = document.querySelector("#deleteAll");



//click event listener
document.addEventListener("click", (e) => {
    //check if we pressed on the insert button
    if (e.target.id === "addButton") {
        addTaskFunc();
    }
    //check if we pressed on the sort by priority button
    if (e.target.id === "sortButton") {
        sortListByPriority();
    }
    //check if we pressed on the sort by date button
    if (e.target.id === "sortByDateButton") {
        sortListByDate();
    }
    //check if we pressed on the delete certain task button
    if (e.target.className === "delBtn") {
        //call the remove func
        removeItem(e);
    }
    //check if we pressed on the delete all button
    if (e.target.id === "deleteAll") {
        //call the remove func
        container.innerHTML = "";
        taskCounterNumber = 0;
        taskCounter.innerText = taskCounterNumber;
        localStorage.clear();
    }

    //Asks the customer if he is sore about deleting certain task
    if (e.target.className === "deleteSure") {
        let li = e.target.parentElement.parentElement;
        li.parentElement.removeChild(li);
        taskCounterNumber -= 1;
        taskCounter.innerText = taskCounterNumber;
        addToLocalStorage();
    } else if (e.target.className === "undoBtn") {
        let undo = e.target.parentElement;
        undo.parentElement.removeChild(undo);
    }
});
//Gives the option to add task by click
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
        let taskWrapper = document.createElement("div");
        taskWrapper.classList.add("taskWrapper");
        taskWrapper.draggable = "true";
        container.appendChild(taskWrapper);
        //add priority to the current task
        let priorityNum = priorety.options[priorety.selectedIndex].value;
        let currentTaskPriority = document.createElement("div");
        currentTaskPriority.classList.add("todoPriority");
        currentTaskPriority.innerText = priorityNum;
        //Change the task color by his priority
        if (Number(priorityNum) === 1) {
            taskWrapper.style.backgroundColor = "blue"
        } else if (Number(priorityNum) === 2) {
            taskWrapper.style.backgroundColor = "green"
        } else if (Number(priorityNum) === 3) {
            taskWrapper.style.backgroundColor = "orange"
        } else if (Number(priorityNum) === 4) {
            taskWrapper.style.backgroundColor = "brown"
        } else if (Number(priorityNum) === 5) {
            taskWrapper.style.backgroundColor = "red"
        }
        taskWrapper.appendChild(currentTaskPriority);
        //add the local time to the current task
        let dd = new Date();
        let getTime = dd.getFullYear().toString() + "-" +
            ("0" + (dd.getMonth() + 1).toString()).slice(-2) +
            "-" +
            ("0" + dd.getDate().toString()).slice(-2) +
            " " +
            new Date().toString().slice(16, 25);
        //add task date    
        let currentTaskTime = document.createElement("div");
        currentTaskTime.innerText = getTime;
        currentTaskTime.classList.add("todoCreatedAt");
        taskWrapper.appendChild(currentTaskTime);
        //add the task text
        let currentTask = document.createElement("div");
        currentTask.innerText = currentTaskText;
        currentTask.classList.add("todoText");
        taskWrapper.appendChild(currentTask);
        //create delete button
        let delBtn = document.createElement("button");
        delBtn.classList.add("delBtn");
        delBtn.textContent = "V";
        taskWrapper.appendChild(delBtn);
        //add to local stOrage
        addToLocalStorage();

    }
};
//add to local storage function
const addToLocalStorage = () => {
    localStorage.setItem("saveTask", document.querySelector(".todoContainer").innerHTML);
    localStorage.setItem("saveCounter", document.querySelector("#counter").innerHTML);
}

const removeItem = (e) => {
    //define the father
    let li = e.target.parentElement;
    //create sure father
    const sure = document.createElement("span");
    sure.classList.add("sure");
    li.appendChild(sure)
    sure.textContent = "done?"
    //create sure buttons (children) 
    //delete button
    var deleteSure = document.createElement("button");
    deleteSure.classList.add("deleteSure");
    sure.appendChild(deleteSure)
    deleteSure.textContent = "Yes"
    //undo button
    var undoBtn = document.createElement("button");
    undoBtn.classList.add("undoBtn");
    sure.appendChild(undoBtn)
    undoBtn.textContent = "Undo"
}

const sortListByPriority = () => {
    let i, switching, b, shouldSwitch;
    list = document.querySelector(".todoContainer");
    switching = true;
    //continue the loop while there is no switching
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.querySelectorAll(".todoPriority");
        // Loop through all list items:
        for (i = 0; i < b.length - 1; i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            // Check if the next item shouldswitch place with the current item:
            if (b[i].innerHTML < b[i + 1].innerHTML) {
                //If the next has bigger priority so it need to be switched
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark the switch as done: 
            b[i].parentNode.parentNode.insertBefore(
                b[i + 1].parentNode,
                b[i].parentNode
            );
            switching = true;
        }
    }
};

//The function compare the users keyword in the search bar to the tasks names
searchBar.addEventListener("keyup", (e) => {
    const term = e.target.value.toLowerCase();
    const allTasks = document.querySelectorAll(".taskWrapper");
    Array.from(allTasks).forEach(task => {
        const title = task.querySelector(".todoText").innerText;
        if (title.toLowerCase().indexOf(term) !== -1) {
            task.style.display = "grid";
        } else {
            task.style.display = "none";
        }
    });
})

const sortListByDate = () => {
    let i, switching, b, shouldSwitch;
    list = document.querySelector(".todoContainer");
    switching = true;
    //continue the loop while there is no switching
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.querySelectorAll(".todoCreatedAt");
        // Loop through all list items:
        for (i = 0; i < b.length - 1; i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            // Check if the next item shouldswitch place with the current item:
            if (Date.parse(b[i].innerHTML.slice(0, 10)) > Date.parse(b[i + 1].innerHTML.slice(0, 10)) ||
                (Date.parse(b[i].innerHTML.slice(0, 10)) === Date.parse(b[i + 1].innerHTML.slice(0, 10)) &&
                    Date.parse(b[i].innerHTML.slice(11, -1).replace(/\D/g, '')) > Date.parse(b[i + 1].innerHTML.slice(11, -1).replace(/\D/g, '')))) {
                //If the next item added before so it need to be switched
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark the switch as done: 
            b[i].parentNode.parentNode.insertBefore(
                b[i + 1].parentNode,
                b[i].parentNode
            );
            switching = true;
        }
    }
};

//this event listener tells if the page is completly loaded with all the tasks from the local storage 
window.addEventListener('load', function () {
    //Select all taskstaskWrapper
    const draggables = document.querySelectorAll('.taskWrapper')
    const containers = document.querySelectorAll('.todoContainer')
    //give a class to the item we started to drag
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })
        //remove the class below  
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })

    /*The event allows us to append the draageble item to the container 
    and change places with the others*/
    containers.forEach(container => {
    container.addEventListener('dragover', e => {
        //By defaul dropping inside in an element is disable so we need to prevent it 
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})


    /*the function determine the mouse position when we dragging an element 
    and return the mouse position of the task that after this position*/
    function getDragAfterElement(container, y) {
        //select the tasks that we not dragging right now and covert them to string
        const draggableElements = [...container.querySelectorAll('.taskWrapper:not(.dragging)')]

        /*the function returns the closest object to the one we drgging
        depends on the y position we got from the event*/
        return draggableElements.reduce((closest, child) => {
            //configre the chiled place  
            const box = child.getBoundingClientRect()
            //get the offset between our mouse position and the middle of the box
            const offset = y - box.top - box.height / 2
            /*figure out which ofset is the most closer to 0 between the two tasks
            and return the closest element*/
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }

});


