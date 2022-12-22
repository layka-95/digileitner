import React from 'react';
import Cookies from "universal-cookie";

class UserInfo extends React.Component {

    constructor() {
        super();
        this.state = {
            cookie: new Cookies(),
        }
    }

    render() {
        return (
            <div className="profile__top-box-postioner profile__top-box-styler fade-in">

                <img src="https://img.icons8.com/cute-clipart/64/000000/eyes-cartoon.png" />
                <div className="profile__user-id-text profile__fadein-div profile__pencil-icon">{this.props.username}<span className="profile__text-pass" />
                    <a onClick={() => this.props.toggleModalEditName()} className='flaticon-pencil profile__pencil-icon box-item' /></div>
                <div className="profile__user-id-text profile__email-font profile__fadein-div">{this.props.email}</div>
                <div className="profile__user-id-text profile__fadein-div profile__pencil-icon"><p className="profile__text-pass">رمز عبور</p>
                    <a onClick={() => this.props.toggleModalEditPassword()} className='flaticon-pencil profile__pencil-icon box-item' /></div>


            </div>
        );
    }
}

export default UserInfo;
