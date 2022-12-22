import React, {Component} from 'react';
import Cookies from "universal-cookie";

class ModalAddBox extends Component {

    constructor() {
        super();
        this.state = {
            cookie: new Cookies(),
            displayMode: 'd-block',
            modalTitle: 'افزودن جعبه',
            addBtnText: 'افزودن',
            deleteBtnText: 'حذف',
            addedBoxId: -1,
            addedBoxTitle: '',

            availableImages: [
                '1qjrxdhpw5b3',
                '2eq7augz8fxtg',
                '3s8ePCPNCrw2R',
                '4q2xf8n7hp8v',
                '5rcvwttastddk',
                '6sms92dheuat3',
                '7z4qqy5zz68ga',
                '8ygh52vzbeb6e',
                '9fsexnhyhn7dg',
                '10wvdkyduj2z64',
                '11rpbcvpbhy8y8',
                '12ctxu788bx8mu',
                '13pfj79g748pbb',
                '14qz6mmumdqwd9',
                '15efayfawd52ch',
                '1675qjrxdhpw5b3',
                '2675qjrxdhpw5b3',
                '3675qjrxdhpw5b3',
                '4675qjrxdhpw5b3',
                '5675qjrxdhpw5b3',
                '6675qjrxdhpw5b3',
                '7675qjrxdhpw5b3',
                '8675qjrxdhpw5b3',
                '9675qjrxdhpw5b3',
                '10675qjrxdhpw5b3',
                '11675qjrxdhpw5b3',
                '12675qjrxdhpw5b3',
                '13675qjrxdhpw5b3',
                '14675qjrxdhpw5b3',
                '15675qjrxdhpw5b3',
                '16675qjrxdhpw5b3',
                '17675qjrxdhpw5b3',
                '18675qjrxdhpw5b3',
                '19675qjrxdhpw5b3',
                '20675qjrxdhpw5b3',
                '21675qjrxdhpw5b3',
                '22675qjrxdhpw5b3',
                '23675qjrxdhpw5b3',
                '24675qjrxdhpw5b3',
                '25675qjrxdhpw5b3',
                '26675qjrxdhpw5b3',
                '27675qjrxdhpw5b3',
                '28675qjrxdhpw5b3',
                '29675qjrxdhpw5b3',
                '30675qjrxdhpw5b3',
                '31675qjrxdhpw5b3',
                '32675qjrxdhpw5b3',
                '33675qjrxdhpw5b3',
                '34675qjrxdhpw5b3',
                '35675qjrxdhpw5b3',
                '36675qjrxdhpw5b3',
                '37675qjrxdhpw5b3',
                '38675qjrxdhpw5b3',
                '39675qjrxdhpw5b3',
                '40675qjrxdhpw5b3',
                '41675qjrxdhpw5b3',
                '42675qjrxdhpw5b3',
                '43675qjrxdhpw5b3',
                '44675qjrxdhpw5b3',
                '45675qjrxdhpw5b3',
                '46675qjrxdhpw5b3',
                '47675qjrxdhpw5b3',
                '48675qjrxdhpw5b3',
                '49675qjrxdhpw5b3',
                '50675qjrxdhpw5b3',
                '51675qjrxdhpw5b3',
                '52675qjrxdhpw5b3',
                '53675qjrxdhpw5b3',
                '54675qjrxdhpw5b3',
                '55675qjrxdhpw5b3',
                '56675qjrxdhpw5b3',
                '57675qjrxdhpw5b3',
                '58675qjrxdhpw5b3',
                '59675qjrxdhpw5b3',
                '60675qjrxdhpw5b3',
                '61675qjrxdhpw5b3',
                '62675qjrxdhpw5b3',
                '63675qjrxdhpw5b3',
                '64675qjrxdhpw5b3',
                '65675qjrxdhpw5b3',
                '66675qjrxdhpw5b3',
                '67675qjrxdhpw5b3',
                '68675qjrxdhpw5b3',
                '69675qjrxdhpw5b3',
                '70675qjrxdhpw5b3',
                '71675qjrxdhpw5b3',
                '72675qjrxdhpw5b3',
                '73675qjrxdhpw5b3',
                '74675qjrxdhpw5b3',
                '75675qjrxdhpw5b3',
                '76675qjrxdhpw5b3',
                '77675qjrxdhpw5b3',
                '78675qjrxdhpw5b3',
            ],
            selectedImage: '1qjrxdhpw5b3',
        }
    }

