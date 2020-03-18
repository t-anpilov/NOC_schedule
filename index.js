const outputWindow = document.getElementById('date_output')
const firstDate = document.getElementById('first_date')
const lastDate = document.getElementById('last_date')
const closeBtn = document.getElementById('close')
const btn = document.getElementById('do')


closeBtn.addEventListener('click', closeInput)

btn.addEventListener('click', ()=>{
    calculateDate(outputWindow, firstDate, lastDate)
})

function closeInput() {
    firstDate.disabled = true  
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
        showDate(container, day, dayType)
    } else if (x) {    
        dayType = compare(x)
        showDate(container, day, dayType)
    }        
}

function showDate(elem, data, text) {
    let day = +data.getDate()
    let d = addZero(day)
    let month = +data.getMonth() + 1
    let m = addZero(month)
    let y = +data.getFullYear()
    elem.innerHTML = d + '.' + m + '.' + y + ' - ' + text
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

function addZero(num) {
    if (num<10 && num>0){
        num = '0' + num
    }
    return num
}