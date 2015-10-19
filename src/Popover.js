/**
 * Popover Component for uxcore
 * @author eternalsky
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

let Tooltip = require("rc-tooltip");
let Button = require("uxcore-button");

class Popover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }



    handleOkClick() {
        let me = this;
        me.setState({
            visible: false
        }, () => {
            me.props.onOk()
        });
    }

    handleCancelClick() {
        let me = this;
        me.setState({
            visible: false
        }, () => {
            me.props.onCancel()
        });
    }

    handleVisibleChange(visible) {
        this.setState({
            visible: visible
        })
    } 

    _renderButton() {
        let me = this;
        if (me.props.showButton) {
            return <div className={me.props.prefixCls + "-button-group"}>
                        <Button size="small" type="primary" onClick={me.handleOkClick.bind(me)}>{me.props.okText}</Button>
                        <Button size="small" type="secondary" onClick={me.handleCancelClick.bind(me)}>{me.props.cancelText}</Button>
                   </div>
        }
    }

    _generateOverlay() {
        let me = this;
        let arr = [];
        if (me.props.title) {
            arr.push(<div key="title" className={me.props.prefixCls + '-title'}>
                        {me.props.title}
                    </div>);
        }
        if (me.props.overlay) {
            arr.push(<div key="content" className={me.props.prefixCls + '-content'}>
                        {me.props.overlay}
                        {me._renderButton()}
                    </div>);
        }
        return <div>
                {arr}
               </div>
    }

    render() {
        let me = this;

        let transitionName = ({
            top: 'zoom-down',
            bottom: 'zoom-up',
            left: 'zoom-right',
            right: 'zoom-left'
        })[me.props.placement];

        return (
            <Tooltip placement={me.props.placement}
                   overlayClassName={'uxcore'}
                   prefixCls={me.props.prefixCls}
                   visible={me.state.visible}
                   onVisibleChange={me.handleVisibleChange.bind(me)}
                   delay={me.props.delay}
                   transitionName={transitionName}
                   trigger={me.props.trigger}
                   overlay={me._generateOverlay()}>
                {me.props.children}
            </Tooltip>
        );
    }
}

Popover.defaultProps = {
    prefixCls: 'kuma-popover',
    delay: 0.1,
    placement: "top",
    trigger: "hover",
    onOk: () => {},
    onCancel: () => {},
    okText: "确定",
    cancelText: "取消",
    showButton: false
}



// http://facebook.github.io/react/docs/reusable-components.html
Popover.propTypes = {
    prefixCls: React.PropTypes.string,
    delay: React.PropTypes.number,
    placement: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    trigger: React.PropTypes.oneOf(['hover', 'click']),
    onOk: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    okText: React.PropTypes.string,
    cancelText: React.PropTypes.string,
    showButton: React.PropTypes.bool
}


Popover.displayName = "Popover";

module.exports = Popover;
