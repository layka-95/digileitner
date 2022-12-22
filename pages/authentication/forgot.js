import React, { Component } from 'react';

import Link from "next/link";

class Forgot extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div className="container d-flex flex-column text-right">
                    <div className="row align-items-center justify-content-center min-vh-100">
                        <div className="col-md-6 col-lg-5 col-xl-5 py-md-0">
                            <div className="card shadow zindex-100 mb-0">
                                <div className="card-body px-md-5">
                                    <div className="mb-5"><h6 className="h3">عضویت</h6>
                                        <p className="text-muted mb-0 rtl">برای بازیابی رمز عبور لطفا ایمیل خود را وارد کنید.</p>
                                    </div>
                                    <span className="clearfix" />
                                    <form>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend"><span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span></div>
                                                <input type="email" className="form-control" id="input-email" placeholder="ایمیل" /></div>
                                        </div>
                                        <div className="mt-4">
                                            <button type="button" className="btn btn-block btn-primary">ارسال</button>
                                        </div>
                                    </form>
                                    <Link href='/authentication/signin'>
                                        <a className="forgot__back-icon flaticon-left-arrow"></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default Forgot
