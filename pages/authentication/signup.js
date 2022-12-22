import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import Alert from "../../component/general/alert";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cookie: new Cookies(),
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",

            passwordType: "password",
            passwordTypeHint: "نمایش",

            alert_type: null,
            alert_message: null,
            alert_timeout: 1500,
        }
    }


    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onPasswordConfirmChange = (event) => {
        this.setState({
            passwordConfirm: event.target.value
        })
    }

    togglePassword = () => {
        var newStatus = (this.state.passwordType == 'password') ? 'text' : 'password';
        var newHint = (this.state.passwordType == 'password') ? 'پنهان کردن' : 'نمایش';
        this.setState({
            passwordType: newStatus,
            passwordTypeHint: newHint,
        });
    }


    componentDidMount() {
        const token = this.state.cookie.get('leitner_token');
        if (token != null && token.length > 0) {
            Router.push('/panel', undefined, { shallow: true });
        }
    }


    onSubmit = () => {

        if (/.+@.+\..+/.test(this.state.email) == false) {
            this.alert('danger', 'ایمیل معتبر نمی‌باشد!', 1000);
            return;
        }

        if (this.state.password.length < 6) {
            this.alert('danger', 'رمزعبور باید حداقل ۶ کاراکتر باشد!', 1500);
            return;
        }

        if (this.state.password !== this.state.passwordConfirm) {
            this.alert('danger', 'رمزعبور و تایید آن برابر نیستند!', 1500);
            return;
        }

        fetch(process.env.serverUrl + '/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name.toLowerCase(),
                email: this.state.email.toLowerCase(),
                password: this.state.password,
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response !== 0) {
                    this.state.cookie.set('leitner_token', response, { path: '/' });
                    Router.push('/panel', undefined, { shallow: true });

                } else {
                    this.alert('danger', 'این ایمیل قبلا ثبت شده است!', 2000);
                }
            })
    }

    checkEnter = (event) => {
        if (event.keyCode == 13) {
            this.onSubmit();
        }
    }

    alert = (type, message, timeout) => {
        this.setState({
            alert_type: type,
            alert_message: message,
            alert_timeout: timeout
        })
    }


    render() {

        const cookies = new Cookies();
        const token = cookies.get('leitner_token');
        if (token != null && token.length > 0) {
            Router.push('/panel', undefined, { shallow: true });
        }

        return (
            <div>
                <div className="container d-flex flex-column text-right">
                    <div className="row align-items-center justify-content-center min-vh-100">
                        <div className="col-md-6 col-lg-5 col-xl-5 py-md-0">
                            <div className="card shadow zindex-100 mb-0">
                                <div className="card-body px-md-5 ">
                                    <div className="mb-5">
                                        <h6 className="h3">عضویت</h6>
                                        <p className="text-muted mb-0 rtl">برای شروع یک حساب کاربری ایجاد کنید.</p>
                                    </div>
                                    <span className="clearfix"></span>
                                    <form>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend"><span className="input-group-text">@</span></div>
                                                <input tabIndex={1} onKeyUp={this.checkEnter} onChange={this.onEmailChange} type="email" className="form-control" id="input-email" placeholder="ایمیل" /></div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend"><span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span></div>
                                                <input tabIndex={2} onKeyUp={this.checkEnter} onChange={this.onNameChange} type="text" className="form-control" id="input-name" placeholder="نام" /></div>
                                        </div>
                                        <div className="form-group mb-0">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div><label className="form-control-label">&nbsp;</label></div>
                                                <div className="mb-2"><a onClick={this.togglePassword} href="#" className="small text-muted text-underline--dashed border-primary" data-toggle="password-text" data-target="#input-password">{this.state.passwordTypeHint} رمزعبور</a></div>
                                            </div>
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend"><span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg></span></div>
                                                <input tabIndex={3} onKeyUp={this.checkEnter} onChange={this.onPasswordChange} type={this.state.passwordType} className="form-control" id="input-password" placeholder="رمزعبور" />
                                            </div>
                                            <div className="input-group">
                                                <div className="input-group-prepend"><span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg></span></div>
                                                <input tabIndex={4} onKeyUp={this.checkEnter} onChange={this.onPasswordConfirmChange} type="password" className="form-control" id="input-password-confirm" placeholder="تایید رمزعبور" />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button tabIndex={5} onClick={this.onSubmit} type="button" className="btn btn-block btn-primary">ثبت نام</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer px-md-5">
                                    <small>حساب کاربری دارید؟</small>
                                    &nbsp;
                                    <Link href='/authentication/signin'>
                                        <a className="small font-weight-bold">وارد شوید</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.alert_message != null &&
                    <Alert alert={this.alert} timeout={this.state.alert_timeout} type={this.state.alert_type} message={this.state.alert_message} />
                }

            </div>
        );
    }

}

export default SignUp;
