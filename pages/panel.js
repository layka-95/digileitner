import React, {Component} from "react";
import Head from "next/head";
import Router from "next/router";
import Cookies from "universal-cookie";
import Box from "../component/user/box";
import ModalAddBox from "../component/general/modalAddBox";
import ModalAddCard from "../component/general/modalAddCard";
import ModalShowAllCard from "../component/user/modalShowAllCard";
import Card from "../component/user/card";
import Alert from "../component/general/alert";
import Profile from "../component/user/profile";
import Timeline from "../component/general/timeline";
import Guide from "../component/general/guide";
import Image from "next/image";
import Menu from "../component/general/menubar";

const axios = require("axios");

class panel extends Component {
    constructor() {
        super();

        this.state = {
            cookie: new Cookies(),

            user: null,
            showProfile: null,

            showModalAddBox: false,
            showModalCards: false,
            modalCardsType: "",
            showModalAddCard: false,
            showModalShowAllCards: false,
            allCardsOfBox: null,

            boxes: [],
            beforeSearchBox: [],
            selectedBox: null,

            editModeBox: false,
            editableId: null,
            editableTitle: null,

            editModeCard: false,
            editableCard: null,

            inSearchMode: false,

            selectedModeClass: "",

            timelineStateAnime1: "",
            timelineStateAnime2: "",
            startTimeline: false,

            alert_type: null,
            alert_message: null,
            alert_timeout: 1500,
            hasBox: false,
            userCountOfCards: 0,
            showGuide: 0,
            pageRendered: 0,

            isContentLoaded: false,
        };
    }

    componentDidMount() {
        const panel = this.state.cookie.get("leitner_panel");
        if (panel == "PQtA8JBPQtA8JB") {
            Router.push("/adminpanel", undefined, {shallow: true});
            return;
        }

        const token = this.state.cookie.get("leitner_token");
        if (typeof token == typeof undefined) {
            Router.push("/", undefined, {shallow: true});
            return;
        }

        if (token) {
            fetch(process.env.serverUrl + "/profile/" + token, {
                method: "get",
                headers: {"Content-Type": "application/json"},
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.token === token) {
                        this.setState({
                            user: response,
                        });
                    } else {
                        this.state.cookie.set("leitner_token", null, {
                            expires: new Date(),
                        });
                        Router.push("/", undefined, {shallow: true});
                        return;
                    }
                });
        } else {
            Router.push("/", undefined, {shallow: true});
            return;
        }

        this.loadUserBox();

        this.prepareTimeline();

        this.getAllCards();

