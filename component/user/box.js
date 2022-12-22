import React from 'react';
import Cookies from "universal-cookie";
import MenuMobile from "../general/menumobile";
import Image from 'next/image'

class Box extends React.Component {

    constructor() {
        super();
        this.state = {
            cookie: new Cookies(),
            menu: '',
        }
    }

    changeStar = (event, box_id, star) => {

        if (typeof event !== typeof undefined)
            event.stopPropagation();

        const method = (star == 0) ? 'star-on' : 'star-off';

        fetch(process.env.serverUrl + '/box/' + method, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                box_id: box_id,
                stared: (star == 0) ? 1 : 0
            })
        }).then(response => {
            this.props.loadUserBox();
        })
    }

    menuLoader = () => {
        this.setState({
            menu: 1,
        })
    }

    closeMenu = () => {
        this.setState({
            menu: 0,
        })

    }

    editBoxLoader = (e) => {
        this.props.toggleModalAddBox(e, this.props.id, this.props.title, this.props.image);
    }

    archiveMaker = (e) => {
        this.makeArchive(e, this.props.id)
    }

    boxDeleter = (e) => {
        this.deleteBox(e, this.props.id);
    }


    makeArchive = (event, box_id) => {
        if (confirm('با انتقال به آرشیو تمام کارتهای شما به خانه اول برمیگردن و تمام پیشرفت شما بر روی جعبه از بین خواهد رفت. آیا مطمئن هستید؟')) {
            if (typeof event !== typeof undefined)
                event.stopPropagation();

            fetch(process.env.serverUrl + '/box/archiver', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
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
                alert('جعبه شما آرشیو شده و در قسمت آرشیو در دسترس است. از طریق منوی اصلی به تنظیمات و سپس به آرشیو شخصی مراجعه کنید :)');
                this.closeMenu();
            })

        }
    }

    deleteBox = (event, box_id) => {
        if (confirm('آیا مطمئن هستید این جعبه را حذف می‌کنید؟ (تمامی کارت‌های داخل این جعبه نیز حذف خواهند شد)')) {
            if (typeof event !== typeof undefined)
                event.stopPropagation();

            fetch(process.env.serverUrl + '/box/delete', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: this.state.cookie.get('leitner_token'),
                    box_id: box_id

                })
            }).then(response => {
                this.setState({
                    refresh: ''
                })
                this.props.loadUserBox();
                this.closeMenu();
            });

        }
    }

    render() {
        const myLoader = ({ src, width, quality }) => {
            return `https://digileitner.com/${src}?w=${width}&q=${quality || 50}`
        }

        return (
            <div className="box-item card bg-dark text-white cursor-pointer">
                <Image onClick={() => this.props.selectBox(this.props.id)} className="card-img h-100" src={"/img/user_cards/" + this.props.image + ".png"} alt="Card image" width={500} height={400} loader={myLoader} />
                <div className="card-img-overlay text-right">
                    <h5 className="card-title card__title-positioner">{this.props.title}</h5>
                </div>


                <button className="menumaker desktop__hiddener" onClick={(e) => this.props.toggleModalStop(e)}><img onClick={() => this.menuLoader()} src="../img/icons/three-dots.png" alt="" className="edit-box arrow__icon-shop editbox__panel"></img></button>

                <button className="menumaker mobile__hiddener" onClick={(e) => this.props.toggleModalStop(e)}><img src="../img/icons/three-dots.png" alt="" className="edit-box arrow__icon-shop editbox__panel"></img></button>

                <nav className="menubox">
                    <ul className="menu__box-desk">
                        <li onClick={(e) => this.props.toggleModalAddBox(e, this.props.id, this.props.title, this.props.image)} className="manu__item-box first__item-menu">
                            ویرایش
                        </li>
                        <li onClick={(e) => this.makeArchive(e, this.props.id)} className="manu__item-box middle__item-menu">
                            آرشیو
                        </li>
                        <li onClick={(e) => this.deleteBox(e, this.props.id)} className="manu__item-box second__item-menu">
                            حذف
                        </li>
                    </ul>
                </nav>
                {(this.state.menu == 1) &&
                    <MenuMobile closeMenu={this.closeMenu} editBoxLoader={this.editBoxLoader} archiveMaker={this.archiveMaker} deleteBox={this.boxDeleter} />
                }
            </div>
        );
    }
}

export default Box;
