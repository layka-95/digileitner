import React from "react";
import Cookies from "universal-cookie";
import ModalShowAllCardShopForm from "./modalShowAllCardShopForm";
import Image from "next/image";
import Router from "next/router";

class Archiveboxshopform extends React.Component {
    constructor() {
        super();
        this.state = {
            cookie: new Cookies(),
            showModalShowAllCards: false,
            allCardsOfBox: null,
        };
    }

    toggleModalShowAll = () => {
        this.setState({
            showModalShowAllCards: this.state.showModalShowAllCards
                ? false
                : true,
            allCardsOfBox: null,
        });
    };

    showAllCards = (id) => {
        this.setState({
            showModalShowAllCards: true,
        });
    };

    addBoxToArchive = (id) => {
        fetch(process.env.serverUrl + "/box/v2/shoptoarchive", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
                box_id: id,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                // alert('بسته شما به قسمت آرشیو اضافه شد');
                // this.props.loadUserBox();
                if (response) {
                    if (response == 0) {
                        alert(
                            "برای دانلود باکس از کتابخانه لطفا اشتراک خود را تمدید کنید"
                        );
                        this.setState({
                            showModalShowAllCards: false,
                        });
                    } else {
                        this.makeUnarchive(response);
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    makeUnarchive = (id) => {
        fetch(process.env.serverUrl + "/box/unarchiver", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
                box_id: id,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                const token = this.state.cookie.get("leitner_token");
                if (token != null && token.length > 0) {
                    Router.push("/panel", undefined, { shallow: true });
                }
                alert("جعبه شما در پنل کاربری قابل استفاده است");
                this.props.loadUserBox();
            })
            .catch((err) => console.log(err));
    };

    render() {
        let itemLabels = this.props.label ? this.props.label.split(",") : [];
        const myLoader = ({ src, width, quality }) => {
            return `https://digileitner.com/${src}?w=${width}&q=${
                quality || 50
            }`;
        };

        return (
            <div className="archive__box-positioner">
                <div className="box-item card bg-dark text-white box__archive card__archive-page shop__back-color">
                    <Image
                        className="card-img h-100 card-img-sizer"
                        src={"/img/user_cards/" + this.props.image + ".png"}
                        alt="Card image"
                        loader={myLoader}
                        width={300}
                        height={280}
                    />
                    <div className="card-img-overlay text-right">
                        <h5 className="card-title card__title-positioner">
                            {this.props.title}
                        </h5>
                    </div>
                    {/* <a className=" flaticon flaticon-employee share__button-positioner"></a> */}
                    <a
                        onClick={(e) => this.showAllCards(this.props.id)}
                        className=" eye-icon archivebox__icon-eye flaticon flaticon-visibility"
                    ></a>
                    {/* <a onClick={(e) => this.addBoxToArchive(this.props.id)} className="stared-box archivebox__icon-return flaticon flaticon-add-1"></a> */}

                    <div className="card__label-div">
                        {itemLabels.map((label, i) => {
                            let founded = this.props.labels.find(
                                (i) => label === i.key
                            );

                            if (founded) {
                                return (
                                    <span
                                        key={i}
                                        className={`mb-1 badge badge-${founded.color}`}
                                    >
                                        {label ? founded.value : ""}
                                    </span>
                                );
                            }

                            return (
                                <span
                                    key={i}
                                    className={`mb-1 badge badge-${founded.color}`}
                                >
                                    {label ? founded.value : ""}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {this.state.showModalShowAllCards == true && (
                    <ModalShowAllCardShopForm
                        detaile={this.props.detaile}
                        downloaded={this.props.downloaded}
                        addBoxToArchive={() =>
                            this.addBoxToArchive(this.props.id)
                        }
                        toggleModalShowAll={this.toggleModalShowAll}
                        boxId={this.props.id}
                        title={this.props.title}
                    />
                )}
            </div>
        );
    }
}

export default Archiveboxshopform;