    closeModal = () => {
        this.setState({
            displayMode: 'none'
        })
        this.props.toggleModalAddBox();
    }

    boxTitleChange = (event) => {
        this.setState({
            addedBoxTitle: event.target.value
        });
    }

    selectBoxImage = (image) => {
        this.setState({
            selectedImage: image
        })
    }

    deleteBox = (id) => {
        if (confirm('آیا مطمئن هستید این جعبه را حذف می‌کنید؟ (تمامی کارت‌های داخل این جعبه نیز حذف خواهند شد)')) {
            fetch(process.env.serverUrl + '/box/delete', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: this.state.cookie.get('leitner_token'),
                    box_id: id

                })
            }).then(response => {
                this.props.loadUserBox();
                this.props.getAllCards();
                this.closeModal();
            });
            fetch(process.env.serverUrl + '/box/deleteusercards', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: this.state.cookie.get('leitner_token'),
                    box_id: id

                })
            }).then(response => {
                if (response.status < 400){
                    // console.log("Cards Deleted!")
                }
            });
        }
    }

    addEditBox = (box_id) => {

        if (this.state.addedBoxTitle.length == 0) {
            this.props.alert('danger', 'عنوان جعبه نمی‌تواند خالی باشد!', 1500);
            return;
        }


        this.setState({
            addBtnText: 'منتظر باشید...',
        });


        if (typeof box_id === typeof undefined) {
            fetch(process.env.serverUrl + '/box/add', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: this.state.cookie.get('leitner_token'),
                    title: this.state.addedBoxTitle,
                    image: this.state.selectedImage,

                })
            }).then(response => {
                this.props.loadUserBox();
                this.closeModal();
            });

        } else {
            fetch(process.env.serverUrl + '/box/edit', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: this.state.cookie.get('leitner_token'),
                    box_id: box_id,
                    title: this.state.addedBoxTitle,
                    image: this.state.selectedImage,

                })
            }).then(response => {
                this.props.loadUserBox();
                this.closeModal();
            });
        }
    }

    render() {

        if (this.props.editMode && this.state.modalTitle == 'افزودن جعبه') {
            this.state.modalTitle = 'ویرایش جعبه';
            this.state.addedBoxTitle = this.props.editableTitle;
            this.state.selectedImage = this.props.editableImage;
        }

        return (
            <div role="dialog" className={"rtl modal " + this.state.displayMode}>
                <div role="document" className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{this.state.modalTitle}</div>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-4">
                                <label htmlFor='add-box-input'>عنوان جعبه:</label>
                                <input onChange={this.boxTitleChange} value={this.state.addedBoxTitle} id='add-box-input' type='text' className='form-control' placeholder='لغات آلمانی، اصطلاحات انگلیسی، ...'/>
                            </div>
                            <div className="row">
                                <label htmlFor='add-box-input'>عکس جعبه:</label>
                                <div className="row add-box-image mz-scroll">
                                    {this.state.availableImages.map((image, i) => {
                                        return (<div key={i} className={(this.state.selectedImage == image) ? 'active col-4' : 'col-4'}>
                                            <img onClick={() => this.selectBoxImage(image)} className='w-100' src={'/img/user_cards/' + image + '.png'}/>
                                        </div>);
                                    })}
                                </div>
                            </div>
                        </div>
                        {(this.props.editMode === true) ?
                            <div className="modal-footer justify-content-end">
                                <div>
                                    <button onClick={() => this.addEditBox(this.props.editableId)} type="button" className="btn btn-primary ml-1">{this.state.addBtnText}</button>
                                    <button onClick={this.closeModal} type="button" className="btn btn-outline-info">بستن</button>
                                </div>
                            </div>
                            :
                            <div className="modal-footer">
                                <button onClick={() => this.addEditBox()} type="button" className="btn btn-primary">{this.state.addBtnText}</button>
                                <button onClick={this.closeModal} type="button" className="btn btn-outline-info">بستن</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalAddBox;
