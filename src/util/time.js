export function dateObjToFormatStr(dateObj){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDay();
    let hour = dateObj.getHours();
    const mins = dateObj.getMinutes();

    let amPmIndicator = 'am';

    if (hour >= 12) { 
        amPmIndicator = 'pm'

        if (hour > 12){
            hour = hour - 12
        }
    }
    return `${months[month]} ${ordinalSuffixOf(day)} ${year}, ${hour}:${mins} ${amPmIndicator}`
}

function ordinalSuffixOf(i) {
    let j = i % 10;
    let k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}