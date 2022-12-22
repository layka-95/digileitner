import React from 'react';
import Cookies from "universal-cookie";

class ModalProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            cookie: new Cookies(),
        }
    }


    render() {

        if (typeof this.props.user === typeof undefined) {
            return (
                <div></div>
            );
        } else {

            return (
                <div role="dialog" className="rtl modal d-block">
                    <div role="document" className="modal-dialog modal-card">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">اطلاعات کاربری</h5>
                                <button onClick={this.props.closeModal} type="button" className="close"><span className='closing'>بستن</span></button>
                            </div>
                            <div className="modal-body text-center">
                                <label>نام</label>
                                <h4 className="pb-3">{this.props.user.name}</h4>
                                <label>ایمیل</label>
                                <h4 className="pb-3">{this.props.user.email}</h4>
                                <label>شروع عضویت از</label>
                                <h4 className="pb-3">{this.props.user.reg_time}</h4>
                            </div>
                            <div className="modal-footer text-center">
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ModalProfile;
