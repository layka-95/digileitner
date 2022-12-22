import React, {Component} from 'react';
import Cookies from "universal-cookie";
import imageCompression from 'browser-image-compression';

class PanelModalAddCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cookie: new Cookies(),
            id: null,
            top: '',
            bottom: '',
            alert_msg: null,
            classThis: this,
            topPicName: '',
            hexOfTopPic: '',
            alert_type: null,
            bottomPicName: '',
            testFileTop: null,
            hexOfBottomPic: '',
            displayFileTop: null,
            displayFileBottom: null,
            directionClass: 'panel__rtl-input',
            directionClassB: 'panel__rtl-input',
        };
        this.hexifyTop = this.hexifyTop.bind(this);
        this.hexifyBottom = this.hexifyBottom.bind(this);
        this.uploadFileTop = this.uploadFileTop.bind(this);
        this.uploadFileBot = this.uploadFileBot.bind(this);
        this.setTopPicName = this.setTopPicName.bind(this);
        this.setBottomPicName = this.setBottomPicName.bind(this);
        // this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    topCard = (event) => {
        let enteredChar = event.target.value;
        let newDirection = 'panel__rtl-input';

        if (enteredChar >= 'A' && enteredChar <= 'z') {
            newDirection = 'panel__ltr-input';
        }

        this.setState({
            top: event.target.value,
            directionClass: newDirection
        })
    }
    bottomCard = (event) => {
        let enteredCharB = event.target.value;
        let newDirectionB = 'panel__rtl-input';

        if (enteredCharB >= 'A' && enteredCharB <= 'z') {
            newDirectionB = 'panel__ltr-input';
        }

        this.setState({
            bottom: event.target.value,
            directionClassB: newDirectionB
        })
    }

    add = () => {

        fetch(process.env.serverUrl + '/card/add', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                box_id: this.props.boxId,
                top: this.state.top,
                bottom: this.state.bottom
            })
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    top: '',
                    bottom: '',
                })

                this.props.getAllCards();
                this.props.alert('success', 'کارت اضافه شد. یه کارت دیگه اضافه کن...', 1500);
            });
    }

    newAdd = () => {

        if (this.state.top.length > 0 && this.state.bottom.length > 0) {
            this.add()
        } else {

            fetch(process.env.serverUrl + '/imageaddforcards', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: this.state.cookie.get('leitner_token'),
                    box_id: this.props.boxId,
                    top_pic: this.state.hexOfTopPic,
                    bottom_pic: this.state.hexOfBottomPic,
                    top_name: this.state.topPicName,
                    bottom_name: this.state.bottomPicName,
                    top: this.state.top,
                    bottom: this.state.bottom
                })
            }).then(response => response.json())
                .then(response => {
                        this.setState({
                            top: '',
                            bottom: '',
                            top_pic: '',
                            bottom_pic: '',
                            top_pic_name: '',
                            bottom_pic_name: '',
                        })

                        this.props.getAllCards();
                        this.props.alert('success', 'کارت اضافه شد. یه کارت دیگه اضافه کن...', 1500);
                    }
                );
        }
    }


    edit = () => {
        fetch(process.env.serverUrl + '/card/edit', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: this.state.cookie.get('leitner_token'),
                card_id: this.state.id,
                top: this.state.top,
                bottom: this.state.bottom
            })
        }).then(response => response.json())
            .then(response => {
                this.props.alert('info', 'کارت بروزرسانی شد!', 1500);
                this.props.closeModal('review');
            });
    }

    newEdit = () => {
        if (this.state.top.length > 0 && this.state.bottom.length > 0) {
            this.edit()
        } else {
            fetch(process.env.serverUrl + '/card/imageedit', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: this.state.cookie.get('leitner_token'),
                    box_id: this.props.boxId,
                    card_id: this.state.id,
                    top_pic: this.state.hexOfTopPic,
                    bottom_pic: this.state.hexOfBottomPic,
                    top_name: this.state.topPicName,
                    bottom_name: this.state.bottomPicName,
                    top: this.state.top,
                    bottom: this.state.bottom
                })
            }).then(response => response.json())
                .then(response => {
                    this.setState({
                        top_pic: '',
                        bottom_pic: '',
                        top_pic_name: '',
                        bottom_pic_name: '',
                    })

                    this.props.alert('info', 'کارت بروزرسانی شد!', 1500);
                    this.props.closeModal('review');
                });
        }
    }

    delete = () => {
        if (confirm('مطمئن هستید؟')) {
            fetch(process.env.serverUrl + '/card/delete', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: this.state.cookie.get('leitner_token'),
                    card_id: this.state.id,
                })
            }).then(response => response.json())
                .then(response => {
                    this.props.alert('info', 'کارت حذف شد!', 1500);
                    this.props.closeModal('review');
                });
        }
    }

    uploadFileTop(event) {
        this.setState({
            displayFileTop: URL.createObjectURL(event.target.files[0])
        })
    }

    uploadFileBot(event) {
        this.setState({
            displayFileBot: URL.createObjectURL(event.target.files[0])
        })
    }

    hexifyTop(input) {
        this.setState({
            hexOfTopPic: input,
        })
    }

    hexifyBottom(input) {
        this.setState({
            hexOfBottomPic: input,
        })
    }

    setTopPicName(name) {
        this.setState({
            topPicName: name,
        })
    }

    setBottomPicName(name) {
        this.setState({
            bottomPicName: name,
        })
    }

    onChangeHandlerTop = event => {
        let imageFile = event.target.files[0];

        if (this.state.top.length > 0) {
            this.setState({
                top: '',
            })
        }

        let myThis = this.state.classThis;

        // console.log('originalFile instanceof Blob', imageFile instanceof Blob); 
        // true
        // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        this.uploadFileTop(event);

        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 4500,
            useWebWorker: true,
            fileType: "image/png",
            initialQuality: 0.6
        }

        imageCompression(imageFile, options)
            .then(function (compressedFile) {
                // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                // console.log(`compressedFileName is ${compressedFile.name} `);
                // console.log(compressedFile); // write your own logic

                let fileReader = new FileReader();

                fileReader.readAsArrayBuffer(compressedFile);

                fileReader.onload = function (event) {
                    let mohsen = fileReader.result;
                    let x = new Uint8Array(mohsen);

                    let toHexString = (byteArray) => {
                        return Array.from(byteArray, function (byte) {
                            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
                        }).join('')
                    };

                    myThis.hexifyTop(toHexString(x));
                    myThis.setTopPicName(compressedFile.name);
                };
                return "salaam";
            })
            .catch(function (error) {
                // console.log(error.message);
            });
    };

    onChangeHandlerBot = event => {
        let imageFile = event.target.files[0];

        if (this.state.bottom.length > 0) {
            this.setState({
                bottom: '',
            })
        }

        let myThis = this.state.classThis;

        // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        this.uploadFileBot(event);

        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 4500,
            useWebWorker: true,
            fileType: "image/png",
            initialQuality: 0.6
        }

        imageCompression(imageFile, options)
            .then(function (compressedFile) {
                // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                // console.log(`compressedFileName is ${compressedFile.name} `);
                // console.log(compressedFile); // write your own logic

                let fileReader = new FileReader();

                fileReader.readAsArrayBuffer(compressedFile);

                fileReader.onload = function (event) {
                    let mohsen = fileReader.result;
                    let x = new Uint8Array(mohsen);

                    let toHexString = (byteArray) => {
                        return Array.from(byteArray, function (byte) {
                            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
                        }).join('')
                    };

                    myThis.hexifyBottom(toHexString(x));
                    myThis.setBottomPicName(compressedFile.name);
                };
                return "salaam";
            })
            .catch(function (error) {
                // console.log(error.message);
            });
    };

    render() {
        let topPreview;
        let botPreview;
        if (this.state.displayFileTop) {
            topPreview =
                <img src={this.state.displayFileTop} className="form-group preview" alt={'No File To Show!!!'}/>
        } else {
            topPreview = <textarea onChange={this.topCard} id='card-top-input' type='text'
                                   className={'form-control ' + this.state.directionClass}
                                   value={this.state.top}/>
        }

        if (this.state.displayFileBot) {
            botPreview =
                <img src={this.state.displayFileBot} className="form-group preview" alt={'No File To Show!!!'}/>
        } else {
            botPreview = <textarea onChange={this.bottomCard} id='card-bottom-input' type='text'
                                   className={'form-control ' + this.state.directionClassB}
                                   value={this.state.bottom}/>
        }

        if (this.props.editMode && this.state.id == null) {
            this.setState({
                id: this.props.editableCard.id,
                top: this.props.editableCard.top,
                bottom: this.props.editableCard.bottom,
            })
        }

        return (
            <div role="dialog" className="rtl modal d-block">
                <div role="document" className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{this.props.editMode ? <span>ویرایش</span> :
                                <span>افزودن</span>} کارت
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-4">
                                <label htmlFor='card-top-input'>محتوای روی کارت:</label>
                                {/* <label htmlFor="upload-photo-top" className="add-sign-top">انتخاب تصویر</label> */}
                                <input type="file" name="photo" accept="image/*" className="add-sign-top"
                                       id="upload-photo-top" onChange={this.onChangeHandlerTop}/>
                                {topPreview}
                            </div>
                            <div className="row mb-4">
                                <label htmlFor='card-bottom-input'>محتوای پشت کارت:</label>
                                {/* <label htmlFor="upload-photo-bot" className="add-sign-bot">انتخاب تصویر</label> */}
                                <input type="file" name="photo" accept="image/*" className="add-sign-bot"
                                       id="upload-photo-bot" onChange={this.onChangeHandlerBot}/>
                                {botPreview}
                            </div>
                        </div>
                        {this.props.editMode ?
                            <div className="modal-footer justify-content-between">
                                <div>
                                    <button onClick={this.delete} type="button" className="btn btn-outline-danger">حذف
                                    </button>
                                </div>
                                <div>
                                    <button onClick={this.newEdit} type="button" className="btn btn-primary ml-1">ویرایش
                                    </button>
                                    <button onClick={() => this.props.closeModal('review')} type="button"
                                            className="btn btn-outline-info">خروج
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="modal-footer">
                                <button onClick={this.newAdd} type="button" className="btn btn-primary">افزودن</button>
                                <button onClick={() => this.props.closeModal()} type="button"
                                        className="btn btn-outline-info">خروج
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PanelModalAddCard;
