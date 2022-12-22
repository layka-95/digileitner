import React from 'react';
import ModalAddCard from "../general/modalAddCard";
import Alert from "../general/alert";

class ShowAllCardAdminForm extends React.Component {
    constructor() {
        super();

        this.state = {
            displayMode: 'd-block',
            showModalAddCard: false,
            editableCard: '',
            alert_type: null,
            alert_message: null,
            alert_timeout: 1500,
            userFilter: '',
        }
    }

    closeModal = () => {
        this.setState({
            displayMode: 'none'
        });
        this.props.toggleModalShowAll();
    }

    alert = (type, message, timeout) => {
        this.setState({
            alert_type: type,
            alert_message: message,
            alert_timeout: timeout
        })
        this.props.loadCardDrawer();
    }

    editCard = (arg) => {
        this.setState({
            showModalAddCard: true,
            editModeCard: true,
            editableCard: arg
        })
    }

    closeAddEditCard = (type) => {
        this.setState({
            showModalAddCard: false,
            editModeCard: false,
            editableCard: null,
        });
    }

    render() {
        const CardCounter = function (q) {
            var counter = 0;
            {
                q.map(a => {
                    counter = counter + 1;

                })
            }
            return (counter);
        }


        return (
            <div role="dialog" className={`rtl modal ${this.state.displayMode}`}>


                <div role="document" className="modal-dialog">
                    <div className="modal-content archive__showallcardcontroller fade-in-right">
                        <div className="modal-header modal-header-bc">
                            <div className="modal-title h4 shop__title">{this.props.title}</div>
                            <div className="shop__see-all-icon-on-top">
                                <li className="list-shop-icon pl-3 pr-1 postcard_shop-page closeshop" onClick={this.closeModal}><img src="../img/icons/arrow-right.png" alt="" className="arrow__icon-shop" /></li>
                                <li className="list-shop-icon pl-3 pr-1"><img src="../img/icons/postcard.png" alt="" className="openbook_shop-page" /></li>
                                {CardCounter(this.props.cards)}
                            </div>
                        </div>


                        <div className="modal-body flex-row mz-scroll show-all-card">
                            {this.props.cards.sort((firstItem, secondItem) => firstItem.id - secondItem.id).map((item, i) => {
                                return (<div key={i} className={' my-2 text-right showallcard__card'}>

                                    <div className="parent__pen">

                                        <a onClick={() => this.editCard({ id: item.id, top: item.top, bottom: item.bottom })} className="flaticon flaticon-pencil edit__card-pen"></a>
                                    </div>
                                    <div className="m-0 admin__card-top"><br /><p className="rtl__modal word__break-stoper enter__handler">{item.top}</p></div>
                                    <div className="m-0 shop__card-bottom"><br /><strong><p className="rtl__modal word__break-stoper enter__handler">{item.bottom}</p></strong></div>
                                </div>);
                            })}
                        </div>
                    </div>
                </div>
                {(this.state.showModalAddCard == true) &&
                    <ModalAddCard editMode={this.state.editModeCard} editableCard={this.state.editableCard} closeModal={this.closeAddEditCard} alert={this.alert} />
                }
            </div>
        )
    }
}

export default ShowAllCardAdminForm;
