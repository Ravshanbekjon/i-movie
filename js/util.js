const selectElem = (element, wrapper = document) => wrapper.querySelector(element, wrapper);
const createElem = (element) => document.createElement(element)

const normalizeDate = (time) => {
    let date = new Date(time)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return day + "." + month + "." + year
}