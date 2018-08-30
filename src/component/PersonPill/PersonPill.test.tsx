import {mount} from 'enzyme'
import * as React from 'react'
import { undecorated as PersonPill } from './PersonPill'

describe('PersonPill', () => {
    it('should render without crashing', () => {
        expect(() => mount(<PersonPill person={{name: 'John Smith'}}/>)).not.toThrow()
    })

    it('should render western names as first/last initial', () => {
        expect(mount(<PersonPill person={{name: 'John Smith'}}/>).text())
            .toEqual('JS')
        expect(mount(<PersonPill person={{name: 'Rory Cellan-Jones'}}/>).text())
            .toEqual('RC')
        expect(mount(<PersonPill person={{name: 'David Matthew Godfrey'}}/>).text())
            .toEqual('DG')
    })

    it('should handle mononyms as single initials', () => {
        expect(mount(<PersonPill person={{name: 'Cher'}}/>).text())
            .toEqual('C')
    })

    it('should render two-character names as-is', () => {
        expect(mount(<PersonPill person={{name: '张伟'}}/>).text())
            .toEqual('张伟')
    })

    it('should show the full name as a tooltip', () => {
        expect(
            mount(<PersonPill person={{ name: 'John Smith'}}/>)
                .find('Tooltip')
                .prop('title')
        )
            .toEqual('John Smith')
    })
})
