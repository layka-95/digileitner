import React from 'react';
import Cookies from "universal-cookie";

class BoxAdmin extends React.Component {

    constructor() {
        super();
        this.state = {
            cookie: new Cookies(),
        }
    }

    changeStar = (event, box_id, star) => {

        if (typeof event !== typeof undefined)
            event.stopPropagation();

        const method = (star == 0) ? 'star-on' : 'star-off';

        fetch(process.env.serverUrl + '/box/' + method, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                box_id: box_id,
                stared: (star == 0) ? 1 : 0
            })
        }).then(response => {
            this.props.loadUserBox();
        })
    }

    makeArchive = (event, box_id) => {
        if (typeof event !== typeof undefined)
            event.stopPropagation();

        fetch(process.env.serverUrl + '/box/archiver', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                box_id: box_id,
                archived: 1
            })
        }).then(response => {
            this.setState({
                refresh: ''
            })
            this.props.loadUserBox();
            alert('جعبه شما آرشیو شده و در قسمت آرشیو در دسترس است');
        })

    }

    render() {
        return (
            <div className="box-item card bg-dark text-white">
                <img onClick={() => this.props.selectBox(this.props.id)} className="card-img h-100" src={"/img/user_cards/" + this.props.image + ".png"} alt="Card image"/>
                <div className="card-img-overlay text-right">
                    <h5 className="card-title card__title-positioner">{this.props.title}</h5>
                </div>
                <a onClick={(e) => this.changeStar(e, this.props.id, this.props.star)} data-stared={this.props.star} className="stared-box flaticon flaticon-star-1"></a>
                <a onClick={(e) => this.makeArchive(e, this.props.id)} className="stared-box flaticon flaticon-open panel__archive-onbox-icon"></a>
                <a onClick={(e) => this.props.toggleModalAddBox(e, this.props.id, this.props.title, this.props.detail, this.props.region, this.props.label, this.props.image)} className="edit-box flaticon flaticon-pencil"></a>
                {/* <button className="menumaker mobile__hiddener adminpanel__lunch-icon"><img src="../img/icons/three-dots.png" alt="" className="edit-box arrow__icon-shop editbox__panel"></img></button> */}
            </div>
        );
    }
}

export default BoxAdmin;
