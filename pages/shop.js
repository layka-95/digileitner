import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import Archivebox from "../component/user/archivebox";
import Archiveboxshopform from "../component/shop/archiveboxshopform";
import Profile from "../component/user/profile";
import Guide from "../component/general/guide";
import Menu from '../component/general/menubar'
import Head from 'next/head';
class Archive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cookie: new Cookies(),
            user: null,
            boxes: [],
            shopBoxes: [],
            box_id: '',
            shopbox_id: '',
            showProfile: null,
            downloaded: '',
            detaile: '',
            pageRendered: 0,

            filteredLabel: [],
            showGuide: 0,
        }

        this.LABELS = [
            { key: 'english', value: 'انگلیسی', color: 'primary' },
            { key: 'persian', value: 'فارسی', color: 'secondary' },
            { key: 'france', value: 'فرانسه', color: 'success' },
            {key: 'spanish', value: 'اسپانیایی', color: 'danger'},
            {key: 'german', value: 'آلمانی', color: 'warning'},
            {key: 'italian', value: 'ترکی', color: 'limo'},
            { key: 'math', value: 'ریاضی', color: 'violet' },
            // {key: 'physics', value: 'فیزیک', color: 'dark'},
            // {key: 'chemistry', value: 'شیمی', color: 'purple'},
            // {key: 'computer', value: 'کامپیوتر', color: 'orange'},
            // {key: 'lived', value: 'زیست', color: 'info'},
            // {key: 'general', value: 'عمومی', color: 'khaki'},
        ]

        this.VIEW_REGION = 'fa';
    }

    componentDidMount() {

        const token = this.state.cookie.get('leitner_token');
        if (typeof token == typeof undefined) {
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
        this.loadShopBox();
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
                    Router.push('/', undefined, { shallow: true });
                }
            })
    }


    loadUserBox = () => {

        this.setState({
            selectedBox: null,
        });

        fetch(process.env.serverUrl + '/box/callarchive', {
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
                    box_id: loadedBoxes.id,
                })
            });
    }

    loadShopBox = () => {
        this.setState({
            selectedBox: null,
        });

        fetch(process.env.serverUrl + '/box/shopcallbox', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),

            })
        })
            .then(response => response.json())
            .then(response => {

                var loadedShopBoxes = [];
                response.map((item, i) => {
                    item = { ...item, 'index': i + 1 };
                    loadedShopBoxes.push(item);
                })

                this.setState({
                    shopBoxes: loadedShopBoxes,
                    shopbox_id: loadedShopBoxes.id,
                    pageRendered: 1,
                })
            });
    }

    showProfile = () => {
        this.setState({
            showProfile: true
        })
    }

    closeProfile = () => {
        this.setState({
            showProfile: null
        })
    }

    filterByLabel = (value) => {
        let filterLabels = this.state.filteredLabel;
        if (filterLabels.includes(value)) {
            const index = filterLabels.indexOf(value);
            if (index > -1) {
                filterLabels.splice(index, 1);
            }
        } else {
            filterLabels.push(value);
        }

        this.setState({
            filteredLabel: filterLabels
        })
    }

    showGuide() {
        this.setState({
            showGuide: 1
        })
    }

    closeGuide = () => {
        this.setState({
            showGuide: 0
        })
    }

    render() {

        var archiveList = this.state.boxes.map((item, i) => {
            return (<Archivebox loadUserBox={this.loadUserBox} key={item.id} index={item.index} id={item.id} title={item.title} image={item.image} />)
        })

        var shopList = this.state.shopBoxes.map((item, i) => {
            let okToReturn = true;
            let itemLabels = item.label ? item.label.split(',') : [];

            if (item.region.toLowerCase() !== this.VIEW_REGION.toLowerCase() && item.region.toLowerCase() !== 'both') {
                okToReturn = false;
            }
            if (this.state.filteredLabel.length && !this.state.filteredLabel.every(i => itemLabels.includes(i))) {
                okToReturn = false;
            }

            if (okToReturn) {
                return (<Archiveboxshopform labels={this.LABELS} detaile={item.detail} downloaded={item.downloaded} loadUserBox={this.loadUserBox} key={i} index={item.index} id={item.id} title={item.title} label={item.label} image={item.image} />)
            }
        })


        return (
            <div>
                <Head>
                    <title>کتابخانه جعبه لایتنر</title>
                    <meta
                        name='description'
                        content='use more than one billion prepaid flashcard'
                    />
                </Head>

                <div className='row sidebar-boxes boxes__controller'>
                    <Menu showProfile={() => this.showProfile()} showGuide={() => this.showGuide()} signOut={() => this.SignOut()} borderRouter='shop' />


                    {/* Shop part */}
                    <div className="body__shop">
                        <div className="archive__title">
                            {/* <span className="archive__title-text"><button onClick={() => this.showGuide()} className="guide__button">راهنما</button>  بسته‌های آماده </span> */}
                        </div>

                        <div className="archive__box-list-mobile  archive__box-list-mobile-shop heighter-boxes mz-scroll">
                            <div className="boxed-container mz-scroll archive__wraper-widther ">
                                <div className='d-flex flex-row justify-content-center archive__label-filter archive__label-grid'>
                                    {this.LABELS.map((label, i) => {
                                        return <span key={i} onClick={() => this.filterByLabel(label.key)} className={`badge badge-${label.color} ${this.state.filteredLabel.includes(label.key) ? 'active' : ''}`}>{label.value}</span>
                                    })}
                                </div>
                                <div className="scroll__shop-hiden">
                                    <div className="scroller_shop">
                                        <div className="grider__shop-boxes">
                                            {this.state.pageRendered === 0 &&
                                                <p className="loading-heart"> <div className="lds-heart"><div></div></div> </p>
                                            }
                                            {this.state.pageRendered === 1 &&
                                                shopList
                                            }

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {this.state.showProfile === true &&
                    <Profile ashimashi={this.ashimashi} closeProfile={this.closeProfile} userInfo={this.state.user} />
                }
                {this.state.showGuide === 1 &&
                    <Guide closeGuide={this.closeGuide} />
                }
            </div>
        )


    };

}

export default Archive
