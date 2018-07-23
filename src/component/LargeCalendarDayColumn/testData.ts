import IConcreteEvent from '../../model/IConcreteEvent'

// tslint:disable:no-magic-numbers
export const generateDay = (date: Date, classNames: string[][]): IConcreteEvent[] => {
    return [
        {
            accentClassName: pickClasses(classNames, 0)[1],
            attributes: { 'Role': 'GP' },
            className: pickClasses(classNames, 0)[0],
            end: makeHour(date,  22),
            location: { name: 'Headingley' },
            people: [
                { name: 'John Dorian' }
            ],
            start: makeHour(date, 18)
        },
        {
            accentClassName: pickClasses(classNames, 1)[1],
            attributes: { 'Role': 'GP' },
            className: pickClasses(classNames, 1)[0],
            end: makeHour(date,  22),
            location: { name: 'Hyde Park' },
            people: [
                { name: 'Perry Cox' }
            ],
            start: makeHour(date, 18)
        },
        {
            accentClassName: pickClasses(classNames, 2)[1],
            attributes: { 'Role': 'GP' },
            className: pickClasses(classNames, 2)[0],
            end: makeHour(date, 22),
            location: { name: 'Horsforth' },
            people: [
                { name: 'Christopher Turk' }
            ],
            start: makeHour(date, 18)
        },
        {
            accentClassName: pickClasses(classNames, 3)[1],
            attributes: { 'Role': 'Nurse' },
            className: pickClasses(classNames, 3)[0],
            end: makeHour(date, 22),
            location: { name: 'Horsforth' },
            people: [
                { name: 'Laverne Roberts' }
            ],
            start: makeHour(date, 18)
        },
        {
            accentClassName: pickClasses(classNames, 4)[1],
            attributes: { 'Role': 'Supervisor' },
            className: pickClasses(classNames, 4)[0],
            end: makeHour(date, 22),
            location: { name: 'Horsforth' },
            people: [
                { name: 'Robert Kelso' }
            ],
            start: makeHour(date, 18)
        },
        {
            accentClassName: pickClasses(classNames, 5)[1],
            attributes: {'Role': 'Receptionist'},
            className: pickClasses(classNames, 5)[0],
            end: makeHour(date, 22),
            location: {name: 'Horsforth'},
            people: [
                {name: 'Janine Melnitz'}
            ],
            start: makeHour(date, 18)
        },
        {
            accentClassName: pickClasses(classNames, 5)[1],
            attributes: {'Role': 'Receptionist'},
            className: pickClasses(classNames, 5)[0],
            end: makeHour(date, 22),
            location: {name: 'Headingley'},
            people: [
                {name: 'Janine Melnitz'}
            ],
            start: makeHour(date, 18)
        },
        {
            accentClassName: pickClasses(classNames, 5)[1],
            attributes: {'Role': 'Receptionist'},
            className: pickClasses(classNames, 5)[0],
            end: makeHour(date, 22),
            location: {name: 'Hyde Park'},
            people: [
                {name: 'Janine Melnitz'}
            ],
            start: makeHour(date, 18)
        },
        {
            accentClassName: pickClasses(classNames, 5)[1],
            attributes: {'Role': 'GP'},
            className: pickClasses(classNames, 5)[0],
            end: makeHour(date, 17),
            location: {name: 'Ilkley'},
            people: [
                {name: 'Elliot Reid'}
            ],
            start: makeHour(date, 9)
        },
        {
            accentClassName: pickClasses(classNames, 5)[1],
            attributes: {'Role': 'GP'},
            className: pickClasses(classNames, 5)[0],
            end: makeHour(date, 22),
            location: {name: 'Ilkley'},
            people: [
                {name: 'Molly Clock'}
            ],
            start: makeHour(date, 17, 30)
        },
        {
            accentClassName: pickClasses(classNames, 5)[1],
            attributes: {'Role': 'GP'},
            className: pickClasses(classNames, 5)[0],
            end: makeHour(date, 16),
            location: {name: 'Home Visit'},
            people: [
                {name: 'Denise Mahoney'}
            ],
            start: makeHour(date, 10)
        },
        {
            accentClassName: pickClasses(classNames, 5)[1],
            attributes: {'Role': 'Driver'},
            className: pickClasses(classNames, 5)[0],
            end: makeHour(date, 16),
            location: {name: 'Home Visit'},
            people: [
                {name: 'Aloysius Parker'}
            ],
            start: makeHour(date, 10)
        },
        {
            accentClassName: pickClasses(classNames, 5)[1],
            attributes: {'Role': 'GP'},
            className: pickClasses(classNames, 5)[0],
            end: makeHour(date, 22),
            location: {name: 'Home Visit'},
            people: [
                {name: 'Dough Murphy'}
            ],
            start: makeHour(date, 16)
        },
        {
            accentClassName: pickClasses(classNames, 5)[1],
            attributes: {'Role': 'Driver'},
            className: pickClasses(classNames, 5)[0],
            end: makeHour(date, 22),
            location: {name: 'Home Visit'},
            people: [
                {name: 'Lloyd Christmas'}
            ],
            start: makeHour(date, 16)
        },
        {
            accentClassName: pickClasses(classNames, 6)[1],
            attributes: { 'Role': 'GP' },
            className: pickClasses(classNames, 6)[0],
            end: makeHour(date, 22),
            location: { name: 'Home Visit' },
            people: [
                { name: 'Drew Suffin' }
            ],
            start: makeHour(date, 14)
        }
    ]
        .sort((a, b) => a.start.getTime() - b.start.getTime())
}
// tslint:enable:no-magic-numbers

const pickClasses = (classNames: string[][], index: number): string[] =>
    classNames[index % classNames.length]

const makeHour = (date: Date, hour: number, minute: number = 0): Date => {
    const newDate = new Date(date)
    newDate.setHours(hour, minute, 0, 0)
    return newDate
}