        setTimeout(() => {
            this.checkPayment();
        }, 2000)
    }

    checkPayment = () => {
        let {status, order_id, track_id, id} = Router.query;

        if (status && order_id && id) {
            fetch(process.env.serverUrl + "/buyverify", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    token: this.state.cookie.get("leitner_token"),
                    status: status,
                    orderId: order_id,
                    trackId: track_id,
                    payId: id
                })
            }).catch(err => console.log(''))
                .then((response) => response.json())
                .then(response => {
                    if (response.code) {
                        if (response.code == 200) {
                            alert('پرداخت با موفقیت انجام شد!');
                            Router.push("/panel", undefined, {shallow: true});
                            this.setState({
                                showProfile: true,
                            });
                            
                        } else {
                            alert('خطایی رخ داده است' + ': ' + response.code);
                        }
                    } else {
                        // console.log(response);
                    }
                })
        }
    }

    prepareTimeline = () => {
        let timelineTimer = setInterval(
            function () {
                if (this.state.timelineStateAnime1 == "") {
                    this.setState({
                        timelineStateAnime1: "goUp",
                    });
                } else if (this.state.timelineStateAnime2 == "") {
                    this.setState({
                        timelineStateAnime2: "goUp",
                        startTimeline: true,
                    });
                    clearInterval(timelineTimer);
                }
            }.bind(this),
            100
        );
    };

    SignOut = () => {
        fetch(process.env.serverUrl + "/signout", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
            }),
        }).then((response) => {
            if (response !== 0) {
                this.state.cookie.set("leitner_token", null, {
                    expires: new Date(),
                });
                Router.push("/", undefined, {shallow: true});
            }
        });
    };

    loadUserBox = () => {
        this.setState({
            selectedBox: null,
        });

        fetch(process.env.serverUrl + "/box/call", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                var loadedBoxes = [];
                response.map((item, i) => {
                    item = {...item, index: i + 1};
                    loadedBoxes.push(item);
                });

                this.setState({
                    boxes: loadedBoxes,
                    beforeSearchBox: loadedBoxes,
                    isContentLoaded: true,
                });
            });
    };

    toggleModalShowAll = () => {
        this.setState({
            showModalShowAllCards: this.state.showModalShowAllCards
                ? false
                : true,
            allCardsOfBox: null,
        });
    };

    toggleModalStop = (event) => {
        if (typeof event !== typeof undefined) event.stopPropagation();
    };
    toggleModalAddBox = (event, id, title, image) => {
        if (typeof event !== typeof undefined) event.stopPropagation();

        this.setState({
            showModalAddBox: this.state.showModalAddBox ? false : true,
            editModeBox:
                typeof id != typeof undefined &&
                typeof title != typeof undefined
                    ? true
                    : false,
            editableId: typeof id != typeof undefined ? id : null,
            editableTitle: typeof title != typeof undefined ? title : null,
            editableImage: typeof image != typeof undefined ? image : null,
        });
    };

    selectBox = (id) => {
        var selBox = this.state.boxes.find((x) => x.id === id);

        fetch(process.env.serverUrl + "/box/status", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
                box_id: selBox.id,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                selBox = {...selBox, btnStatus: response};

                this.setState({
                    selectedBox: selBox,
                    selectedModeClass: "selected-mode ",
                });
            });
    };

    showAllCards = () => {
        if (this.state.selectedBox == null) return;

        this.setState({
            showModalShowAllCards: true,
        });
    };

    showProfile = () => {
        this.setState({
            showProfile: true,
        });
    };

    closeProfile = () => {
        this.setState({
            showProfile: null,
        });
    };

    showGuide() {
        this.setState({
            showGuide: 1,
        });
    }

    closeGuide = () => {
        this.setState({
            showGuide: 0,
        });
    };

    loadCards = (type) => {
        if (this.state.selectedBox == null) return;

        let method = type == "review" ? "today" : "v2/call";

        axios
            .post(process.env.serverUrl + "/card/" + method, {
                token: this.state.cookie.get("leitner_token"),
                box_id: this.state.selectedBox.id,
            })
            .then(function (response) {
                if (response.status == 205) {
                   alert("برای استفاده از جعبه‌های دانلود شده از کتابخانه اکانت خود را تمدید کنید!");
                   return;
                } else if (response.status == 404) {
                    responseEmpty();
                }
                else if (response.data == "") {
                    responseEmpty();
                } else {
                    return response.data;
                }
            })
            .then((response) => {
               
                if (response == undefined) {
                    return;
                 }
                if (response) {
                    if (Array.isArray(response) && response.length > 0) {
                        let selBox = this.state.selectedBox;
                        selBox = {...selBox, cards: response};

                        this.setState({
                            selectedBox: selBox,
                            showModalCards: true,
                            modalCardsType: type,
                        });
                    } else {
                        this.setState({
                            showModalCards: false,
                        });
                    }
                } else {
                    this.alert("info", "جعبه شما بروزرسانی شد!");
                    fetch(process.env.serverUrl + "/card/finish", {
                        method: "post",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            token: this.state.cookie.get("leitner_token"),
                            box_id: this.state.selectedBox.id,
                        }),
                    }).then((respose) => {
                        if (respose.status < 400)
                            this.selectBox(this.state.selectedBox.id);
                    });
                }
            });

        var responseEmpty = () => {
            this.alert("info", "جعبه شما بروزرسانی شد!");

            fetch(process.env.serverUrl + "/card/finish", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    token: this.state.cookie.get("leitner_token"),
                    box_id: this.state.selectedBox.id,
                }),
            }).then((respose) => {
                if (respose.status < 400)
                    this.selectBox(this.state.selectedBox.id);
            });
        };
    };

    addCard = () => {
        if (this.state.selectedBox == null) return;

        this.setState({
            showModalAddCard: true,
        });
    };

    editCard = (card) => {
        this.setState({
            showModalAddCard: true,
            editableCard: card,
            editModeCard: true,
        });
    };

    closeAddEditCard = (type) => {
        this.setState({
            showModalAddCard: false,
            editModeCard: false,
            editableCard: null,
        });

        if (type == "review") {
            // Refresh box button
            this.loadCards(type);
        } else {
            this.selectBox(this.state.selectedBox.id);
        }
    };

    closeCardReview = () => {
        this.setState({
            showModalCards: false,
        });

        // Refresh box button
        this.selectBox(this.state.selectedBox.id);
    };

    searchBox = (event) => {
        const searchValue = event.target.value;
        if (searchValue.length <= 0) {
            this.setState({
                inSearchMode: false,
                boxes: this.state.beforeSearchBox,
            });
        } else {
            this.setState({
                inSearchMode: true,
                boxes: this.state.boxes.filter(function (box) {
                    return box.title.includes(searchValue);
                }),
            });
        }
    };

    backToPanel = () => {
        this.setState({
            selectedModeClass: "",
            selectedBox: null,
        });
    };

    alert = (type, message, timeout) => {
        this.setState({
            alert_type: type,
            alert_message: message,
            alert_timeout: timeout,
        });
    };

    getAllCards = () => {
        fetch(process.env.serverUrl + "/box/cardnumberfromboxes", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    userCountOfCards: response[0].count,
                    pageRendered: 1,
                });
            });
    };

    render() {
        const myLoader = ({src, width, quality}) => {
            return `https://digileitner.com/${src}?w=${width}&q=${
                quality || 100
            }`;
        };

        return (
            <div>
                <Head>
                    <title>پنل کاربری</title>
                    <meta
                        name="description"
                        content="making your own flashcard package"
                    />
                </Head>

                <Menu
                    showProfile={() => this.showProfile()}
                    showGuide={() => this.showGuide()}
                    signOut={() => this.SignOut()}
                    borderRouter="panel"
                />

                <div className="row">
                    <main
                        className={
                            this.state.selectedModeClass +
                            " d-none d-md-block d-xl-block col-md-8 col-xl-8 bd-content panel__main panel__main-col panel__bc-box-selected"
                        }
                    >
                        <h2 className="mb-0 selected-box-title text-right rtl pr-3 ">
                            {this.state.selectedBox !== null ? (
                                <div>
                                    <span
                                        onClick={this.backToPanel}
                                        className="d-sm-inline d-md-none btn-back-panel flaticon-left-arrow box__icon-positioner"
                                    ></span>
                                    {this.state.selectedBox.title}{" "}
                                </div>
                            ) : (
                                <div>یک جعبه انتخاب کن...</div>
                            )}
                        </h2>

                        <div className="text-center main-image-wrapper image__vertically-center">
                            <Image
                                className="main-image"
                                src={
                                    this.state.selectedBox !== null
                                        ? "/img/user_cards/" +
                                        this.state.selectedBox.image +
                                        ".png"
                                        : "/img/user_cards/main.png"
                                }
                                width={590}
                                height={450}
                                loader={myLoader}
                            />
                        </div>

                        {this.state.selectedBox !== null && (
                            <div className="panel__btn-container">
                                <button
                                    onClick={this.showAllCards}
                                    className="action-card-btn btn btn-info"
                                >
                                    مدیریت کارت‌ها
                                </button>
                                {this.state.selectedBox.btnStatus.Start ==
                                    "on" && (
                                        <button
                                            onClick={() => this.loadCards("start")}
                                            className="action-card-btn btn btn-primary"
                                        >
                                            شروع
                                        </button>
                                    )}
                                {this.state.selectedBox.btnStatus.Continue ==
                                    "on" && (
                                        <button
                                            onClick={() =>
                                                this.loadCards("continue")
                                            }
                                            className="action-card-btn btn btn-primary"
                                        >
                                            ادامه
                                        </button>
                                    )}
                                {this.state.selectedBox.btnStatus.Cardreview ==
                                    "on" && (
                                        <button
                                            onClick={() => this.loadCards("review")}
                                            className="action-card-btn btn btn-light text-body"
                                        >
                                            مرور کارت‌های امروز
                                        </button>
                                    )}
                                {this.state.selectedBox.btnStatus.AddCard ==
                                    "on" && (
                                        <button
                                            onClick={this.addCard}
                                            className="action-card-btn btn btn-dribbble"
                                        >
                                            اضافه کردن کارت
                                        </button>
                                    )}
                            </div>
                        )}
                    </main>

                    <div
                        id="sidebar-boxes"
                        className={
                            this.state.selectedModeClass +
                            "  d-md-block d-xl-block col-md-4 col-xl-4 px-4"
                        }
                    >
                        <div className="timeline-panel text-right fade-in">
                            {this.state.startTimeline == true && (
                                <div className="fade-in">
                                    <h4 className="rtl text__font-size-info-title"></h4>
                                    {/* <h5 className="rtl text__font-size-info">
                                        ضمن عذرخواهی بابت مشکل احتمالی در پنل
                                        کاربری، اگر برای لود شدن کارت ها مشکلی
                                        وجود داره لطفا کش مرورگر را با استفاده
                                        از Ctrl+F5 یا تنظیمات مرورگر خالی کنید و
                                        در صورت بروز مجدد مشکل پیام دهید و از
                                        طریق ایمیل در ارتباط خواهیم بود. ممنون
                                    </h5> */}

                                    <Timeline/>
                                </div>
                            )}
                        </div>

                        {/* started here */}
                        {this.state.boxes.length != 0 && (
                            <div className="py-4">
                                <input
                                    onChange={this.searchBox}
                                    className="form-control bg-gradient-light rtl"
                                    placeholder="جستجوی جعبه"
                                />
                            </div>
                        )}

                        {this.state.isContentLoaded ? (
                            <div className="boxed-container mz-scroll">


                                {this.state.boxes.length == 0 && (
                                    <div className="mb-2 form-control bg-gradient-green text-right">
                                        <h5 className="rtl">
                                            برای شروع، یک جعبه ایجاد کنید.
                                        </h5>
                                    </div>
                                )}

                                {this.state.boxes.length != 0 &&
                                this.state.userCountOfCards == 0 ? (
                                    <div className="mb-2 form-control bg-gradient-green text-right">
                                        <p className="rtl text__font-size-info">
                                            برای ایجاد کارت، بر روی تصویر جعبه
                                            کلیک کنید{" "}
                                        </p>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="boxes-side">
                                    {this.state.boxes.map((item, i) => {
                                        return (
                                            <Box
                                                loadUserBox={this.loadUserBox}
                                                backToPanel={this.backToPanel}
                                                selectBox={this.selectBox}
                                                toggleModalAddBox={
                                                    this.toggleModalAddBox
                                                }
                                                toggleModalStop={
                                                    this.toggleModalStop
                                                }
                                                key={i}
                                                index={item.index}
                                                id={item.id}
                                                title={item.title}
                                                star={item.star}
                                                image={item.image}
                                            />
                                        );
                                    })}
                                    {this.state.boxes.length < 100 &&
                                    !this.state.inSearchMode ? (
                                        <div
                                            onClick={this.toggleModalAddBox}
                                            className="add-card-box card bg-white text-white"
                                        >
                                            <a className="text-black-50 flaticon flaticon-add-1"></a>
                                            <div className="card-img-overlay text-right">
                                                <h5 className="card-title">
                                                    جعبه جدید اضافه کن
                                                </h5>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                {this.state.boxes.length == 0 && (
                                    <div className="img-container">
                                        <img
                                            className="flex-item"
                                            src={"/img/no-card.gif"}
                                            alt={""}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="make_center">
                                <div className="lds-heart">
                                    <div></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {this.state.showModalAddBox == true && (
                        <ModalAddBox
                            editMode={this.state.editModeBox}
                            editableId={this.state.editableId}
                            editableTitle={this.state.editableTitle}
                            editableImage={this.state.editableImage}
                            loadUserBox={this.loadUserBox}
                            getAllCards={this.getAllCards}
                            toggleModalAddBox={this.toggleModalAddBox}
                            alert={this.alert}
                        />
                    )}

                    {this.state.showModalCards == true && (
                        <Card
                            editCard={this.editCard}
                            type={this.state.modalCardsType}
                            boxId={this.state.selectedBox.id}
                            cards={this.state.selectedBox.cards}
                            closeCardReview={this.closeCardReview}
                        />
                    )}

                    {this.state.showModalAddCard == true &&
                        this.state.selectedBox != null && (
                            <ModalAddCard
                                editMode={this.state.editModeCard}
                                editableCard={this.state.editableCard}
                                boxId={this.state.selectedBox.id}
                                loadCards={this.loadCards}
                                getAllCards={this.getAllCards}
                                closeModal={this.closeAddEditCard}
                                alert={this.alert}
                            />
                        )}

                    {this.state.showModalShowAllCards == true &&
                        this.state.selectedBox != null && (
                            <ModalShowAllCard
                                loadCardDrawer={this.showAllCards}
                                cards={this.state.allCardsOfBox}
                                toggleModalShowAll={this.toggleModalShowAll}
                                boxId={this.state.selectedBox.id}
                                title={this.state.selectedBox.title}
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

                    {this.state.showProfile != null && (
                        <Profile
                            closeProfile={this.closeProfile}
                            userInfo={this.state.user}
                        />
                    )}
                    {this.state.showGuide === 1 && (
                        <Guide closeGuide={this.closeGuide}/>
                    )}
                </div>
            </div>
        );
    }
}

// export default getAllCards
export default panel;
