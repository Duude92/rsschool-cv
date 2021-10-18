let timeArray = ["morning", "afternoon", "evening", "night"]
let getTimeOfDay = _ => {
    const date = new Date()
    let timeofday
    if (0 <= date.getHours() < 4)
        timeofday = 3
    else if (4 <= date.getHours() < 9)
        timeofday = 0
    else if (9 <= date.getHours() < 18)
        timeofday = 1
    else if (18 <= date.getHours() < 24)
        timeofday = 2

    return timeArray[Math.floor(date.getHours() / 6)]
}

export default getTimeOfDay