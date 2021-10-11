let sumBasic = document.querySelector('.basic-sum')
let sumSenior = document.querySelector('.senior-sum')
let amountBasic = document.querySelectorAll('.basic-amount')
let amountSenoir = document.querySelectorAll('.senior-amount')
let totalSum = document.querySelectorAll('.total-num-sum')
let _sumBasic = 0
let _sumSenior = 0
let multiplayer = 20
let ticketsRadio = document.getElementsByName('ticket')
const ticketType = document.getElementById('ticketType')

ticketType.onchange = ev => {
    document.getElementById(ev.target.value).checked = true
    changeMultiplayer()
    countBasic(null, 0)
    countSenior(null, 0)

    console.log(ev.target)
}

ticketsRadio.forEach(el => {
    el.onchange = (ev) => {
        console.log(ev.target, ev.target.id)
        ticketType.value = ev.target.id
        changeMultiplayer()
        countBasic(null, 0)
        countSenior(null, 0)
    }
})
let changeMultiplayer = _ => {
    switch (ticketType.value) {
        case 'permanent':
            multiplayer = 20
            break;
        case 'temporary':
            multiplayer = 25
            break;
        case 'combined':
            multiplayer = 45
            break;
    }
}


let countBasic = (elem, val) => {
    let currentValue = Number.parseInt(amountBasic[0].value)
    if (((0 < currentValue) || currentValue + val > 0) && ((currentValue < 20) || currentValue + val < 20)) {
        currentValue += val
        _sumBasic = multiplayer * currentValue
        countTotal()
    }
    amountBasic.forEach(el => {
        el.value = currentValue
    })
    sumBasic.textContent = _sumBasic
}
let countSenior = (elem, val) => {
    let currentValue = Number.parseInt(amountSenoir[0].value)
    if (((0 < currentValue) || currentValue + val > 0) && ((currentValue < 20) || currentValue + val < 20)) {
        currentValue += val
        _sumSenior = multiplayer / 2 * currentValue

        countTotal()
    }
    amountSenoir.forEach(el => {
        el.value = currentValue
    })
    sumSenior.textContent = _sumSenior
}
let countTotal = _ => {
    totalSum.forEach(el => {
        el.textContent = _sumSenior + _sumBasic
    })
}
let changeInput = (elem, val) => {
    if (val > 0)
        elem.previousElementSibling.stepUp()
    else
        elem.nextElementSibling.stepDown()
}