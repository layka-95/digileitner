import React from "react";
import ModalEditName from "../user/modalEditName";
import Alert from "../general/alert";
import ModalEditPassword from "../general/modalEditPassword";
import ModalInfo from "../general/modalInfo";
import Cookies from "universal-cookie";
import Contact from "./contact";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";

import {
    FaTelegram,
    FaRegGrinTongue,
    FaRegGrinTongueWink,
    FaRegGrinTongueSquint,
    FaRegGrinTears,
    FaRegGrinStars,
    FaRegGrinSquint,
    FaRegGrinSquintTears,
    FaRegGrinHearts,
    FaRegGrinBeam,
} from "react-icons/fa";
import Router from "next/router";

class Profile extends React.Component {
    constructor() {
        super();

        this.state = {
            cookie: new Cookies(),
            displayMode: "d-block",
            showModalEditName: false,
            showModalEditPassword: false,
            showModalInfo: false,
            alert_type: null,
            alert_message: null,
            alert_timeout: 1500,
            user: null,
            name: "",
            email: "",
            showModalContact: null,
            iconIs: "",
            loadingForPay: false,
        };
    }

    componentDidMount() {
        const token = this.state.cookie.get("leitner_token");
        fetch(process.env.serverUrl + "/profile/" + token, {
            method: "get",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.token === token) {
                    this.setState({
                        user: response,
                        name: response.name,
                        email: response.email,
                    });
                } else {
                    this.state.cookie.set("leitner_token", null, {
                        expires: new Date(),
                    });
                    Router.push("/", undefined, { shallow: true });
                    return;
                }
            });
        this.makeRandom();
    }

    makeRandom = () => {
        const rndInt = Math.floor(Math.random() * 10) + 1;
        this.setState({
            iconIs: rndInt,
        });
    };
    closeModal = () => {
        this.setState({
            displayMode: "none",
        });
        this.props.closeProfile();
    };

    changeName = (newName) => {
        this.setState({
            name: newName,
        });
    };

    buyPlan = (code) => {
        this.setState(
            {
                loadingForPay: true,
            },
            () => {
                fetch(process.env.serverUrl + "/buylink", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token: this.state.cookie.get("leitner_token"),
                        plancode: code,
                    }),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.link) {
                            Router.push(response.link, undefined, {
                                shallow: true,
                            });
                            return;
                        } else {
                            this.alert(
                                "danger",
                                "خطایی در دریافت لینک پرداخت رخ داده است!",
                                3000
                            );
                        }
                    });
            }
        );
    };

    toggleModalEditName = () => {
        this.setState({
            showModalEditName: !this.state.showModalEditName,
        });
    };

    toggleModalInfo = () => {
        this.setState({
            showModalInfo: !this.state.showModalInfo,
        });
    };

    alert = (type, message, timeout) => {
        this.setState({
            alert_type: type,
            alert_message: message,
            alert_timeout: timeout,
        });
    };

    toggleModalEditPassword = () => {
        this.setState({
            showModalEditPassword: !this.state.showModalEditPassword,
        });
    };

    toggleModalContact = () => {
        this.setState({
            showModalContact: 1,
            alert_type: "",
            alert_message: "",
            alert_timeout: "",
        });
    };

    toggleCloseContact = () => {
        this.setState({
            showModalContact: 0,
        });
    };

    render() {
        return (
            <div
                role="dialog"
                className={`rtl modal ${this.state.displayMode}`}
            >
                <div role="document" className="modal-dialog">
                    <div className="modal-content archive__showallcardcontroller fade-in-right">
                        <div className="modal-header profile__header-modal modal__btn">
                            <div className="modal-title h4 shop__title"></div>
                            <div className="shop__see-all-icon-on-top">
                                <li
                                    className="list-shop-icon pl-3 pr-1 postcard_shop-page closeshop"
                                    onClick={this.closeModal}
                                >
                                    <img
                                        src="../img/icons/arrow-right.png"
                                        alt=""
                                        className="arrow__icon-shop"
                                    />
                                </li>
                            </div>
                        </div>
                        <div className="modal-body flex-row mz-scroll show-all-card profile__padding">
                            <div className=" d-lg-block">
                                <div className="profile__top-box-postioner profile__top-box-styler ">
                                    {/* {console.log(this.state.iconIs)} */}

                                    {/* {this.state.iconIs == 1 ? (
                                        <FaRegGrinTongue
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {this.state.iconIs == 2 ? (
                                        <FaRegGrinTongueWink
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {this.state.iconIs == 3 ? (
                                        <FaRegGrinTongueSquint
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {this.state.iconIs == 4 ? (
                                        <FaRegGrinTears
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {this.state.iconIs == 5 ? (
                                        <FaRegGrinStars
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {this.state.iconIs == 6 ? (
                                        <FaRegGrinSquint
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {this.state.iconIs == 7 ? (
                                        <FaRegGrinSquintTears
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {this.state.iconIs == 8 ? (
                                        <FaRegGrinHearts
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {this.state.iconIs == 9 ? (
                                        <FaRegGrinBeam
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {this.state.iconIs == 10 ? (
                                        <FaRegGrinWink
                                            size="6rem"
                                            color="gray"
                                            className="blog__back-icon pt-4"
                                        />
                                    ) : (
                                        ""
                                    )} */}
                                </div>
                            </div>

                            <div className="profile__title-format profile__tf">
                                <p className="profile__padding-text fa-fonter">
                                    حساب کاربری
                                </p>
                            </div>
                            <div className="profile__outer-styler">
                                <span
                                    className="profile__btitle-format"
                                    onClick={() => this.toggleModalEditName()}
                                >
                                    <img
                                        src="../img/icons/edit.png"
                                        alt=""
                                        className="openbook_shop-page-p"
                                    />{" "}
                                    {this.state.name}
                                </span>
                            </div>

                            <div className="profile__outer-styler">
                                <span className="profile__btitle-format">
                                    <span>
                                        <a
                                            alt=""
                                            className="openbook_shop-page-p"
                                        >
                                            {" "}
                                        </a>
                                    </span>{" "}
                                    {this.state.email}{" "}
                                </span>
                            </div>
                            <div className="profile__outer-styler">
                                <span
                                    className="profile__btitle-format ptf__second fa-fonter"
                                    onClick={() =>
                                        this.toggleModalEditPassword()
                                    }
                                >
                                    <img
                                        src="../img/icons/lock.png"
                                        alt=""
                                        className="openbook_shop-page-p"
                                    />{" "}
                                    تغییر رمز عبور
                                </span>
                            </div>
                            <div className="profile__outer-styler">
                                <Link href="/archive">
                                    <span
                                        className="profile__btitle-format ptf__second fa-fonter"
                                        onClick={this.closeModal}
                                    >
                                        <img
                                            src="../img/icons/comment.png"
                                            alt=""
                                            className="openbook_shop-page-p"
                                        />{" "}
                                        آرشیو شخصی
                                    </span>
                                </Link>
                            </div>

                            <div className="profile__title-format d-none d-lg-block">
                                <p className="profile__padding-text profile__title-format fa-fonter">
                                    ارتباط با ما
                                </p>
                            </div>
                            <div className="profile__outer-styler">
                                <span
                                    className="profile__btitle-format ptf__second fa-fonter"
                                    onClick={() => this.toggleModalContact()}
                                >
                                    <img
                                        src="../img/icons/comment.png"
                                        alt=""
                                        className="openbook_shop-page-p"
                                    />
                                    ثبت پیام
                                </span>
                            </div>
                            <div className="profile__outer-styler">
                                <p className="profile__btitle-format ptf__second fa-fonter ">
                                    <span className="pl-3">پشتیبانی در تلگرام</span>
                                    <a href="https://t.me/digileitner">
                                        <FaTelegram size={'2rem'}/>
                                    </a>
                                </p>
                            </div>

                            <div className="profile__title-format d-none d-lg-block">
                                <p className="profile__padding-text profile__title-format fa-fonter">
                                    طرح ها
                                </p>
                                {/* {console.log(this.state.user)} */}
                            </div>
                            {this.state.loadingForPay ? (
                                <div className="m-3 text-center">
                                    در حال اتصال به صفحه پرداخت...
                                </div>
                            ) : (
                                <div className="m-3 text-right">
                                    {!this.state.user ||
                                    !this.state.user.plan ? (
                                        <div className="ptf__second fa-fonter">
                                            <p>
                                                برای استفاده از همه امکانات
                                                سایت، طرح مورد نظر خود را
                                                خریداری کنید:
                                                <a
                                                    onClick={() =>
                                                        this.toggleModalInfo()
                                                    }
                                                    href="#"
                                                    className="text-primary"
                                                >
                                                    اطلاعات بیشتر
                                                </a>
                                            </p>
                                            <div className="d-flex justify-content-around">
                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() =>
                                                        this.buyPlan("MONTH_3")
                                                    }
                                                >
                                                    طرح سه ماهه
                                                    <br />
                                                    <small>۵۰ هزار تومان</small>
                                                </button>
                                                <button
                                                    className="btn btn-outline-success"
                                                    onClick={() =>
                                                        this.buyPlan("MONTH_6")
                                                    }
                                                >
                                                    طرح شش ماهه
                                                    <br />
                                                    <small>۷۵ هزار تومان</small>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="ptf__second fa-fonter">
                                            <span>
                                                شما دارای طرح فعال{" "}
                                                {this.state.user?.plan?.code ===
                                                "MONTH_3"
                                                    ? "سه ماهه"
                                                    : "شش ماهه"}{" "}
                                                هستید.
                                            </span>

                                            <br />
                                            <span>
                                                <b>
                                                    {Math.floor(
                                                        (new Date(
                                                            this.state.user?.plan?.exp_date
                                                        ).getTime() -
                                                            new Date().getTime()) /
                                                            86400000
                                                    )}
                                                </b>{" "}
                                                روز مانده به اتمام طرح
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {this.state.showModalEditName == true && (
                    <ModalEditName
                        toggleModalEditName={this.toggleModalEditName}
                        changeName={this.changeName}
                        alert={this.alert}
                        loadUserInfo={this.loadUserInfo}
                    />
                )}

                {this.state.showModalContact === 1 && (
                    <Contact
                        toggleModalContact={this.toggleModalContact}
                        toggleCloseContact={this.toggleCloseContact}
                        changeName={this.changeName}
                        alert={this.alert}
                        loadUserInfo={this.loadUserInfo}
                    />
                )}

                {this.state.showModalEditPassword == true && (
                    <ModalEditPassword
                        email={this.props.userInfo.email}
                        toggleModalEditPassword={this.toggleModalEditPassword}
                        alert={this.alert}
                    />
                )}

                {this.state.alert_message != null && (
                    <Alert
                        alert={this.alert}
                        timeout={this.state.alert_timeout}
                        type={this.state.alert_type}
                        message={this.state.alert_message}
                    />
                )}

                {this.state.showModalInfo == true && (
                    <ModalInfo
                        title={"خرید طرح"}
                        content={
                            "با خرید طرح های ماهانه، میتوانید به همه اطلاعات فروشگاه دسترسی داشته باشید"
                        }
                        toggleModalInfo={this.toggleModalInfo}
                    />
                )}
            </div>
        );
    }
}

export default Profile;
