import React from 'react';

function Loading() {
    return <div>页面加载中...</div>;
}

export default function asyncComponent(importComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            }
        }

        componentDidMount() {
            importComponent().then((cmp) => {
                this.setState({ component: cmp.default });
            })
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : <Loading />;
        }
    };
}