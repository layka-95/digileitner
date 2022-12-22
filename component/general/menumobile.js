import React from 'react';

class MenuMobile extends React.Component {

    constructor() {
        super(undefined);
        this.state = {}
    }

    render() {

        return (
            <div role="dialog" className={"rtl modal d-block modal__edit-name__top-postioner"}>
                <div role="document" className="useredit__modal-dialog menu__mobile-dialog fadeIn-bottom ">
                    <div className="modal-content menuMobile-box">
                        <div onClick={this.props.archiveMaker} className="modal-header first__item-menu">
                            <div className="modal-title h4"> انتقال به آرشیو</div>
                        </div>
                        <div onClick={this.props.editBoxLoader} className="middle__item-menu">
                            <div className="modal-title h4"> ویرایش جعبه</div>
                        </div>
                        <div onClick={this.props.deleteBox} className="modal-header second__item-menu">
                            <div className="modal-title h4">حذف جعبه</div>
                        </div>
                        <div onClick={this.props.closeMenu} className="modal-header third__item-menu">
                            <div className="modal-title h4 cancel__btn"> بیخیال</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuMobile;
