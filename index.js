const outputWindow = document.getElementById('date_out')
const team = document.getElementById('team')
const lastDate = document.getElementById('last_date')
const closeBtn = document.getElementById('close')
const btn = document.getElementById('do')

const shownDaysCount = 4


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

const shiftDate = {
    team1: '2020, 6, 8',
    team2: '2020, 6, 11',
    team3: '2020, 6, 14',
    team4: '2020, 6, 17',
    team5: '2020, 6, 20',
}

lastDate.addEventListener('change', ()=>{
    btn.disabled = false
})

btn.addEventListener('click', ()=>{
    cleanBox(outputWindow)
    createBefore(outputWindow, lastDate)
    calculateDate(outputWindow,lastDate)    
    createAfter(outputWindow, lastDate)
})

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

function getFirstDate() {
    let firstDate
    if (team.value==1) {
        firstDate = new Date(shiftDate.team1)
    } else if (team.value==2) {
        firstDate = new Date(shiftDate.team2)
    } else if (team.value==3) {
        firstDate = new Date(shiftDate.team3)
    } else if (team.value==4) {
        firstDate = new Date(shiftDate.team4)
    }else if (team.value==5) {
        firstDate = new Date(shiftDate.team5)
    }
    return firstDate
}

function calculateDate(container,data2) {
       
    let date = getFirstDate()
    let day = data2.valueAsDate  
    let dayType = getShift(date, day)
    let userDate = new centerUserDate(day, dayType)
    userDate.showDate(container)    
}

function createBefore (container, data2) {

    let date = getFirstDate()
    for (let i=shownDaysCount; i>0; i--) {
        let secs = +data2.valueAsDate - i*86400*1000
        let day = new Date(secs)
        let dayType = getShift(date, day) 
        let userDate = new UserDate(day, dayType)
        userDate.showDate(container)
    }
}

function createAfter (container, data2) {

    let date = getFirstDate()
    for (let i=1; i<=shownDaysCount; i++) {
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
    } else if (num==13 || num==14 || num===0 || num==15) {
        result = firstShift 
    } return result
}

function getShift(date, day) {
    date = Math.round(+date/86400000)
    day = Math.round(+day/86400000)
    let someShift    
    let x, y
    if (day>=date){
        x = day-date
        if (x>14) {
            y = x%15
            someShift = compare(y)
        } else if (x>0) {    
            someShift = compare(x)
        } else if (x===0) {
            someShift = firstShift              
        }
    } else if (day<date){
        x = date-day
        if (x>15) {
            y = x%15
            someShift = compareBack(y)
            
        } else if (x==15) {                
            someShift = compareBack(x)        
        }   
        else if (x) {    
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