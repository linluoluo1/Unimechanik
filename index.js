const burgerIcon = document.querySelector(".menu-burger-icon");
const burgerMenu = document.querySelector(".menu-burger-ul")
const transpBg = document.querySelector(".transp-bg")
const callModal = document.querySelectorAll(".call-modal")
const modal = document.querySelector(".modal-container")
const closeModalIcon = document.querySelector(".close-modal-icon")

burgerIcon.addEventListener('click', ()=>{
    burgerMenu.classList.toggle("show-burger-menu")
    transpBg.classList.toggle("show-transp-bg")
})

callModal.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
        modal.classList.toggle('show-modal-container')
        transpBg.classList.toggle("show-transp-bg")
    })
})

closeModalIcon.addEventListener('click', ()=>{
    modal.classList.remove('show-modal-container')
    transpBg.classList.remove("show-transp-bg")
})