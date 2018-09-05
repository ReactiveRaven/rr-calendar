import IConcreteEvent from '../model/IConcreteEvent'
import ISwimlane from '../model/ISwimlane'
import {calculateBoundariesMap} from './calculateParallelColumns'
import Range from './range/Range'

const calculateSwimlanes = (
    swimlaneForEvent: (event: IConcreteEvent) => string,
    events: IConcreteEvent[]
): ISwimlane[] => {

    const swimlaneEventMap = events.reduce(
        (map, event) => {
            const swimlaneName = swimlaneForEvent(event)
            map.set(swimlaneName, (map.get(swimlaneName) || []).concat([event]))
            return map
        },
        new Map<string, IConcreteEvent[]>()
    )

    return Array.from(swimlaneEventMap.keys())
        .sort()
        .map((label): ISwimlane => {
            const swimlaneEvents = swimlaneEventMap.get(label)!
            const swimlaneRanges = swimlaneEvents
                .map(event => Range.fromToLessThan(event.start, event.end))
            const columnsForSwimlane = Math.max(
                ...Array.from(calculateBoundariesMap(swimlaneRanges).values())
            )
            return {
                label,
                unitHeight: columnsForSwimlane
            }
        })
}

export default calculateSwimlanes
