import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';

import BoxAdmin from "../component/admin/boxadmin";
import AdminModalAddBox from "../component/admin/adminModalAddBox";
import PanelModalAddCard from "../component/admin/panelModalAddCard";
import ShowAllCardAdminForm from "../component/admin/showAllCardAdminForm";
import Card from "../component/user/card";
import Alert from "../component/general/alert";
import Adminmenubar from '../component/general/adminmenubar'
import Profile from "../component/user/profile";


class panel extends Component {

    constructor() {

        super();

        this.state = {
            cookie: new Cookies(),

            user: null,
            showProfile: null,

            showModalAddBox: false,
            showModalCards: false,
            modalCardsType: '',
            showModalAddCard: false,
            showModalShowAllCards: false,
            allCardsOfBox: null,

            boxes: [],
            beforeSearchBox: [],
            selectedBox: null,

            editModeBox: false,
            editableId: null,
            editableTitle: null,
            editableDetail: null,
            editableRegion: null,
            editableLabel: null,

            editModeCard: false,
            editableCard: null,

            inSearchMode: false,

            selectedModeClass: '',

            timelineStateAnime1: '',
            timelineStateAnime2: '',
            startTimeline: false,

            alert_type: null,
            alert_message: null,
            alert_timeout: 1500,
            hasBox: false,
            userCountOfCards: 0,
        }
    }

