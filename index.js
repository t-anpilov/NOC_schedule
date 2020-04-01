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


closeBtn.addEventListener('click', closeInput)

btn.addEventListener('click', ()=>{
    cleanBox(outputWindow)
    createBefore(lastDate, outputWindow)
    calculateDate(outputWindow, firstDate, lastDate)    
    createAfter(lastDate, outputWindow)
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
        shownDay.innerHTML = `<p>${this.date.toLocaleString("uk", options)}</p><p>${this.shift}</p>`
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
    let dayType = ''
    let x, y
    if (day>=date){
        x = (day-date)/86400000
    } else {
        alert('look forward!')
    }
    if (x>14) {
        y = x%15
        dayType = compare(y)
    } else if (x) {    
        dayType = compare(x)        
    } 
    let userDate = new centerUserDate(day, dayType)
    userDate.showDate(container)    
}

function createBefore (date, container) {
    for (let i=3; i>0; i--) {
        let secs = +date.valueAsDate - i*86400*1000
        let day = new Date(secs)
        let otherDate = new UserDate(day, null)
        otherDate.showDate(container)
    }
}

function createAfter (date, container) {
    for (let i=1; i<=3; i++) {
        let secs = +date.valueAsDate + i*86400*1000
        let day = new Date(secs)
        let otherDate = new UserDate(day, null)
        otherDate.showDate(container)
    }
}

function compare(num) { 
    let result
    if (num==14 || num==13 || num==12 || num==8 || num==7 || num==6) {
        result = 'day off'
    } else  if (num==11 || num==10 || num==9) {
        result = 'night shift'
    } else  if (num==5 || num==4 || num==3) {
        result = 'second shift'
    } else if (num==2 || num===1 || num===0) {
        result = 'first shift' 
    } return result
}

/*function addZero(num) {
    if (num<10 && num>0){
        num = '0' + num
    }
    return num
}*/

function cleanBox(box) {
    while(box.lastChild){
        box.removeChild(box.lastChild)
    }
}