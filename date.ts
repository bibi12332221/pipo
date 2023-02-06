module.exports.getDateToday = getDateToday
function getDateToday(){
    const dataOption : Intl.DateTimeFormatOptions = {
        weekday: 'long' ,
        year:'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Date().toLocaleDateString('th-TH',dataOption);
}