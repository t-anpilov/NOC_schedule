const outputWindow = document.getElementById('date_out')
const firstDate = document.getElementById('first_date')
const lastDate = document.getElementById('last_date')
const closeBtn = document.getElementById('close')
const btn = document.getElementById('do')

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}

const firstShift = {
    text: 'first shift',
    style: 'first_shift'
}
const secondShift = {
    text: 'second shift',
    style: 'second_shift'
}
const nightShift = {
    text: 'night shift',
    style: 'night_shift'
}
const dayOff = {
    text: 'day off',
    style: 'day_off'
}

closeBtn.addEventListener('click', closeInput)

btn.addEventListener('click', ()=>{
    cleanBox(outputWindow)
    createBefore(outputWindow, firstDate, lastDate)
    calculateDate(outputWindow, firstDate, lastDate)    
    createAfter(outputWindow, firstDate, lastDate)
})

function closeInput() {
    firstDate.disabled = true  
}

class UserDate {
    constructor(date, shift){
        this.date = date
        this.shift = shift
    }
    showDate(elem) {
        let shownDay = document.createElement('div') 
        shownDay.innerHTML = `<p>${this.date.toLocaleString("uk", options)}</p><p>${this.shift.text}</p>`
        shownDay.classList.add(this.shift.style)
        elem.append(shownDay)
    }
}

class centerUserDate extends UserDate {
    showDate(elem) {
        super.showDate(elem)
        elem.lastChild.classList.add('bold')       
    }
}

function calculateDate(container, data1, data2) {
       
    let date = data1.valueAsDate
    let day = data2.valueAsDate  
    let dayType = getShift(date, day)
    let userDate = new centerUserDate(day, dayType)
    userDate.showDate(container)    
}

function createBefore (container, data1, data2) {

    let date = data1.valueAsDate
    for (let i=3; i>0; i--) {
        let secs = +data2.valueAsDate - i*86400*1000
        let day = new Date(secs)
        let dayType = getShift(date, day) 
        let userDate = new UserDate(day, dayType)
        userDate.showDate(container)
    }
}

function createAfter (container, data1, data2) {

    let date = data1.valueAsDate
    for (let i=1; i<=3; i++) {
        let secs = +data2.valueAsDate + i*86400*1000
        let day = new Date(secs)
        let dayType = getShift(date, day)        
        let userDate = new UserDate(day, dayType)
        userDate.showDate(container)
    }
}


function compare(num) { 
    let result
    if (num==14 || num==13 || num==12 || num==8 || num==7 || num==6) {
        result = dayOff
    } else  if (num==11 || num==10 || num==9) {
        result = nightShift
    } else  if (num==5 || num==4 || num==3) {
        result = secondShift
    } else if (num==2 || num===1 || num===0) {
        result = firstShift 
    } return result
}

function compareBack(num) { 
    let result
    if (num==1 || num==2 || num==3 || num==7 || num==8 || num==9) {
        result = dayOff
    } else  if (num==4 || num==5 || num==6) {
        result = nightShift
    } else  if (num==10 || num==11 || num==12) {
        result = secondShift
    } else if (num==13 || num===14 || num===0) {
        result = firstShift 
    } return result
}

function getShift(date, day) {
    date = +date
    day = +day
    let someShift    
    let x, y
    if (day>=date){
        x = (day-date)/86400000
        if (x>14) {
            y = x%15
            someShift = compare(y)
        } else if (x>0) {    
            someShift = compare(x)
        } else if (x===0) {
            someShift = firstShift              
        }
    } else if (day<date){
        x = (date-day)/86400000
        if (x>15) {
            y = x%15
            someShift = compareBack(y)
        } else if (x) {    
            someShift = compareBack(x)        
        }        
    }    
    return someShift    
}

function cleanBox(box) {
    while(box.lastChild){
        box.removeChild(box.lastChild)
    }
}