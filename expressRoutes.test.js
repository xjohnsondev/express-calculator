const { getMean, getMedian, getMode } = require("./expressRoutes");

describe("getMean", function() {
    test("get mean of array", function() {
        let array = [1,3,5,7]
        const result = getMean(array)
        expect(result).toBe(4)
    })

    test("get mean of array", function() {
        let array = [1,10,9,7,11]
        const result = getMean(array)
        expect(result).toBe(7.6)
    })
})

describe("getMedian", function() {
    test("get median of array", function() {
        let array = [1,3,5,7]
        const result = getMedian(array)
        expect(result).toBe(5)
    })

    test("get median of array", function() {
        let array = [1,10,9,7,11]
        const result = getMedian(array)
        expect(result).toBe(9)
    })
})

describe("getMedian", function() {
    test("get mode of array", function() {
        let array = [1,3,5,7]
        const result = getMode(array)
        expect(result).toBe(1)
    })

    test("get mode of array", function() {
        let array = [1,3,5,7,7,5,5]
        const result = getMode(array)
        expect(result).toBe(5)
    })
})