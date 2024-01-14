// add form
const addForm = document.querySelector(".add-form");
const addInput = document.querySelector(".add-input");

// search form
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");

// list
const elList = document.querySelector(".list");
let tasks = [];
let result = [];

// numbers
const allNumber = document.querySelector(".all-number");
let allNumberValue = 0;
const completedNumber = document.querySelector(".completed-number");
let completedNumberValue = 0;
const uncompletedNumber = document.querySelector(".uncompleted-number");
let uncompletedNumberValue = 0;

// buttons
const allNumberButton = document.querySelector(".all-number-button");
const completedNumberButton = document.querySelector(".completed-number-button");
const uncompletedNumberButton = document.querySelector(".uncompleted-number-button");

// localstorage
if (localStorage.getItem("tasks")) {
	tasks = JSON.parse(localStorage.getItem("tasks"));
	domgaChiqarator(tasks, elList);
}

// create new task
addForm.addEventListener("submit", evt => {
	evt.preventDefault();

	// value tozalash
	let addInputValue = addInput.value;
	addInput.value = "";

	// listni tozalash
	elList.innerHTML = "";

	// object yaratish
	let obj = {
		id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
		task: addInputValue,
		completed: false,
	};

	// push va dom
	tasks.push(obj);
	domgaChiqarator(tasks, elList);
	localStorage.setItem("tasks", JSON.stringify(tasks));
});

// search
searchForm.addEventListener("submit", evt => {
	evt.preventDefault();

	// value tozalash
	let searchInputValue = searchInput.value;
	searchInput.value = "";

	// result tozalash
	result = [];

	// list tozalash
	elList.innerHTML = "";

	// filter
	tasks.forEach(element => (element.task.includes(searchInputValue) ? result.push(element) : ""));

	// dom
	domgaChiqarator(result, elList);
});

// buttons events
allNumberButton.addEventListener("click", () => {
	elList.innerHTML = "";
	domgaChiqarator(tasks, elList);
});
completedNumberButton.addEventListener("click", () => {
	elList.innerHTML = "";
	result = [];
	tasks.forEach(element => (element.completed ? result.push(element) : ""));
	domgaChiqarator(result, elList);
});
uncompletedNumberButton.addEventListener("click", () => {
	elList.innerHTML = "";
	result = [];
	tasks.forEach(element => (!element.completed ? result.push(element) : ""));
	domgaChiqarator(result, elList);
});

elList.addEventListener("click", evt => {
	// delete event
	if (evt.target.matches(".list__item-delete-button")) {
		let btnId = evt.target.dataset.id;
		let foundIndex = tasks.findIndex(element => element.id == btnId);
		tasks.splice(foundIndex, 1);
		elList.innerHTML = "";
		domgaChiqarator(tasks, elList);
		localStorage.setItem("tasks", JSON.stringify(tasks));
		return;
	}
	// complete != uncomplete
	else if (evt.target.matches(".list__item-type-button")) {
		let btnId = evt.target.dataset.id;
		elList.innerHTML = "";
		let checkObj = tasks.find(element => element.id == btnId);
		checkObj.completed = !checkObj.completed;
		localStorage.setItem("tasks", JSON.stringify(tasks));
		domgaChiqarator(tasks, elList);
	}
	// changing task text
	else if (evt.target.matches(".list__item-change-text-button")) {
		let btnId = evt.target.dataset.id;
		let foundIndex = tasks.findIndex(element => element.id == btnId);
		let promptText = prompt("Uzgarish kiriting", tasks[foundIndex].task);
		tasks[foundIndex].task = promptText;
		elList.innerHTML = "";
		localStorage.setItem("tasks", JSON.stringify(tasks));
		domgaChiqarator(tasks, elList);
	}
});

// dom
function domgaChiqarator(array, list) {
	completedNumberValue = 0;
	uncompletedNumberValue = 0;
	allNumberValue = tasks.length;
	tasks.forEach(element => (element.completed ? completedNumberValue++ : uncompletedNumberValue++));
	allNumber.textContent = allNumberValue;
	completedNumber.textContent = completedNumberValue;
	uncompletedNumber.textContent = uncompletedNumberValue;
	array.forEach(element => {
		let item = document.createElement("li");
		item.classList.add("list__item");
		if (!element.completed) {
			item.innerHTML = `
			<p class="list__item-task">${element.task}</p>
			<div class="list__item-right">
				<button data-id=${element.id} class="list__item-change-text-button" type="button"></button>
				<button data-id=${element.id} class="list__item-delete-button" type="button"></button>
				<button data-id=${element.id} class="list__item-type-button not-done" type="button"></button>
			</div>
		`;
		} else {
			item.innerHTML = `
			<p class="list__item-task">${element.task}</p>
			<div class="list__item-right">
				<button data-id=${element.id} class="list__item-change-text-button" type="button"></button>
				<button data-id=${element.id} class="list__item-delete-button" type="button"></button>
				<button data-id=${element.id} class="list__item-type-button done" type="button"></button>
			</div>
		`;
		}
		list.appendChild(item);
	});
}
