const ul = document.getElementById('ul')

let count = 1

setInterval(() => {
    const num = document.createElement('div')
const rand = parseInt(Math.random() * 360)
    num.innerHTML = count
num.style.transform = `rotate(${rand}deg)`
    ul.appendChild(num)
    count++
}, 1000)