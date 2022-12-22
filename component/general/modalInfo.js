import React from 'react';

class ModalInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    closeModal() {
        this.props.toggleModalInfo();
    };

    render() {
        let {title = "", content = ""} = this.props;

        return (
            <div role="dialog" className={"rtl modal d-block modal__edit-name__top-postioner"}>
                <div role="document" className="useredit__modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-block">
                            <div className="modal-title h4 text-right">{title}</div>
                        </div>
                        <div className="text-right modal-body">
                            <div className="row">
                                <p>{content}</p>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <div>
                                <button onClick={() => this.closeModal()} type="button"
                                        className="btn btn-outline-danger float-left ">بستن
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalInfo;
