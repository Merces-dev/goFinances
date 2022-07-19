async function getTime(){
    do{
        var daysEl = document.getElementById("days")
        var hoursEl = document.getElementById("hours")
        var minutesEl = document.getElementById("minutes")
        var secondsEl = document.getElementById("seconds")
        
        var randomDate =  new Date(new Date("9999-12-31T23:59:59") - new Date());        
        
        daysEl.innerText =  formatNumber(randomDate.getDay())
        hoursEl.innerText =  formatNumber(randomDate.getHours())
        minutesEl.innerText = formatNumber(randomDate.getMinutes())
        secondsEl.innerText =  formatNumber(randomDate.getSeconds())
        await sleep(1000);
    }while(true)

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const formatNumber = (num) =>{
    if(num.toString().length == 1){
        return "0" + num;
    }else{
        return num;
    }
}

getTime()