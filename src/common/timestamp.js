function dateFormat(timestamp, format = "YYYY-MM-dd hh:mm:ss") {
    const date = new Date(timestamp);
    let res = format;
    var o = {
        "M+": date.getMonth() + 1, // month
        "d+": date.getDate(), // day
        "h+": date.getHours(), // hour
        "m+": date.getMinutes(), // minute
        "s+": date.getSeconds(), // second
        "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
        "S": date.getMilliseconds()
    }
    if (/([y|Y]+)/.test(res)) {
        res = res.replace(/([y|Y]+)/, () => date.getFullYear());
    }
    for (var k in o) {
        const regE = new RegExp("(" + k + ")");
        if (regE.test(res)) {
            res = res.replace(regE, () => o[k]);
        }
    }
    return res;
}

module.exports = { dateFormat }