import React from "react";
import Cookies from "universal-cookie";
import Image from "next/image";
import { CircularProgressbar } from "react-circular-progressbar";

class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            cookie: new Cookies(),
            cardIndex: 0,
            viewBottom: false,
            rotateCardAnimation: "",
            finish: false,
            progress: 0,
        };
    }

    goPrevNext = (direction) => {
        var index = 0;
        if (direction == 1) {
            index = this.state.cardIndex + 1;
            if (index >= this.props.cards.length) index = 0;
        } else if (direction == 0) {
            index = this.state.cardIndex - 1;
            if (index < 0) index = this.props.cards.length - 1;
        }

        this.setState({
            cardIndex: index,
            rotateCardAnimation:
                this.state.rotateCardAnimation == "rotateY360"
                    ? "rotateY360R"
                    : "",
            viewBottom: false,
        });
    };

    answer = (cardId, knows) => {
        fetch(process.env.serverUrl + "/card/knows", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
                card_id: cardId,
                knows: knows,
            }),
        })
            .then((respose) => respose.json())
            .then((response) => {
                if (this.state.cardIndex + 1 < this.props.cards.length) {
                    this.setState({
                        cardIndex: this.state.cardIndex + 1,
                        progress: Math.round(
                            (
                                (this.state.cardIndex + 1) /
                                this.props.cards.length
                            ).toFixed(2) * 100
                        ),
                        rotateCardAnimation:
                            this.state.rotateCardAnimation == "rotateY360"
                                ? "rotateY360R"
                                : "",
                        viewBottom: false,
                    });
                } else {
                    fetch(process.env.serverUrl + "/card/finish", {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            token: this.state.cookie.get("leitner_token"),
                            box_id: this.props.boxId,
                        }),
                    })
                        .then((respose) => respose.json())
                        .then((response) => {
                            this.setState({
                                progress: 100,
                                finish: true,
                            });
                        });
                }
            });
    };

    showBottomOrTop = () => {
        this.setState({
            viewBottom: !this.state.viewBottom,
            rotateCardAnimation:
                this.state.rotateCardAnimation == "rotateY360"
                    ? "rotateY360R"
                    : "rotateY360",
        });
    };

    render() {
        if (typeof this.props.cards === typeof undefined) {
            return <div></div>;
        } else {
            if (typeof this.props.cards[0] === typeof undefined) {
                this.props.closeCardReview();
                return <div></div>;
            } else {
                if (this.props.cards[this.state.cardIndex] == undefined)
                    this.state.cardIndex = 0;

                let fontSize = 0;
                const allText =
                    this.props.cards[this.state.cardIndex].bottom +
                    this.props.cards[this.state.cardIndex].top;
                if (allText.length > 200) {
                    fontSize = 15;
                } else if (allText.length > 150) fontSize = 18;
                else if (allText.length > 100) fontSize = 20;
                else if (allText.length > 70) fontSize = 22;
                else if (allText.length > 50) fontSize = 24;
                else {
                    fontSize = 28;
                }

                let topOfCard = this.props.cards[this.state.cardIndex].top;
                let isTopPicture = false;
                // console.log(topOfCard);
                if (
                    topOfCard.startsWith("https") &&
                    topOfCard.includes("/card")
                ) {
                    isTopPicture = true;
                } else {
                    topOfCard = topOfCard.split("\n").map(function (item, idx) {
                        return (
                            <span
                                key={idx}
                                className="card__ltr-input word-breaker word__break-stoper"
                            >
                                
                                {item}
                                <br />
                            </span>
                        );
                    });
                }

                let bottomOfCard =
                    this.props.cards[this.state.cardIndex].bottom;
                let isBottomPicture = false;
                if (
                    bottomOfCard.startsWith("https") &&
                    bottomOfCard.includes("/card")
                ) {
                    isBottomPicture = true;
                } else {
                    bottomOfCard = bottomOfCard
                        .split("\n")
                        .map(function (item, idx) {
                            return (
                                <span
                                    key={idx}
                                    className="card__ltr-input word-breaker word__break-stoper"
                                >
                                    {item}
                                    <br />
                                </span>
                            );
                        });
                }

                return (
                    <div role="dialog" className=" modal d-block   dialog__scroller">
                        <div
                            role="document"
                            className="modal-dialog modal-card card__top-positioner"
                            style={{
                                animation: `${this.state.rotateCardAnimation} .5s linear`,
                            }}
                        >
                            <div className="modal-content">
                                <div className="modal-header rtl">
                                    {this.props.type == "review" ? (
                                        <div>
                                            <span className="modal-title h5">
                                                {this.state.cardIndex + 1}/
                                                {this.props.cards.length}
                                            </span>
                                        </div>
                                    ) : (
                                        <div>
                                            <CircularProgressbar
                                                className="circle-progress-card"
                                                value={this.state.progress}
                                                text={`${this.state.progress}%`}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        {this.props.type == "review" && (
                                            <button
                                                onClick={() =>
                                                    this.props.editCard(
                                                        this.props.cards[
                                                            this.state.cardIndex
                                                        ]
                                                    )
                                                }
                                                type="button"
                                                className="close close-edit"
                                            >
                                                <span className="flaticon-pencil"></span>
                                            </button>
                                        )}
                                        <button
                                            onClick={this.props.closeCardReview}
                                            type="button"
                                            className="close"
                                        >
                                            <span className="closing">
                                                بستن
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-body text-center">
                                    {this.state.finish ? (
                                        <div>
                                            <h3>تبریک!</h3>
                                            <p>
                                                کارتهایی که بلد بودی چند روز
                                                دیگه دوباره پرسیده میشن{" "}
                                            </p>
                                            <p>
                                                کارتهایی که بلد نبودی رو ۲۴ ساعت
                                                وقت داری مرور کنی و فردا دوباره
                                                ازت پرسیده میشن
                                            </p>
                                        </div>
                                    ) : this.state.viewBottom ? (
                                        isBottomPicture ? (
                                            <img
                                                src={bottomOfCard}
                                                className="form-group preview image__add-module-object"
                                                alt={this.props.boxName}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <h3
                                                style={{
                                                    fontSize: `${fontSize}px`,
                                                }}
                                                className="card-content"
                                            >
                                                {bottomOfCard}
                                            </h3>
                                        )
                                    ) : isTopPicture ? (
                                        <img
                                            src={topOfCard}
                                            className="form-group preview image__add-module-object"
                                            alt={this.props.boxName}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <h3
                                            style={{
                                                fontSize: `${fontSize}px`,
                                            }}
                                            className="card-content"
                                        >
                                            {topOfCard}
                                        </h3>
                                    )}
                                </div>
                                <div className="modal-footer text-center">
                                    {this.state.finish ? (
                                        <div>
                                            <button
                                                onClick={
                                                    this.props.closeCardReview
                                                }
                                                type="button"
                                                className="btn btn-primary"
                                            >
                                                تایید
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="row w-100">
                                            {this.props.type == "review" ? (
                                                <button
                                                    onClick={() =>
                                                        this.goPrevNext(0)
                                                    }
                                                    type="button"
                                                    className="col-md-3 col-2 btn btn-default py-0 btn-back"
                                                >
                                                    <span className="flaticon-arrow"></span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        this.answer(
                                                            this.props.cards[
                                                                this.state
                                                                    .cardIndex
                                                            ].id,
                                                            1
                                                        )
                                                    }
                                                    type="button"
                                                    className="col-md-3 col-sm-12 btn btn-success"
                                                >
                                                    بلدم :)
                                                </button>
                                            )}
                                            <button
                                                onClick={this.showBottomOrTop}
                                                type="button"
                                                className={`col-md-5 ${
                                                    this.props.type == "review"
                                                        ? "col-8 btn-topbottom-review"
                                                        : "col-sm-12 btn-topbottom-start"
                                                }  ${
                                                    this.state.viewBottom
                                                        ? "btn btn-warning"
                                                        : "btn btn-primary"
                                                }`}
                                            >
                                                نمایش{" "}
                                                {this.state.viewBottom
                                                    ? "روی کارت"
                                                    : "پشت کارت"}
                                            </button>

                                            {this.props.type == "review" ? (
                                                <button
                                                    onClick={() =>
                                                        this.goPrevNext(1)
                                                    }
                                                    type="button"
                                                    className="col-md-3 col-2 btn btn-default py-0  btn-next"
                                                >
                                                    <span className="flaticon-right-arrow "></span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        this.answer(
                                                            this.props.cards[
                                                                this.state
                                                                    .cardIndex
                                                            ].id,
                                                            0
                                                        )
                                                    }
                                                    type="button"
                                                    className="col-md-3 col-sm-12 btn btn-danger"
                                                >
                                                    بلد نیستم
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Card;
