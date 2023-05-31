// FOR MODAL WINDOW
// variables
const openModalInput = document.getElementById('add-btn-modal');
const overlay = document.querySelector('.overlay');
const modalForInputs = document.querySelector('.modal-input');
const closeBtn = document.querySelector('.in-ic');
const clearModal = document.querySelector('.clear-modal');
const clearAllBtn = document.getElementById('clear-all-btn');
const btnClearNo = document.getElementById('clear-all-no');


const openModal = () => {
    modalForInputs.classList.add('modal-active');
    overlay.classList.add('overlay-active');
}
const closeModal = () => {
    modalForInputs.classList.remove('modal-active');
    overlay.classList.remove('overlay-active');
}
const openClearModal = ()=>{
    clearModal.classList.add('modal-active');
    overlay.classList.add('overlay-active');
}
const closeClearModal = () =>{
    clearModal.classList.remove('modal-active');
    overlay.classList.remove('overlay-active');
}
openModalInput.addEventListener('click', openModal);
clearAllBtn.addEventListener('click', openClearModal);
overlay.addEventListener('click', () => {
    closeModal();
    closeClearModal();
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
        clearInputs();
    }
});

const todosContainer = document.querySelector('.todos');
const taskTitle = document.getElementById('task-title');
const taskDetail = document.getElementById('task-detail');
const taskDate = document.getElementById('date');
// const priorityBtn = document.querySelectorAll('.pr-btn');
const addTask = document.getElementById('add-task');
const clearInputBtn = document.getElementById('clear-tasks');

const getValuesFromInput = () =>{
    let titleValue = taskTitle.value;
    let detailValue = taskDetail.value;
    let dateValue = taskDate.value;
    // let priorityValue;
    if(titleValue && detailValue && dateValue){
        renderTasks(titleValue,detailValue,dateValue);
        closeModal();
        clearInputs();
    }else{
        alert("PLEASE FILL THE FIELDS");
    }
}

addTask.addEventListener('click', ()=>{
    getValuesFromInput();
});

const clearInputs = () => {
    taskTitle.value = '';
    taskDetail.value = '';
    taskDate.value = taskDate.defaultValue;
}
clearInputBtn.addEventListener('click', ()=>{
    clearInputs();
});

const renderTasks = (title, details, date) => {
    const html = `
    <div class="tasks-container">
        <div class="title-cont">
            <input type="checkbox" class="checkbox">
            <p class="todo-name">${title}</p>
        </div>
        <div class="details-cont">
            <button class="details" >Details</button>
            <p>${date}</p>
            <ion-icon name="create" class="task-ic"></ion-icon>
            <ion-icon name="trash-outline" class="task-ic"></ion-icon>
        </div>
    </div>
    `;
    todosContainer.insertAdjacentHTML('beforeend', html);
}