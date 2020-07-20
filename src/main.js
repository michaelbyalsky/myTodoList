let taskCounterNumber;
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

document.addEventListener("click", (e) => {
    //check if we pressed on the insert button
    if (e.target.id === "addButton") {
        addTaskFunc();
    }
    if (e.target.id === "sortButton") {
        sortList();
    }

    if (e.target.id === "sortByDateButton") {
        sortListByDate();
    }

    if (e.target.className === "delBtn") {
        //call the remove func
        removeItem(e);
    }

    if (e.target.id === "deleteAll") {
        //call the remove func
        container.innerHTML = "";
        taskCounterNumber = 0;
        taskCounter.innerText = taskCounterNumber;
        localStorage.clear();
    }

    //if you sure section
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
        //add to local strage
        addToLocalStorage();
        
    }
};

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
    sure.textContent = "sure?"
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

const sortList = () => {
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
  switch place with the current item: */
        if (b[i].innerHTML < b[i + 1].innerHTML) {
          /* If next item is alphabetically lower than current item,
    mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
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

  const sortListByDate = () => {
    let i, switching, b, shouldSwitch;
    list = document.querySelector(".todoContainer");
    switching = true;
    /* Make a loop that will continue until
no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      b = list.querySelectorAll(".todoCreatedAt");
      // Loop through all list items:
      for (i = 0; i < b.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Check if the next item should
  switch place with the current item: */
        if (Date.parse(b[i].innerHTML.slice(0, 10)) > Date.parse(b[i + 1].innerHTML.slice(0, 10))) {
          /* If next item is alphabetically lower than current item,
    mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
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

  document.addEventListener('DOMContentLoaded', function() {
//Select all taskstaskWrapper
const list = document.querySelector('.todoContainer');

    let draggingEle;
    let placeholder;
    let isDraggingStarted = false;

    // The current position of mouse relative to the dragging element
    let x = 0;
    let y = 0;

    // Swap two nodes
    const swap = function(nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        // Move `nodeA` to before the `nodeB`
        nodeB.parentNode.insertBefore(nodeA, nodeB);

        // Move `nodeB` to before the sibling of `nodeA`
        parentA.insertBefore(nodeB, siblingA);
    };

    // Check if `nodeA` is above `nodeB`
    const isAbove = function(nodeA, nodeB) {
        // Get the bounding rectangle of nodes
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();

        return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
    };

    const mouseDownHandler = function(e) {
        draggingEle = e.target;

        // Calculate the mouse position
        const rect = draggingEle.getBoundingClientRect();
        x = e.pageX - rect.left;
        y = e.pageY - rect.top;

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        const draggingRect = draggingEle.getBoundingClientRect();

        if (!isDraggingStarted) {
            isDraggingStarted = true;
            
            // Let the placeholder take the height of dragging element
            // So the next element won't move up
            placeholder = document.createElement('div');
            placeholder.classList.add('placeholder');
            draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
            placeholder.style.height = `${draggingRect.height}px`;
        }

        // Set position for dragging element
        draggingEle.style.position = 'absolute';
        draggingEle.style.top = `${e.pageY - y}px`; 
        draggingEle.style.left = `${e.pageX - x}px`;

        // The current order
        // prevEle
        // draggingEle
        // placeholder
        // nextEle
        const prevEle = draggingEle.previousElementSibling;
        const nextEle = placeholder.nextElementSibling;
        
        // The dragging element is above the previous element
        // User moves the dragging element to the top
        if (prevEle && isAbove(draggingEle, prevEle)) {
            // The current order    -> The new order
            // prevEle              -> placeholder
            // draggingEle          -> draggingEle
            // placeholder          -> prevEle
            swap(placeholder, draggingEle);
            swap(placeholder, prevEle);
            return;
        }

        // The dragging element is below the next element
        // User moves the dragging element to the bottom
        if (nextEle && isAbove(nextEle, draggingEle)) {
            // The current order    -> The new order
            // draggingEle          -> nextEle
            // placeholder          -> placeholder
            // nextEle              -> draggingEle
            swap(nextEle, placeholder);
            swap(nextEle, draggingEle);
        }
    };

    const mouseUpHandler = function() {
        // Remove the placeholder
        placeholder && placeholder.parentNode.removeChild(placeholder);

        draggingEle.style.removeProperty('top');
        draggingEle.style.removeProperty('left');
        draggingEle.style.removeProperty('position');

        x = null;
        y = null;
        draggingEle = null;
        isDraggingStarted = false;

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Query all items
    [].slice.call(list.querySelectorAll('.taskWrapper')).forEach(function(item) {
        item.addEventListener('mousedown', mouseDownHandler);
    });
});
