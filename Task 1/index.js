let tempArray = [];
let nestedFlat = [1, [2, 3], 4];
function flattenArray(arr) {
    for (let i = 0; i <= arr.length; i++) {
        if (Array.isArray(arr[i])) {
            flattenArray(arr[i]);
        } else {

            tempArray.push(arr[i]);
        }
    }
}
flattenArray(nestedFlat)
console.log(tempArray)


