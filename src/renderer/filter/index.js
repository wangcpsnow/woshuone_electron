/**
 * title: filter
 * author: wangchunpeng
 */
export function parseTime (time) {
    if (!time) {
        return '';
    }
    // time = time.replace(/-/gi, '/');
    // time = time.split('.')[0];
    time = new Date(time);
    var year = time.getFullYear(),
        month = time.getMonth() + 1,
        day = time.getDate(),
        h = time.getHours(),
        m = time.getMinutes(),
        s = time.getSeconds();
    return year + '.' + numHandler(month) + '.' + numHandler(day) + ' ' + numHandler(h) + ':' + numHandler(m) + ':' + numHandler(s);
}

function numHandler (num) {
    if(num < 10) {
        return '0' + num;
    }
    return num;
}