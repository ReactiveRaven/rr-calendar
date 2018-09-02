import * as highlightjs from 'highlight.js'
import * as React from 'react'

interface IHighlightOwnProps {
    className?: string
    language: string
}

interface IHighlightState {
    codeRef: React.RefObject<HTMLElement>
}

export default class Highlight extends React.Component<IHighlightOwnProps, IHighlightState> {
    public readonly state: IHighlightState

    constructor(props: IHighlightOwnProps) {
        super(props)

        this.state = {
            codeRef: React.createRef()
        }
    }

    public componentDidMount() {
        highlightjs.highlightBlock(this.state.codeRef.current!)
    }

    public componentDidUpdate(prevProps: IHighlightOwnProps, prevState: IHighlightState) {
        // highlightjs.initHighlighting.called = false
        highlightjs.highlightBlock(this.state.codeRef.current!)
    }

    public render() {
        const {
            children,
            className,
            language,
        } = this.props

        const {
            codeRef
        } = this.state

        return (
            <pre
                className={className}
            >
                <code
                    className={language}
                    ref={codeRef}
                >
                    {children}
                </code>
            </pre>
        )
    }
}