/**
 * Get Shuffled Array
 *
 * Fisher-Yates (aka Knuth) Shuffle is the de-facto unbiased
 * shuffle algorithm.
 * (source: https://github.com/coolaj86/knuth-shuffle)
 */
const getShuffledArray = () => (_array) => {
    /* Initialize current index. */
    let currentIndex = _array.length, temporaryValue, randomIndex

    /* While there remain elements to shuffle. */
    while (0 !== currentIndex) {
        /* Pick a remaining element. */
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        /* Swap it with the current element. */
        temporaryValue = _array[currentIndex]
        _array[currentIndex] = _array[randomIndex]
        _array[randomIndex] = temporaryValue
    }

    return _array
}

/* Export module. */
export default getShuffledArray
