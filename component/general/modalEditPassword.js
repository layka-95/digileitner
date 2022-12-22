import React from 'react';
import Cookies from "universal-cookie";

class ModalEditPassword extends React.Component {

    constructor() {
        super(undefined);
        this.state = {
            cookie: new Cookies(),
            oldPassword: '',
            newPassword: ''
        }
    }

    closeEditModal() {
        this.props.toggleModalEditPassword();
    };

    getOldPassword = (event) => {
        this.setState({
            oldPassword: event.target.value
        });
    };

    getNewPassword = (event) => {
        this.setState({
            newPassword: event.target.value
        });
    };

    doEdit = () => {
        if (this.state.oldPassword.length === 0) {
            this.props.alert('danger', 'رمز عبور نمی تواند خالی باشد!', 1500);
            return;
        }

        if (this.state.newPassword.length === 0) {
            this.props.alert('danger', 'رمز عبور جدید نمی تواند خالی باشد!', 1500);
            return;
        }

        fetch(process.env.serverUrl + '/passedit', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.props.email,
                oldpass: this.state.oldPassword,
                password: this.state.newPassword
            })
        })

            .then(response => {
                if (response.status < 400) {
                    this.props.alert('success', 'تغییر رمز عبور با موفقیت انجام شد.', 1500);
                    this.closeEditModal();
                } else {
                    this.props.alert('danger', 'رمز عبورقبلی صحیح نیست .', 1500);
                    this.closeEditModal();
                }

            });
    };

    render() {

        return (
            <div role="dialog" className={"rtl modal d-block modal__edit-password__top-postioner"}>
                <div role="document" className="useredit__modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">ویرایش رمز عبور</div>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-4">
                                <label htmlFor='add-box-input'>رمز عبور فعلی:</label>
                                <input onChange={this.getOldPassword} value={this.state.oldPassword}
                                       id='add-box-input' type='password' className='form-control'/>
                            </div>
                            <div className="row mb-4">
                                <label htmlFor='add-box-input'>رمز عبور جدید:</label>
                                <input onChange={this.getNewPassword} value={this.state.newPassword}
                                       id='add-box-input' type='password' className='form-control'/>
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

export default ModalEditPassword;
