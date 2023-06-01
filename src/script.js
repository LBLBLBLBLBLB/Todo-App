import { format } from 'date-fns'
// FOR MODAL WINDOW
const openModalInput = document.getElementById('add-btn-modal');
const overlay = document.querySelector('.overlay');
const modalForInputs = document.querySelector('.modal-input');
const closeBtn = document.querySelector('.in-ic');
const clearModal = document.querySelector('.clear-modal');
const clearAllBtn = document.getElementById('clear-all-btn');
const btnClearNo = document.getElementById('clear-all-no');
const detailedModal = document.querySelector('.details-modal');


const openModal = () => {
    modalForInputs.classList.add('modal-active');
    overlay.classList.add('overlay-active');
}
const closeModal = () => {
    modalForInputs.classList.remove('modal-active');
    overlay.classList.remove('overlay-active');
}
// this function is for opening clear all modal
//and also its for clear all tasks if click yes
const openClearModal = ()=>{
    clearModal.classList.add('modal-active');
    overlay.classList.add('overlay-active');

    const btnClearYes = document.getElementById('clear-all-yes');
    btnClearYes.addEventListener('click', () => {
    removeAllTasks();
    closeClearModal();
  });  
}
const closeClearModal = () =>{
    clearModal.classList.remove('modal-active');
    overlay.classList.remove('overlay-active');
}
const openDetailsModal = () => {
    detailedModal.classList.add('modal-active');
    overlay.classList.add('overlay-active');
}
const closeDetailsModal = () => {
    detailedModal.classList.remove('modal-active');
    overlay.classList.remove('overlay-active');
}

openModalInput.addEventListener('click', openModal);
clearAllBtn.addEventListener('click', openClearModal);

overlay.addEventListener('click', () => {
    closeModal();
    closeClearModal();
    closeDetailsModal();
    clearInputs();
});

closeBtn.addEventListener('click', ()=>{
    closeModal();
    clearInputs();
});

btnClearNo.addEventListener('click', closeClearModal);

window.addEventListener('keydown', (key) => {
    if(key.key === "Escape"){
        closeModal();
        closeClearModal();
        closeDetailsModal();
        clearInputs();
    }
});

//variables
const todosContainer = document.querySelector('.todos');
const taskTitle = document.getElementById('task-title');
const taskDetail = document.getElementById('task-detail');
const taskDate = document.getElementById('date');
const addTask = document.getElementById('add-task');
const clearInputBtn = document.getElementById('clear-tasks');

let todosCount = document.querySelector('.tasks-count');
let todosDone = document.querySelector('.tasks-done');
let todosUndone = document.querySelector('.tasks-undone');
const labels = document.querySelectorAll('.pr-radio-btn');

labels.forEach(label => {
  label.addEventListener("click", () => {
    labels.forEach(l => l.classList.remove("pr-radio-clicked"));
    label.classList.add("pr-radio-clicked");
  });
});

const getPriority = () => {
    const selectedRadio = document.querySelector('input[name="priority"]:checked');
    
    if (selectedRadio) {
      const selectedValue = selectedRadio.value;
      return selectedValue;
    } else {
        return null;
    }
}

const updateCount = () => {
    const tasksContainers = todosContainer.getElementsByClassName('tasks-container');
    const checkboxes = todosContainer.getElementsByClassName('checkbox');
    
    let doneCount =0;
    for(let i = 0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            doneCount ++;
        }
    }
    todosCount.textContent = `Tasks Count: ${tasksContainers.length}`;
    todosDone.textContent = `Finished: ${doneCount}`;
    todosUndone.textContent = `Unfinished: ${tasksContainers.length - doneCount} `;

}

//this is for get values , and if values empty  getting alert
const getValuesFromInput = () =>{
    let titleValue = taskTitle.value;
    let detailValue = taskDetail.value;
    let dateValue = taskDate.value;
    let selectedPriority = getPriority();

    const errorName = document.querySelector('.error-name');
    const errorDetails = document.querySelector('.error-details');
    const errorDates = document.querySelector('.error-dates');
    const errorPrior = document.querySelector('.error-priority');

    if (!titleValue) {
        errorName.style.visibility = 'visible';
    } else {
        errorName.style.visibility = 'hidden';
    }
    
    if (!detailValue) {
        errorDetails.style.visibility = 'visible';
    } else {
        errorDetails.style.visibility = 'hidden';
    }
    
    if (!dateValue ) {
        errorDates.style.visibility = 'visible';
    } else {
        errorDates.style.visibility = 'hidden';
    }
      
    if (!selectedPriority) {
        errorPrior.style.visibility = 'visible';
    } else {
        errorPrior.style.visibility = 'hidden';
    }
    
    if (titleValue && detailValue && dateValue && selectedPriority) {
        renderTasks(titleValue, detailValue, dateValue);
        closeModal();
        clearInputs();
    }
    
}
addTask.addEventListener('click', (e)=>{
    e.preventDefault();
    getValuesFromInput();
    updateCount();
    getPriority();
});

