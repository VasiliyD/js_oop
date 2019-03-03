function sum(...args) {
    let sum = 0
    for (let arg of args)
        sum += arg
    return sum
}

sum(1,2,3)
sum(1)