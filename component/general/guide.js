import React from 'react';

import Cookies from 'universal-cookie';


class Guide extends React.Component {
    constructor() {
        super();

        this.state = {
            cookie: new Cookies(),
            displayMode: 'd-block',
            showModalContact: null,

        }
    }


    closeModal = () => {

        this.props.closeGuide();
    }


    render() {


        return (
            <div role="dialog" className={`rtl mz-scroll modal ${this.state.displayMode}`}>
                <div role="document" className="modal-dialog ">
                    <div className="modal-content archive__showallcardcontroller fade-in-right">
                        <div className="modal-header profile__header-modal guide__icon-header ">
                            <div className="modal-title h4 shop__title"></div>
                            <div className="shop__see-all-icon-on-top">
                                <li className="list-shop-icon pl-3 pr-1 postcard_shop-page closeshop" onClick={this.closeModal}><img src="../img/icons/arrow-right.png" alt="" className="arrow__icon-shop" /></li>
                            </div>

                        </div>
                        <div className="guide__text-scrollbar">
                            <div className="guide__p-top  ">
                                <p> استفاده از جعبه لایتنر</p>
                                <p>
                                    ۱- ابتدا جعبه جدید و سپس کارت جدید ایجاد کنید <br />
                                    ۲- پس از اضافه کردن اولین کارت ۲۴ ساعت زمان دارید تا کارتها را مرور کنید<br />
                                    ۳- پس از ۲۴ ساعت به طور اتوماتیک وضعیت جعبه به صورت تست تبدیل میشود<br />
                                    ۴- کارتهایی که بلد بودید در روزهای اینده و کارتهایی که بلد نبودید مجددا به کارتهایی که امروز مرور میکنید بازمیگردند<br />
                                    ۵- مجددا کارت اضافه کنید و تا روز بعد قبل از ازمون کارتها رو مرور کنید<br />
                                </p>
                            </div>

                            <div className="guide__p-top">
                                <p> استفاده از بسته‌های آماده </p>
                                <p>
                                    ۱- ابتدا از طریق منوی اصلی به کتابخانه مراجعه کنید <br />
                                    ۲- بر روی ایکون چشم روی بسته های اماده کلیک کنید تا محتوای جعبه را مشاهده کنید<br />
                                    ۳- میتوانید با "افزودن به پنل کاربری" بسته مورد را به قسمت پنل کاربری اضافه کنید<br />
                                    ۴- پس از انتقال جعبه از کتابخانه شخصی به پنل شخصی، اکنون روزانه حدود ۱۵ کارت به کارتهای خانه اول برای مرور روزانه اضافه میشود<br />
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Guide;