    componentDidMount() {

        const token = this.state.cookie.get('leitner_token');
        if (typeof token == typeof undefined) {
            Router.push('/', undefined, { shallow: true });
            return;
        }
        const panel = this.state.cookie.get('leitner_panel');
        if (panel !== "PQtA8JBPQtA8JB") {
            Router.push('/', undefined, { shallow: true });
            return;
        }
    
        fetch(process.env.serverUrl + '/profile/' + token, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },

        }).then(response => response.json())
            .then(response => {
                if (response.token === token) {
                    this.setState({
                        user: response,
                    })
                } else {
                    this.state.cookie.set('leitner_token', null, { expires: new Date() });
                    Router.push('/', undefined, { shallow: true });
                    return;
                }
            })

        this.loadUserBox();

        this.prepareTimeline();

        this.getAllCards();

    }

    prepareTimeline = () => {

        let timelineTimer = setInterval(
            function () {
                if (this.state.timelineStateAnime1 === '') {
                    this.setState({
                        timelineStateAnime1: 'goUp'
                    })
                } else if (this.state.timelineStateAnime2 === '') {
                    this.setState({
                        timelineStateAnime2: 'goUp',
                        startTimeline: true
                    })
                    clearInterval(timelineTimer)
                }
            }
                .bind(this),
            2000);
    }


    SignOut = () => {

        fetch(process.env.serverUrl + '/signout', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
            })
        })
            .then(response => {
                if (response !== 0) {
                    this.state.cookie.set('leitner_token', null, { expires: new Date() });
                    this.state.cookie.set('leitner_panel', null, { expires: new Date() })
                    Router.push('/', undefined, { shallow: true });
                }
            })
    }


    closeProfile = () => {
        this.setState({
            showProfile: null
        })
    }

    showProfile = () => {
        this.setState({
            showProfile: true
        })
    }

    
    loadUserBox = () => {

        this.setState({
            selectedBox: null,
        });

        fetch(process.env.serverUrl + '/box/call', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),

            })
        })
            .then(response => response.json())
            .then(response => {

                var loadedBoxes = [];
                response.map((item, i) => {
                    item = { ...item, 'index': i + 1 };
                    loadedBoxes.push(item);
                })

                this.setState({
                    boxes: loadedBoxes,
                    beforeSearchBox: loadedBoxes,
                })
            });
    }

    toggleModalShowAll = () => {
        this.setState({
            showModalShowAllCards: (this.state.showModalShowAllCards) ? false : true,
            allCardsOfBox: null
        });
    }

    toggleModalAddBox = (event, id, title, detail, region, label, image) => {

        if (typeof event !== typeof undefined)
            event.stopPropagation();

        this.setState({
            showModalAddBox: (this.state.showModalAddBox) ? false : true,
            editModeBox: (typeof id != typeof undefined && typeof title != typeof undefined) ? true : false,
            editableId: (typeof id != typeof undefined) ? id : null,
            editableTitle: (typeof title != typeof undefined) ? title : null,
            editableDetail: (typeof detail != typeof undefined) ? detail : null,
            editableRegion: (typeof region != typeof undefined) ? region : null,
            editableLabel: (typeof label != typeof undefined) ? label : null,
            editableImage: (typeof image != typeof undefined) ? image : null,
        })
    }

    selectBox = (id) => {

        var selBox = this.state.boxes.find(x => x.id === id);

        fetch(process.env.serverUrl + '/box/status', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                box_id: selBox.id
            })
        })
            .then(response => response.json())
            .then(response => {

                selBox = { ...selBox, 'btnStatus': response };

                this.setState({
                    selectedBox: selBox,
                    selectedModeClass: 'selected-mode ',
                });
            });
    }

    showAllCards = () => {
        if (this.state.selectedBox == null)
            return;

        fetch(process.env.serverUrl + '/card/showall', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                box_id: this.state.selectedBox.id
            })
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    showModalShowAllCards: true,
                    allCardsOfBox: response
                })
            });
    }

    loadCards = (type) => {
        if (this.state.selectedBox == null)
            return;

        let method = (type == 'review') ? 'todayall' : 'call';

        fetch(process.env.serverUrl + '/card/' + method, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                box_id: this.state.selectedBox.id
            })
        }).then(response => {
            if (response.status == 404) {

                this.alert('info', 'جعبه شما بروزرسانی شد!');

                fetch(process.env.serverUrl + '/card/finish', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: this.state.cookie.get('leitner_token'),
                        box_id: this.state.selectedBox.id,
                    })
                }).then(respose => {
                    if (respose.status < 400)
                        this.selectBox(this.state.selectedBox.id)
                });


            } else {
                return response.json();
            }
        })
            .then(response => {

                if (Array.isArray(response) && response.length > 0) {

                    let selBox = this.state.selectedBox;
                    selBox = { ...selBox, 'cards': response };

                    this.setState({
                        selectedBox: selBox,
                        showModalCards: true,
                        modalCardsType: type
                    })

                } else {
                    this.setState({
                        showModalCards: false,
                    })
                }
            })
    }

    addCard = () => {
        if (this.state.selectedBox == null)
            return;

        this.setState({
            showModalAddCard: true,
        })
    }

    editCard = (card) => {
        this.setState({
            showModalAddCard: true,
            editableCard: card,
            editModeCard: true
        })
    }

    closeAddEditCard = (type) => {
        this.setState({
            showModalAddCard: false,
            editModeCard: false,
            editableCard: null,
        });

        if (type == 'review') {
            // Refresh box button
            this.loadCards(type);
        } else {
            this.selectBox(this.state.selectedBox.id);
        }
    }

    closeCardReview = () => {
        this.setState({
            showModalCards: false
        })

        // Refresh box button
        this.selectBox(this.state.selectedBox.id);
    }

    searchBox = (event) => {

        const searchValue = event.target.value;
        if (searchValue.length <= 0) {
            this.setState({
                inSearchMode: false,
                boxes: this.state.beforeSearchBox
            })

        } else {

            this.setState({
                inSearchMode: true,
                boxes: this.state.boxes.filter(function (box) {
                    return (box.title.includes(searchValue))
                })
            })
        }
    }

    backToPanel = () => {
        this.setState({
            selectedModeClass: '',
            selectedBox: null,
        })
    }

    alert = (type, message, timeout) => {
        this.setState({
            alert_type: type,
            alert_message: message,
            alert_timeout: timeout
        })
    }

    getAllCards = () => {
        fetch(process.env.serverUrl + '/box/cardnumberfromboxes', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
            })
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    userCountOfCards: response[0].count,
                })
            });
    };

    render() {

        this.state.hasBox = this.state.boxes.length > 0;
        return (
            <div>


                <div className='row'>

                    <Adminmenubar showProfile={() => this.showProfile()} showGuide={() => this.showGuide()} signOut={() => this.SignOut()} borderRouter='panel' />

                    <main className={this.state.selectedModeClass + " d-none d-md-block d-xl-block col-md-8 col-xl-8 bd-content adminpanel__main panel__main-col"}>

                        <h2 className="mb-0 selected-box-title text-right rtl pr-3 ">{(this.state.selectedBox !== null) ? <div><span onClick={this.backToPanel} className="d-sm-inline d-md-none btn-back-panel flaticon-left-arrow box__icon-positioner"></span>{this.state.selectedBox.title} </div> : <div>Welcome to Admin Panel</div>}</h2>

                        <div className="text-center main-image-wrapper image__vertically-center">
                            <img className="main-image" src={(this.state.selectedBox !== null) ? "/img/user_cards/" + this.state.selectedBox.image + '.png' : "/img/user_cards/main.png"} />
                        </div>

                        {this.state.selectedBox !== null &&
                            <div className="admin__btn-controller-selectedmode">
                                <button onClick={this.showAllCards} className="action-card-btn btn btn-info">مدیریت کارت‌ها</button>
                                <button onClick={this.addCard} className="action-card-btn btn btn-dribbble">اضافه کردن کارت</button>
                                <button onClick={() => this.loadCards('review')} className="action-card-btn btn btn-light text-body">مرور کارت‌های امروز</button>
                            </div>
                        }

                    </main>

                    <div id="sidebar-boxes" className={this.state.selectedModeClass + "fade-in  d-md-block d-xl-block col-md-4 col-xl-4 px-4"}>


                        <div className="py-4">
                            <input onChange={this.searchBox} className="form-control bg-gradient-light rtl" placeholder="جستجوی جعبه" />
                        </div>

                        <div className="boxed-container mz-scroll">
                            <div className="boxes-side">
                                {this.state.boxes.map((item, i) => {
                                    return (<BoxAdmin loadUserBox={this.loadUserBox} selectBox={this.selectBox} toggleModalAddBox={this.toggleModalAddBox} key={i} index={item.index} id={item.id} title={item.title} star={item.star} image={item.image} detail={item.detail} region={item.region} label={item.label} />)
                                })}
                                {(this.state.boxes.length < 100 && !this.state.inSearchMode) ?
                                    <div onClick={this.toggleModalAddBox} className="add-card-box card bg-white text-white">
                                        <a className="text-black-50 flaticon flaticon-add-1"></a>
                                        <div className="card-img-overlay text-right">
                                            <h5 className="card-title">جعبه جدید اضافه کن</h5>
                                        </div>
                                    </div>
                                    : ''
                                }
                            </div>
                            {(!this.state.hasBox) &&
                                <div className="img-container">
                                    <img className="flex-item"
                                        src={"/img/no-card.gif"} alt={''} />
                                </div>}
                        </div>
                    </div>

                    {(this.state.showModalAddBox === true) &&
                        <AdminModalAddBox editMode={this.state.editModeBox} editableId={this.state.editableId} editableTitle={this.state.editableTitle} editableDetail={this.state.editableDetail} editableRegion={this.state.editableRegion} editableLabel={this.state.editableLabel} editableImage={this.state.editableImage} loadUserBox={this.loadUserBox} getAllCards={this.getAllCards} toggleModalAddBox={this.toggleModalAddBox} alert={this.alert} />
                    }

                    {(this.state.showModalCards === true) &&
                        <Card editCard={this.editCard} type={this.state.modalCardsType} boxId={this.state.selectedBox.id} cards={this.state.selectedBox.cards} closeCardReview={this.closeCardReview} />
                    }

                    {(this.state.showModalAddCard === true && this.state.selectedBox != null) &&
                        <PanelModalAddCard editMode={this.state.editModeCard} editableCard={this.state.editableCard} boxId={this.state.selectedBox.id} loadCards={this.loadCards} getAllCards={this.getAllCards} closeModal={this.closeAddEditCard} alert={this.alert} />
                    }

                    {(this.state.showModalShowAllCards == true && this.state.selectedBox != null) &&
                        <ShowAllCardAdminForm loadCardDrawer={this.showAllCards} cards={this.state.allCardsOfBox} toggleModalShowAll={this.toggleModalShowAll} boxId={this.state.selectedBox.id} title={this.state.selectedBox.title} />
                    }

                    {this.state.alert_message != null &&
                        <Alert alert={this.alert} timeout={this.state.alert_timeout} type={this.state.alert_type} message={this.state.alert_message} />
                    }

                    {this.state.showProfile != null &&
                        <Profile ashimashi={this.ashimashi} closeProfile={this.closeProfile} userInfo={this.state.user} />
                    }

                </div>
            </div>
        );
    }

}

// export default getAllCards
export default panel
