export function isHolidayIfElse(day) {
    if (day === "土" || day === "日") {
        return true
    }
    else return false
}

export function isHolidaySwitch(day) {
    switch (day) {
        case "月":
        case "火":
        case "水":
        case "木":
        case "金":
            return false
        case "土":
        case "日":
            return true
        default:
            return false
    }
}