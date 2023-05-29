// FOR MODAL WINDOW
// variables
const openModalInput = document.getElementById('add-btn-modal');
const overlay = document.querySelector('.overlay');
const modalForInputs = document.querySelector('.modal-input');
const closeBtn = document.querySelector('.in-ic');

const openModal = () => {
    modalForInputs.classList.add('modal-active');
    overlay.classList.add('overlay-active');
}

const closeModal = () => {
    modalForInputs.classList.remove('modal-active');
    overlay.classList.remove('overlay-active');
}
openModalInput.addEventListener('click', openModal);
overlay.addEventListener('click', () => {
    closeModal();
});
closeBtn.addEventListener('click', ()=>{
    closeModal();
});
window.addEventListener('keydown', (key) => {
    if(key.key === "Escape"){
        closeModal();
    }
});