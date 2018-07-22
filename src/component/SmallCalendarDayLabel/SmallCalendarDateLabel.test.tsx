import {mount} from 'enzyme'
import * as React from 'react'
import SmallCalendarDateLabel, {SmallCalendarDateLabelProps} from './SmallCalendarDateLabel'

describe('SmallCalendarDateLabel', () => {
    const TEXT = '14'

    it('should accept children, and display them.', () => {
        const component = mount(<SmallCalendarDateLabel>{TEXT}</SmallCalendarDateLabel>)
        expect(component.text()).toEqual(TEXT)
    })

    it('should add a class if the label is flagged as current', () => {
        const component = mount(
            <SmallCalendarDateLabel
                current={true}
            >
                {TEXT}
            </SmallCalendarDateLabel>
        )

        const unwrappedComponent = component.find('SmallCalendarDateLabel')
        const props = unwrappedComponent.getElement().props as SmallCalendarDateLabelProps

        expect(component.find(`.${props.classes.current}`)).toHaveLength(1)
    })

    it('should add a class if the label is flagged as focused', () => {
        const component = mount(
            <SmallCalendarDateLabel
                focused={true}
            >
                {TEXT}
            </SmallCalendarDateLabel>
        )

        const unwrappedComponent = component.find('SmallCalendarDateLabel')
        const props = unwrappedComponent.getElement().props as SmallCalendarDateLabelProps

        expect(component.find(`.${props.classes.focused}`)).toHaveLength(1)
    })

    it('should add a class if the label is flagged as active', () => {
        const component = mount(
            <SmallCalendarDateLabel
                active={true}
            >
                {TEXT}
            </SmallCalendarDateLabel>
        )

        const unwrappedComponent = component.find('SmallCalendarDateLabel')
        const props = unwrappedComponent.getElement().props as SmallCalendarDateLabelProps

        expect(component.find(`.${props.classes.active}`)).toHaveLength(1)
    })

    it('should add a class if the label is flagged as not empty', () => {
        const component = mount(
            <SmallCalendarDateLabel
                empty={false}
            >
                {TEXT}
            </SmallCalendarDateLabel>
        )

        const unwrappedComponent = component.find('SmallCalendarDateLabel')
        const props = unwrappedComponent.getElement().props as SmallCalendarDateLabelProps

        expect(component.find(`.${props.classes.nonEmpty}`)).toHaveLength(1)
    })
})