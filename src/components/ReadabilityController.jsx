import React, { Component } from 'react'
//
import "../scss/components/readability-controller.scss"

class ReadabilityController extends Component {
    state = {
        targetElement: null,
        collapsed: true
    }

    componentDidMount() {
        if (this.state.targetElement) return

        let targetElem
        let observer
        const onMutate = () => {
            console.log("got event")
            targetElem = document.querySelector(this.props.target)
            if (!targetElem) return
            console.log("got target", targetElem)
            observer.disconnect()
            this.setState({ ...this.state, targetElement: targetElem })
        }
        observer = new MutationObserver(onMutate)
        observer.observe(document.body, { subtree: true, attributes: false, childList: true })
        onMutate()
    }

    toggleHiddenState() {
        this.setState({ ...this.state, collapsed: !this.state.collapsed })
    }

    render() {
        if (!this.state.targetElement) return null

        const Frame = ({ children }) => (
            <section className={`readability-controller ${this.state.collapsed ? "collapsed" : "expnaded"}`} data-target={this.props.target}>
                <div className="title-row">
                    <button
                        className="expand-button"
                        onClick={() => this.toggleHiddenState()}
                        aria-label={`${this.state.collapsed ? "Expand" : "Collapse"} readability controller`}>
                        {!this.state.collapsed && <h1>Readability</h1>}
                        <span>{this.state.collapsed ? "<" : ">"}</span>
                        {this.state.collapsed && <h1>Readability</h1>}
                    </button>
                </div>
                {children}
            </section>
        )

        if (this.state.collapsed) {
            return <Frame/>
        }
        else {
            return (
                <Frame>
                    <label>
                        <span>Line Height:</span>
                        <input type="range"
                            name="line-height"
                            min=".75"
                            max="2"
                            step=".01"
                            onChange={evt => {
                                this.state.targetElement.style.lineHeight = evt.currentTarget.value
                                localStorage.setItem("preffered-line-height", evt.currentTarget.value)
                            }}
                            onSeeked={() => console.log("lh seeked")}
                            defaultValue={this.state.targetElement.style.lineHeight} />
                    </label>
                    <label>
                        <span>Font Size:</span>
                        <input type="range"
                            name="font-size"
                            min=".5"
                            max="2"
                            step=".01"
                            onChange={evt => {
                                this.state.targetElement.style.fontSize = `${evt.currentTarget.value}em`
                                localStorage.setItem("preffered-font-size", evt.currentTarget.value)
                            }}
                            defaultValue={this.state.targetElement.style.fontSize.replace("em", "")||1} />
                    </label>
                </Frame>
            )
        }
    }
}

export default ReadabilityController