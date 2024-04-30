export function fibonacciWhile() {
    let first = 1
    let second = 1
    const result = [first, second]
    let count = 2

    while (count < 10) {
        const next = first + second
        result.push(next)
        first = second
        second = next
        count++
    }
    return result
}

export function fibonacciDoWhile() {
    let first = 1
    let second = 1
    const result = [first, second]
    let count = 2

    do{
    const next = first + second
    result.push(next)
    first = second
    second = next
    count++
    }while (count < 10)

    return result
}

export function fibonacciFor() {
    const result = [1, 1]
    for (let i = 2; i < 10; i++) {
        const next = result[i-1] + result[i-2]
        result.push(next)
    }
    return result
}