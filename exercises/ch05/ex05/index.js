export function filterEvenProperties(obj) {
    const result = {}
    for (const key in obj){
        if(obj[key] % 2 === 0){
            result[key] = obj[key]
        }
    }
    return result
}