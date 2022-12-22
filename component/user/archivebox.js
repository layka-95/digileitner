import React from "react";
import Cookies from "universal-cookie";
import ModalShowAllCard from "./modalShowAllCard";

class Archivebox extends React.Component {
    constructor() {
        super();
        this.state = {
            cookie: new Cookies(),
        };
    }

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
                alert("جعبه شما در پنل کاربری قابل استفاده است");
                this.props.loadUserBox();
            });
    };

    render() {
        return (
            <div className="archive__box-positioner">
                <div className="box-item card bg-dark text-white box__archive card__archive-page">
                    <img
                        className="card-img h-100 card-img-sizer"
                        src={"/img/user_cards/" + this.props.image + ".png"}
                        alt="Card image"
                    />
                    <div className="card-img-overlay text-right">
                        <h5 className="card-title card__title-positioner">
                            {this.props.title}
                        </h5>
                    </div>
                    <span
                        onClick={(e) => this.makeUnarchive(this.props.id)}
                        className="stared-box archivebox__icon-return flaticon flaticon-return"
                    ></span>
                </div>
            </div>
        );
    }
}

export default Archivebox;
