const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        // Create a delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        
        // Add an update button
        let updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.className = "edit-btn";
        li.appendChild(updateButton);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.tagName === "BUTTON" && e.target.className === "edit-btn") {
        // Update operation
        let li = e.target.parentElement;
        let newValue = prompt("Edit your task:", li.firstChild.textContent);
        if (newValue !== null && newValue.trim() !== "") {
            li.firstChild.textContent = newValue;
        }
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