// this helps to make values of input default
const clearInputs = () => {
    taskTitle.value = '';
    taskDetail.value = '';
    taskDate.value = taskDate.defaultValue;

    labels.forEach(label => {
        label.classList.remove("pr-radio-clicked");
    });

    const selectedRadio = document.querySelector('input[name="priority"]:checked');
    if (selectedRadio) {
        selectedRadio.checked = false;
    }
}
clearInputBtn.addEventListener('click', ()=>{
    clearInputs();
});


//this is for making tasks , also for showing us detailed information 
// also for deleting single tasks
const renderTasks = (title,detail,date) => {
    const formatedDate = formateDate(date);
    const selectedPriority = getPriority();

    let priorityClass = '';
    if (selectedPriority === 'High') {
    priorityClass = 'high-priority';
    } else if (selectedPriority === 'Medium') {
    priorityClass = 'medium-priority';
    } else if (selectedPriority === 'Low') {
    priorityClass = 'low-priority';
    }

    const html = `
    <div class="tasks-container ${priorityClass}">
        <div class="title-cont">
            <input type="checkbox" class="checkbox">
            <p class="todo-name">${title}</p>
        </div>
        <div class="details-cont">
            <button class="details" >Details</button>
            <p class = 'date-cont'>${formatedDate}</p>
            <ion-icon name="trash-outline" class="task-ic trash-ic"></ion-icon>
        </div>
    </div>
    `;
    todosContainer.insertAdjacentHTML('beforeend', html);

    const tasksContainers = todosContainer.getElementsByClassName('tasks-container');
    const lastTaskContainer = tasksContainers[tasksContainers.length - 1];
    const detailedBtn = lastTaskContainer.querySelector('.details');
    detailedBtn.addEventListener('click', ()=>{
        showDetailInfo(title,detail,date,selectedPriority);
    });
    const deleteBtn = lastTaskContainer.querySelector('.trash-ic');
    deleteBtn.addEventListener('click' ,() =>{
        lastTaskContainer.remove();
        updateCount();
    });
    updateCount();
    const checkbox = lastTaskContainer.querySelector('.checkbox');
    checkbox.addEventListener('change', () => {
        updateCount();
    });
}

//makes todosContainer empty
const removeAllTasks = () => {
    todosContainer.innerHTML = '';
    updateCount();
}


//make template literals for detailed info
const showDetailInfo = (titles, details, dates,priority) => {
    const dateForDetailed = formatDateDetails(dates);
    detailedModal.innerHTML = '';
    openDetailsModal()
    const detailsHtml = `
        <div class="detailed-info">
            <div class="det-h">
                <p>Details</p>
                <ion-icon name="close-outline" class="cl-det-btn"></ion-icon>
            </div>
            <div class="det-in">
                <p>Name: <span> ${titles}</span> </p>
                <p>Details: <span> ${details}</span></p>
                <p>Date : <span> ${dateForDetailed}</span></p>
                <p>Priority : <span> ${priority}</span></p>
            </div>
        </div>
    `;
    
    detailedModal.insertAdjacentHTML('beforeend',detailsHtml);
    const closeDetails = detailedModal.querySelector('.cl-det-btn');
    closeDetails.addEventListener('click', closeDetailsModal);
}

//format date for tasks
const formateDate = (formDate) => {
    const dateObject = new Date(formDate);
    const dateMonth = format(dateObject, 'MMM');
    const dateDay = format(dateObject, 'do');
    return `${dateDay} ${dateMonth}`;
}

//format date for details
const formatDateDetails = (detailsDate) => {
    const dateObject = new Date(detailsDate);
    const dateMonth = format(dateObject, 'MMM');
    const dateDay = format(dateObject, 'do');
    const dateYear = format(dateObject, 'yyyy');
    return `${dateMonth} ${dateDay}, ${dateYear}`;
}

