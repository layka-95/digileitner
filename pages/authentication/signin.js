import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import Alert from "../../component/general/alert";


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cookie: new Cookies(),
            email: "",
            password: "",

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

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
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
            this.alert('danger', 'ایمیل معتبر نیست!', 1000);
            return;
        }

        if (this.state.password.length < 6) {
            this.alert('danger', 'رمزعبور معتبر نیست!', 1000);
            return;
        }

        fetch(process.env.serverUrl + '/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email.toLowerCase(),
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response == 0) {
                    this.alert('danger', 'نام کاربری یا رمزعبور اشتباه است!', 1500);
                } else if (response[1] == 1) {
                    this.state.cookie.set('leitner_token', response[0], { path: '/' });
                    this.state.cookie.set('leitner_panel', response[2], { path: '/' });
                    Router.push('/adminpanel', undefined, { shallow: true });
                } else {
                    this.state.cookie.set('leitner_token', response, { path: '/' });
                    Router.push('/panel', undefined, { shallow: true });
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

        return (
            <div>
                <div className="container d-flex flex-column text-right">
                    <div className="row align-items-center justify-content-center min-vh-100">
                        <div className="col-md-6 col-lg-5 col-xl-5 py-md-0">
                            <div className="card shadow zindex-100 mb-0">
                                <div className="card-body px-md-5">
                                    <div className="mb-5"><h6 className="h3">ورود</h6>
                                        <p className="text-muted mb-0 rtl">برای شروع وارد شوید.</p>
                                    </div>
                                    <span className="clearfix"></span>
                                    <form>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend"><span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span></div>
                                                <input tabIndex={1} onChange={this.onEmailChange} onKeyUp={this.checkEnter} type="email" className="form-control" id="input-email" placeholder="ایمیل" /></div>
                                        </div>
                                        <div className="form-group mb-0">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div><label className="form-control-label">&nbsp;</label></div>
                                                <div className="mb-2"><a onClick={this.togglePassword} href="#" className="small text-muted text-underline--dashed border-primary" data-toggle="password-text" data-target="#input-password">{this.state.passwordTypeHint} رمزعبور</a></div>
                                            </div>
                                            <div className="input-group">
                                                <div className="input-group-prepend"><span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg></span></div>
                                                <input tabIndex={2} onChange={this.onPasswordChange} onKeyUp={this.checkEnter} type={this.state.passwordType} className="form-control" id="input-password" placeholder="رمزعبور" /></div>
                                        </div>
                                        <div className="mt-4">
                                            <button tabIndex={3} onClick={this.onSubmit} type="button" className="btn btn-block btn-primary">ورود</button>
                                        </div>
                                    </form>
                                    <Link href='/authentication/forgot'>
                                        <a className="mt-3 small font-weight-bold">رمز عبور خود را فراموش کردید؟</a>
                                    </Link>
                                </div>
                                <div className="card-footer px-md-5">
                                    <small>حساب کاربری ندارید؟</small>
                                    &nbsp;
                                    <Link href='/authentication/signup'>
                                        <a className="small font-weight-bold">ایجاد کنید</a>
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


export default SignIn
