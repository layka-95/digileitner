import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';

import Archivebox from "../component/user/archivebox";
import Archiveboxshopform from "../component/shop/archiveboxshopform";
import Profile from "../component/user/profile";
import Adminmenubar from '../component/general/adminmenubar'

class AdminArchive extends React.Component {

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
        }
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
                    box_id: loadedBoxes.id
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
                    shopbox_id: loadedShopBoxes.id
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

    render() {

        var archiveList = this.state.boxes.map((item, i) => {
            return (<Archivebox loadUserBox={this.loadUserBox} key={i} index={item.index} id={item.id} title={item.title} image={item.image} />)
        })

        var shopList = this.state.shopBoxes.map((item, i) => {
            return (<Archiveboxshopform loadUserBox={this.loadUserBox} key={i} index={item.index} id={item.id} title={item.title} image={item.image} />)
        })
        return (
            <div>


                <div className='row sidebar-boxes boxes__controller'>

                <Adminmenubar showProfile={() => this.showProfile()} showGuide={() => this.showGuide()} signOut={() => this.SignOut()} borderRouter='shop' />

                    <div>
                        <div className="archive__title">
                            <span className="archive__title-text">  استفاده کنید  <a className="flaticon flaticon-return archive__icon-title animate__fadeInRight archive__icone-back"></a> آرشیو: برای استفاده از ایکون</span>
                        </div>
                        <div className="archive__box-list-mobile ">
                            <div className="boxed-container mz-scroll archive__wraper-widther boxed-container-archive-page">
                                <div className="boxes-side archive__wraper">
                                    {archiveList}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Shop part */}
                    <div>
                        <div className="archive__title">
                            <span className="archive__title-text">  استفاده کنید  <span>  <img src="../img/icons/plus.png" alt="" className="plus_shop-page" /> </span>  بسته‌های استاندارد: از ایکون</span>
                        </div>
                        <div className="archive__box-list-mobile ">
                            <div className="boxed-container mz-scroll archive__wraper-widther boxed-container-archive-page">
                                <div className="boxes-side archive__wraper">
                                    {shopList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.showProfile != null &&
                    <Profile ashimashi={this.ashimashi} closeProfile={this.closeProfile} userInfo={this.state.user} />
                }
            </div>
        )
    };

}

export default AdminArchive
