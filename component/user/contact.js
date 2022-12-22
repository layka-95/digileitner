import React from 'react';
import Cookies from "universal-cookie";

class Contact extends React.Component {

    constructor() {
        super(undefined);
        this.state = {
            cookie: new Cookies(),
            newmsg: '',
            user: '',
            email: '',
            name: '',
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);

        const token = this.state.cookie.get('leitner_token');
        if (typeof token == typeof undefined) {
            Router.push('/', undefined, {shallow: true});
            return;
        }


        fetch(process.env.serverUrl + '/profile/' + token, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},

        }).then(response => response.json())
            .then(response => {
                if (response.token === token) {
                    this.setState({
                        email: response.email,
                        name: response.name,
                    })
                } else {
                    this.state.cookie.set('leitner_token', null, {expires: new Date()});
                    Router.push('/', undefined, {shallow: true});
                    return;
                }
            })

        // this.LoadUserInfo();
    }

    toggleModalContact() {
        this.props.toggleCloseContact();
    };

    getNewName = (event) => {
        this.setState({
            newmsg: event.target.value
        });
    };


    doEdit = () => {
        if (this.state.newmsg.length === 0) {
            this.props.alert('danger', 'نام نمی تواند خالی باشد!', 1500);
            return;
        }

        fetch(process.env.serverUrl + '/commentadd', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                email: this.state.email,
                comment: this.state.newmsg,
                name: this.state.name,
            })
        }).then(() => {
            this.props.alert('success', ' پیام شما با موفقیت ارسال شد.', 1500);
            this.toggleModalContact();
        });
    };

    render() {

        return (
            <div role="dialog" className={"rtl modal d-block modal__edit-name__top-postioner"}>
                <div role="document" className="useredit__modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4"> ارتباط با ما</div>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-4">
                                <label htmlFor='add-box-input'>پیام جدید</label>
                                <input onChange={this.getNewName} value={this.state.newName}
                                       id='add-box-input' type='text' className='form-control'/>
                                <hr/>
                            </div>
                        </div>
                        {
                            <div className="modal-footer justify-content-between">
                                <div>
                                    <button onClick={() => this.doEdit()} type="button"
                                            className="btn btn-primary ml-1">ارسال
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => this.toggleModalContact()} type="button"
                                            className="btn btn-outline-danger float-left ">بیخیال شو
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

export default Contact;
