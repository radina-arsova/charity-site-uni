function willGo(object) {
    object.parentElement.getElementsByClassName('will-go')[0].classList.add('invisible')
    object.parentElement.getElementsByClassName('cancel')[0].classList.remove('invisible')
}

function cancel(object){
    object.parentElement.getElementsByClassName('will-go')[0].classList.remove('invisible')
    object.parentElement.getElementsByClassName('cancel')[0].classList.add('invisible')
}