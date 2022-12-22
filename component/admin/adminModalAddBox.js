import React, {Component} from 'react';
import Cookies from "universal-cookie";

class AdminModalAddBox extends Component {

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
            addedBoxDetail: '',
            addedBoxRegion: 'both',
            addedBoxLabel: [],

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

    boxDetailChange = (event) => {
        this.setState({
            addedBoxDetail: event.target.value
        });
    }

    boxRegionChange = (event) => {
        this.setState({
            addedBoxRegion: event.target.value
        })
    }

    boxLabelChange = (event) => {
        let setLabels = this.state.addedBoxLabel;
        if (setLabels.includes(event.target.value)) {
            const index = setLabels.indexOf(event.target.value);
            if (index > -1) {
                setLabels.splice(index, 1);
            }

        } else {
            setLabels.push(event.target.value);
        }
        this.setState({
            addedBoxLabel: setLabels
        })
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
                if (response.status < 400) {
                  //  console.log("Cards Deleted!")
                  return;
                }
            });
        }
    }

    addEditBox = (box_id) => {


        if (this.state.addedBoxTitle.length === 0) {
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
                    detail: this.state.addedBoxDetail,
                    region: this.state.addedBoxRegion,
                    label: this.state.addedBoxLabel.join(','),
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
                    detail: this.state.addedBoxDetail,
                    region: this.state.addedBoxRegion,
                    label: this.state.addedBoxLabel.join(','),
                    image: this.state.selectedImage,

                })
            }).then(response => {
                this.props.loadUserBox();
                this.closeModal();
            });
        }
    }

    render() {

        if (this.props.editMode && this.state.modalTitle === 'افزودن جعبه') {
            this.state.modalTitle = 'ویرایش جعبه';
            this.state.addedBoxTitle = this.props.editableTitle;
            this.state.addedBoxDetail = this.props.editableDetail;
            this.state.addedBoxRegion = this.props.editableRegion;
            this.state.addedBoxLabel = this.props.editableLabel ? this.props.editableLabel.split(',') : [];
            this.state.selectedImage = this.props.editableImage;
        }

        return (
            <div role="dialog" className={"rtl modal " + this.state.displayMode}>
                <div role="document" className="modal-dialog addbox__modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{this.state.modalTitle}</div>
                        </div>
                        <div className="modal-body">
                            <div className="input__floater">
                                <div className="row mb-4">
                                    <label htmlFor='add-box-input'>عنوان جعبه:</label>
                                    <input onChange={this.boxTitleChange} value={this.state.addedBoxTitle} id='add-box-input' type='text' className='form-control' placeholder='لغات آلمانی، اصطلاحات انگلیسی، ...'/>
                                </div>
                                <div className="row mb-4">
                                    <label htmlFor='add-box-input'>توضیحات:</label>
                                    <input onChange={this.boxDetailChange} value={this.state.addedBoxDetail} id='add-box-input-detail' type='text' className='form-control' placeholder='این جعبه شامل لغات سطح آ2 آلمانی می‌باشد...'/>
                                </div>
                            </div>

                            <div >
                                <div className="row mb-4">
                                    <div className='d-flex flex-row w-100'>

                                        <label htmlFor='add-box-input'>ناحیه:</label>

                                        <div className="form-check pr-3">
                                            <input onChange={this.boxRegionChange} className="form-check-input" checked={this.state.addedBoxRegion === 'fa'} type="radio" name="region" id="region-fa" value="fa"/>
                                            <label className="form-check-label pr-3" htmlFor="region-fa">Fa</label>
                                        </div>

                                        <div className="form-check pr-2">
                                            <input onChange={this.boxRegionChange} className="form-check-input" checked={this.state.addedBoxRegion === 'en'} type="radio" name="region" id="region-en" value="en"/>
                                            <label className="form-check-label pr-3" htmlFor="region-en">En</label>
                                        </div>

                                        <div className="form-check pr-2">
                                            <input onChange={this.boxRegionChange} className="form-check-input" checked={this.state.addedBoxRegion === 'both'} type="radio" name="region" id="region-both" value="both"/>
                                            <label className="form-check-label pr-3" htmlFor="region-both">Both</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="d-flex flex-row w-100 tag-div region__container">

                                        <label htmlFor='add-box-input'>تگ‌ها:</label>

                                        <div className='d-flex flex-column'>
                                            <div className='row w-100'>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('english')} type="checkbox" name="label[]" id="label-english" value="english"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-english">انگلیسی</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('persian')} type="checkbox" name="label[]" id="label-persian" value="persian"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-persian">فارسی</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('france')} type="checkbox" name="label[]" id="label-france" value="france"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-france">فرانسه</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('spanish')} type="checkbox" name="label[]" id="label-spanish" value="spanish"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-spanish">اسپانیایی</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('german')} type="checkbox" name="label[]" id="label-german" value="german"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-german">آلمانی</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('italian')} type="checkbox" name="label[]" id="label-italian" value="italian"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-italian">ترکی</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('math')} type="checkbox" name="label[]" id="label-math" value="math"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-math">ریاضی</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('physics')} type="checkbox" name="label[]" id="label-physics" value="physics"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-physics">فیزیک</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('chemistry')} type="checkbox" name="label[]" id="label-chemistry" value="chemistry"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-chemistry">شیمی</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('computer')} type="checkbox" name="label[]" id="label-computer" value="computer"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-computer">کامپیوتر</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('lived')} type="checkbox" name="label[]" id="label-lived" value="lived"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-lived">زیست</label>
                                                </div>

                                                <div className="form-check pr-2">
                                                    <input onChange={this.boxLabelChange} className="form-check-input" checked={this.state.addedBoxLabel.includes('general')} type="checkbox" name="label[]" id="label-general" value="general"/>
                                                    <label className="form-check-label pr-3" htmlFor="label-general">عمومی</label>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <label htmlFor='add-box-input'>عکس جعبه:</label>
                                <div className="row add-box-image mz-scroll box__img-selector-div">
                                    {this.state.availableImages.map((image, i) => {
                                        return (<div key={i} className={(this.state.selectedImage == image) ? 'active col-4' : 'col-4'}>
                                            <img onClick={() => this.selectBoxImage(image)} className='w-100' src={'/img/user_cards/' + image + '.png'}/>
                                        </div>);
                                    })}
                                </div>
                            </div>
                        </div>
                        {(this.props.editMode === true) ?
                            <div className="modal-footer justify-content-between">
                                <div>
                                    <button onClick={() => this.deleteBox(this.props.editableId)} type="button" className="btn btn-outline-danger float-left ">{this.state.deleteBtnText}</button>
                                </div>
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

export default AdminModalAddBox;
