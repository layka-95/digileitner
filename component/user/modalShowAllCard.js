import React, { Component } from "react";
import ModalAddCard from "../general/modalAddCard";
import Alert from "../general/alert";
import Cookies from "universal-cookie";

class ModalShowAllCard extends React.Component {
    constructor() {
        super();

        this.state = {
            cookie: new Cookies(),
            displayMode: "d-block",
            showModalAddCard: false,
            editableCard: "",
            alert_type: null,
            alert_message: null,
            alert_timeout: 1500,
            userFilter: "",
            cards: [],
            loaded: false,
        };
    }

    closeModal = () => {
        this.setState({
            displayMode: "none",
        });
        this.props.toggleModalShowAll();
    };

    alert = (type, message, timeout) => {
        this.setState({
            alert_type: type,
            alert_message: message,
            alert_timeout: timeout,
        });
        this.props.loadCardDrawer();
    };

    editCard = (arg) => {
        this.setState({
            showModalAddCard: true,
            editModeCard: true,
            editableCard: arg,
        });
    };

    searchInput = (event) => {
        this.setState({
            userFilter: event.target.value.toLowerCase(),
        });
    };
    componentDidMount() {
        this.showAllCards();
    }

    closeAddEditCard = (type) => {
        this.setState({
            showModalAddCard: false,
            editModeCard: false,
            editableCard: null,
        });
        this.refreshLoadCard();
    };

    refreshLoadCard = () => {
        fetch(process.env.serverUrl + "/card/showall", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
                box_id: this.props.boxId,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    cards: response,
                });
            });
    };

    showAllCards = () => {
        fetch(process.env.serverUrl + "/card/showall", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
                box_id: this.props.boxId,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    cards: response,
                    loaded: true,
                });
            });
    };

    render() {
        const CardCounter = function (q) {
            var counter = 0;
            {
                q.map((a) => {
                    counter = counter + 1;
                });
            }
            return counter;
        };

        const starShower = (starNumber) => {
            if (starNumber < 2) {
                return (
                    <div className="card__stars">
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star0.png" alt="" />
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star0.png" alt="" />
                    </div>
                );
            }
            if ((starNumber > 1) & (starNumber < 4)) {
                return (
                    <div className="card__stars">
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star0.png" alt="" />
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />
                    </div>
                );
            }
            if ((starNumber > 3) & (starNumber < 8)) {
                return (
                    <div className="card__stars">
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star0.png" alt="" />
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />
                    </div>
                );
            }
            if ((starNumber > 7) & (starNumber < 17)) {
                return (
                    <div className="card__stars">
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star0.png" alt="" />
                        <img src="../img/icons/star1.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />
                    </div>
                );
            }
            if ((starNumber > 16) & (starNumber < 32)) {
                return (
                    <div className="card__stars">
                        <img src="../img/icons/star0.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />
                        <img src="../img/icons/star1.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />
                    </div>
                );
            }
            if (starNumber > 31) {
                return (
                    <div className="card__stars">
                        <img src="../img/icons/star1.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />
                        <img src="../img/icons/star1.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />{" "}
                        <img src="../img/icons/star1.png" alt="" />
                    </div>
                );
            }
        };

        return (
            <div
                role="dialog"
                className={`rtl modal ${this.state.displayMode}`}
            >
                {/* {console.log(this.state.cards)} */}
                <div role="document" className="modal-dialog">
                    <div className="modal-content archive__showallcardcontroller fade-in-right">
                        <div className="modal-header modal-header-bc">
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
                                <li className="list-shop-icon pl-3 pr-1">
                                    <img
                                        src="../img/icons/postcard.png"
                                        alt=""
                                        className="openbook_shop-page"
                                    />
                                </li>
                                {CardCounter(this.state.cards)}
                            </div>
                        </div>
                        <div className="title_allcards modal-header-bc modal-title h4 shop__title">
                            {this.props.title}{" "}
                        </div>
                        <div className=" search__onshop-controller">
                            <input
                                type="text"
                                onChange={this.searchInput}
                                className="shop__add-button modal-header-bc search__onshop form-control bg-gradient-light rtl"
                                placeholder="جستجو"
                            />
                            <img
                                src="../img/icons/search.png"
                                alt=""
                                className="search__icon"
                                id="myInput"
                            />
                        </div>
                        <div className="modal-body flex-row mz-scroll show-all-card showallcard__card-panel-outer">
                            {this.state.loaded === false && (
                                <div className="loading-heart">
                                    {" "}
                                    <div className="lds-heart">
                                        <div></div>
                                    </div>{" "}
                                </div>
                            )}
                            {this.state.loaded === true && (
                                <div className="card__module-w">
                                    {this.state.cards
                                        .sort(
                                            (secondItem, firstItem) =>
                                                firstItem.position -
                                                secondItem.position
                                        )
                                        .filter(
                                            (cards) =>
                                                cards.top
                                                    .toLowerCase()
                                                    .includes(
                                                        this.state.userFilter
                                                    ) ||
                                                cards.bottom
                                                    .toLowerCase()
                                                    .includes(
                                                        this.state.userFilter
                                                    )
                                        )
                                        .map((item, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={
                                                        " my-2 text-right showallcard__card-panel"
                                                    }
                                                >
                                                    <div className="parent__pen">
                                                        <a
                                                            onClick={() =>
                                                                this.editCard({
                                                                    id: item.id,
                                                                    top: item.top,
                                                                    bottom: item.bottom,
                                                                })
                                                            }
                                                            className="flaticon flaticon-pencil edit__card-pen"
                                                        ></a>
                                                    </div>
                                                    <div className="m-0 panel__card-top">
                                                        <br />
                                                        <p className="rtl__modal word__break-stoper enter__handler font__card">
                                                            {item.top.includes(
                                                                "ps://leitnersys.ir/images/card"
                                                            ) ? (
                                                                <div className="imag__top-show-all">
                                                                    <img
                                                                        src={
                                                                            item.top
                                                                        }
                                                                        className="form-group preview image__add-module-object image__top-showall"
                                                                        alt={
                                                                            "No File To Show!!!"
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : (
                                                                item.top
                                                            )}
                                                        </p>
                                                        <div className="stars__controllers">
                                                            {" "}
                                                            {starShower(
                                                                item.position
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="m-0 shop__card-bottom enter__handler">
                                                        <br />
                                                        <strong>
                                                            <p className="rtl__modal word__break-stoper font__card">
                                                                {item.bottom.includes(
                                                                    "ps://leitnersys.ir/images/card"
                                                                ) ? (
                                                                    <img
                                                                        src={
                                                                            item.bottom
                                                                        }
                                                                        className="form-group preview image__add-module-object image__top-showall"
                                                                        alt={
                                                                            "No File To Show!!!"
                                                                        }
                                                                    />
                                                                ) : (
                                                                    item.bottom
                                                                )}
                                                            </p>
                                                        </strong>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {this.state.alert_message != null && (
                    <Alert
                        alert={this.alert}
                        timeout={this.state.alert_timeout}
                        type={this.state.alert_type}
                        message={this.state.alert_message}
                    />
                )}

                {this.state.showModalAddCard == true && (
                    <ModalAddCard
                        editMode={this.state.editModeCard}
                        editableCard={this.state.editableCard}
                        closeModal={this.closeAddEditCard}
                        alert={this.alert}
                    />
                )}
            </div>
        );
    }
}

export default ModalShowAllCard;
