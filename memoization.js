memoization = (function() {
    var cache = {}

    return function(func) {
        return function (...args) {
            key = func+args
            if (key in cache)
                return cache[key]
            else
                return (cache[key] = func.apply(this, args))
        }
    }
})()


function multiply(x, y){
    return x * y
}

function sum(x, y) {
    return x + y
}


memoization(multiply)(1 ,2)
memoization(multiply)(1 ,3)
memoization(multiply)(1 ,2)
memoization(sum)(1 ,3, 4)
memoization(sum)(10)
memoization(sum)(10)