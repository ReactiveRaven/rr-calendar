import Range from './range/Range'

const calculateParallelColumns = (
    target: Range,
    allRanges: Range[],
    log: boolean = false
): {columns: number, index: number} => {
    let index = 0
    if (allRanges.length > 0) {
        const declaredBeforeTargetAndOverlapping = allRanges.slice(0, allRanges.indexOf(target))
            .filter(other => target.overlapsRange(other))
        const claimedIndexes = declaredBeforeTargetAndOverlapping
            .map(other => calculateParallelColumns(other, allRanges).index)
        while (claimedIndexes.indexOf(index) > -1) {
            index+= 1
        }
    }

    const columns = maxOverlaps(target, allRanges, log)

    return { columns, index }
}

const maxOverlaps = (
    target: Range,
    allRanges: Range[],
    log: boolean = false
): number => {
    const boundaryColumnsMap = calculateBoundariesMap(allRanges)
    const recursiveOverlaps = recursiveOverlapFilter(target, allRanges)
    const overlapLower = Math.min(...recursiveOverlaps.map(range => range.lower))
    const overlapUpper = Math.max(...recursiveOverlaps.map(range => range.upper))
    const totalOverlapRange = Range.fromToLessThan(overlapLower, overlapUpper)
    const totalColumns = Math.max(
        ...Array.from(boundaryColumnsMap.keys())
            .filter(other => totalOverlapRange.overlapsRange(other))
            .map(key => boundaryColumnsMap.get(key) || 0)
    )

    return totalColumns
}

const selfOverlaps = (
    target: Range,
    allRanges: Range[]
): number => {
    return allRanges.filter(other => target.overlapsRange(other)).length
}

const recursiveOverlapFilter = (target: Range,  allRanges: Range[]): Range[] => {
    const unique = (item: Range, index: number, arr: Range[]) => arr.indexOf(item) === index
    const allRangesExcludingTarget = allRanges.filter(item => item !== target)
    const localOverlaps = allRangesExcludingTarget.filter(other => target.overlapsRange(other))
    const remoteOverlaps = localOverlaps
        .map(other => recursiveOverlapFilter(other,  allRangesExcludingTarget))
        .reduce((arr,  item) => arr.concat(item), new Array<Range>())

    return [target]
        .concat(localOverlaps)
        .concat(remoteOverlaps)
        .filter(unique)
}

/**
 * Generates a 'bounary map' to show how many overlaps there are at a given time.
 *
 * i.e. one shift, 9-5, results in a map:
 *
 *     {
 *         00:00..<09:00: 0,
 *         09:00..<17:00: 1,
 *         17:00..<23:59: 0
 *     }
 *
 * @param {Range[]} allRanges
 * @returns {Map<Range, number>}
 */
export const calculateBoundariesMap = (allRanges: Range[]): Map<Range,  number> => {
    const unique = (item: number, index: number, arr: number[]) => arr.indexOf(item) === index

    return allRanges
        .reduce((arr, item) => arr.concat([ item.lower, item.upper ]), [+Infinity])
        .filter(unique)
        .sort((a, b) => a - b)
        .map((num, index, arr) =>
            Range.fromToLessThan(arr[index - 1] === undefined ? -Infinity : arr[index - 1], num)
        )
        .reduce(
            (map, range) => {
                map.set(range, selfOverlaps(range,  allRanges))
                return map
            },
            new Map<Range, number>()
        )
}



export default calculateParallelColumns
