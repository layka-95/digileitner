import React from 'react';

class Alert extends React.Component {

    constructor() {
        super();
        this.state = {
            display: 'show'
        }
    }

    close = () => {
        this.setState({
            display: ''
        });
    }

    render() {
        setTimeout(
            function () {
                this.setState({
                    display: '',
                });
                this.props.alert(null, null, null);
            }
                .bind(this),
            (this.props.timeout > 0) ? this.props.timeout : 1500
        );

        return (
            <div className={`alert alert-${this.props.type} alert-dismissible fade ${this.state.display}`} role="alert">
                {this.props.message}
                <button onClick={this.close} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">باشه</span>
                </button>
            </div>
        )
    }
}

export default Alert;