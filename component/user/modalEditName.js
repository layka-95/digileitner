import React from 'react';
import Cookies from "universal-cookie";

class ModalEditName extends React.Component {

    constructor() {
        super(undefined);
        this.state = {
            cookie: new Cookies(),
            newName: ''
        }
    }

    closeEditModal() {
        this.props.toggleModalEditName();
    };

    getNewName = (event) => {
        this.setState({
            newName: event.target.value
        });
    };

    doEdit = () => {
        if (this.state.newName.length === 0) {
            this.props.alert('danger', 'نام نمی تواند خالی باشد!', 1500);
            return;
        }

        fetch(process.env.serverUrl + '/useredit', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                email: this.state.cookie.get('leitner_token'),
                name: this.state.newName,
            })
        }).then(() => {
            this.props.alert('success', 'ویرایش نام با موفقیت انجام شد.', 1500);
            this.props.changeName(this.state.newName);
            this.closeEditModal();
        });
    };

    render() {

        return (
            <div role="dialog" className={"rtl modal d-block modal__edit-name__top-postioner"}>
                <div role="document" className="useredit__modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">ویرایش نام</div>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-4">
                                <label htmlFor='add-box-input'>نام کاربری جدید:</label>
                                <input onChange={this.getNewName} value={this.state.newName}
                                       id='add-box-input' type='text' className='form-control'/>
                            </div>
                        </div>
                        {
                            <div className="modal-footer justify-content-between">
                                <div>
                                    <button onClick={() => this.doEdit()} type="button"
                                            className="btn btn-primary ml-1">تمام
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => this.closeEditModal()} type="button"
                                            className="btn btn-outline-danger float-left ">بستن
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalEditName;
