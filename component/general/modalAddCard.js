import React, { Component } from "react";
import Cookies from "universal-cookie";
import imageCompression from "browser-image-compression";
import { FcAddImage, FcEmptyTrash } from "react-icons/fc";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

class ModalAddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookie: new Cookies(),
            id: null,
            top: "",
            bottom: "",
            alert_msg: null,
            classThis: this,
            topPicName: "",
            hexOfTopPic: "",
            alert_type: null,
            bottomPicName: "",
            testFileTop: null,
            hexOfBottomPic: "",
            displayFileTop: null,
            displayFileBottom: null,
            directionClass: "panel__rtl-input",
            directionClassB: "panel__rtl-input",
            BtnStatusIsLoading: false,
            BottomImageIsLoadingToShow: false,
            TopImageIsLoadingToShow: false,
            userStatusIsPremium: false,
        };
        this.hexifyTop = this.hexifyTop.bind(this);
        this.hexifyBottom = this.hexifyBottom.bind(this);
        this.uploadFileTop = this.uploadFileTop.bind(this);
        this.uploadFileBot = this.uploadFileBot.bind(this);
        this.setTopPicName = this.setTopPicName.bind(this);
        this.setBottomPicName = this.setBottomPicName.bind(this);
        // this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount() {
        const cookie = new Cookies();
        const Token = cookie.get("leitner_token");
        fetch(process.env.serverUrl + "/profile/" + Token, {
            method: "get",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.token === Token) {
                    if (response.plan) {
                        this.setState({
                            userStatusIsPremium: true,
                        });
                    }
                }
            })
            .catch((err) => console.log(""));
    }

    topCard = (event) => {
        let enteredChar = event.target.value;
        let newDirection = "panel__rtl-input";

        if (enteredChar >= "A" && enteredChar <= "z") {
            newDirection = "panel__ltr-input";
        }

        this.setState({
            top: event.target.value,
            directionClass: newDirection,
        });
    };
    bottomCard = (event) => {
        let enteredCharB = event.target.value;
        let newDirectionB = "panel__rtl-input";

        if (enteredCharB >= "A" && enteredCharB <= "z") {
            newDirectionB = "panel__ltr-input";
        }

        this.setState({
            bottom: event.target.value,
            directionClassB: newDirectionB,
        });
    };

    add = () => {
        if (!this.state.top || !this.state.bottom) {
            alert("محتوایی برای رو و پشت کارت مشخص کنید.");
            this.setState({
                BtnStatusIsLoading: false,
            });
            return;
        }
        fetch(process.env.serverUrl + "/card/add", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
                box_id: this.props.boxId,
                top: this.state.top,
                bottom: this.state.bottom,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    top: "",
                    bottom: "",
                });

                this.props.getAllCards();
                this.props.alert(
                    "success",
                    "کارت اضافه شد. یه کارت دیگه اضافه کن...",
                    1500
                );
                this.setState({
                    BtnStatusIsLoading: false,
                });
            });
    };

    edit = () => {
        fetch(process.env.serverUrl + "/card/edit", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: this.state.cookie.get("leitner_token"),
                card_id: this.state.id,
                top: this.state.top,
                bottom: this.state.bottom,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.props.alert("info", "کارت بروزرسانی شد!", 1500);
                this.props.closeModal("review");
            });
    };

    newAdd = () => {
        this.setState({
            BtnStatusIsLoading: true,
        });
        
         if (this.state.top.length > 0 && this.state.bottom.length > 0) {
            this.add();
        } else if (
            this.state.hexOfTopPic.length > 0 ||
            this.state.hexOfBottomPic.length > 0
        ) {
            fetch(process.env.serverUrl + "/imageaddforcards", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: this.state.cookie.get("leitner_token"),
                    box_id: this.props.boxId,
                    top_pic: this.state.hexOfTopPic,
                    bottom_pic: this.state.hexOfBottomPic,
                    top_name: this.state.topPicName,
                    bottom_name: this.state.bottomPicName,
                    top: this.state.top,
                    bottom: this.state.bottom,
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        top: "",
                        bottom: "",
                        top_pic: "",
                        bottom_pic: "",
                        top_pic_name: "",
                        bottom_pic_name: "",
                        displayFileTop: "",
                        displayFileBottom: "",
                        displayFileBot: "",
                        id: null,

                        topPicName: "",
                        hexOfTopPic: "",

                        bottomPicName: "",
                        testFileTop: null,
                        hexOfBottomPic: "",
                        directionClass: "panel__rtl-input",
                        directionClassB: "panel__rtl-input",
                    });
                    let myThis = this.state.classThis;
                    myThis.hexifyTop("");
                    myThis.setTopPicName("");

                    myThis.hexifyBottom("");
                    myThis.setBottomPicName("");

                    this.props.getAllCards();
                    this.props.alert(
                        "success",
                        "کارت اضافه شد. یه کارت دیگه اضافه کن...",
                        1500
                    );
                    this.setState({
                        BtnStatusIsLoading: false,
                    });
                });
        } else if (this.state.top.length == 0 || this.state.bottom.length == 0) {
            alert("محتوایی برای رو و پشت کارت مشخص کنید");
            this.setState({
                BtnStatusIsLoading: false,
            });
            return;
        } 
    };

    newEdit = () => {
        this.setState({
            BtnStatusIsLoading: true,
        });

        if (this.state.top.length > 0 && this.state.bottom.length > 0) {
            this.edit();
        } else {
            // console.log(this.state.hexOfTopPic.length);
            fetch(process.env.serverUrl + "/card/imageedit", {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: this.state.cookie.get("leitner_token"),
                    box_id: this.props.boxId,
                    card_id: this.state.id,
                    top_pic: this.state.hexOfTopPic,
                    bottom_pic: this.state.hexOfBottomPic,
                    top_name: this.state.topPicName,
                    bottom_name: this.state.bottomPicName,
                    top: this.state.top,
                    bottom: this.state.bottom,
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        top_pic: "",
                        bottom_pic: "",
                        top_pic_name: "",
                        bottom_pic_name: "",
                        displayFileTop: "",
                    });

                    this.props.alert("info", "کارت بروزرسانی شد!", 1500);
                    this.props.closeModal("review");
                });
        }
    };

    delete = () => {
        if (confirm("مطمئن هستید؟")) {
            fetch(process.env.serverUrl + "/card/delete", {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: this.state.cookie.get("leitner_token"),
                    card_id: this.state.id,
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    this.props.alert("info", "کارت حذف شد!", 1500);
                    this.props.closeModal("review");
                });
        }
    };

    uploadFileTop(event) {
        this.setState({
            displayFileTop: URL.createObjectURL(event.target.files[0]),
        });
    }

    uploadFileBot(event) {
        this.setState({
            displayFileBot: URL.createObjectURL(event.target.files[0]),
        });
    }

    hexifyTop(input) {
        this.setState({
            hexOfTopPic: input,
        });
    }

    hexifyBottom(input) {
        this.setState({
            hexOfBottomPic: input,
        });
    }

    setTopPicName(name) {
        this.setState({
            topPicName: name,
        });
        this.setState({
            TopImageIsLoadingToShow: false,
        });
    }

    setBottomPicName(name) {
        this.setState({
            bottomPicName: name,
        });

        this.setState({
            BottomImageIsLoadingToShow: false,
        });
    }

    onChangeHandlerTop = (event) => {
        let imageFile = event.target.files[0];

        if (this.state.top.length > 0) {
            this.setState({
                top: "",
            });
        }

        this.setState({
            TopImageIsLoadingToShow: true,
        });

        let myThis = this.state.classThis;

        // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
        // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        this.uploadFileTop(event);

        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 4500,
            useWebWorker: true,
            fileType: "image/png",
            initialQuality: 0.6,
        };

        imageCompression(imageFile, options)
            .then(function (compressedFile) {
                // console.log(
                //     "compressedFile instanceof Blob",
                //     compressedFile instanceof Blob
                // ); // true
                // console.log(
                //     `compressedFile size ${
                //         compressedFile.size / 1024 / 1024
                //     } MB`
                // ); // smaller than maxSizeMB
                // console.log(`compressedFileName is ${compressedFile.name} `);
                // console.log(compressedFile); // write your own logic

                let fileReader = new FileReader();

                fileReader.readAsArrayBuffer(compressedFile);

                fileReader.onload = function (event) {
                    let mohsen = fileReader.result;
                    let x = new Uint8Array(mohsen);

                    let toHexString = (byteArray) => {
                        return Array.from(byteArray, function (byte) {
                            return ("0" + (byte & 0xff).toString(16)).slice(-2);
                        }).join("");
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

    onChangeHandlerBot = (event) => {
        this.setState({
            BottomImageIsLoadingToShow: true,
        });

        let imageFile = event.target.files[0];

        if (this.state.bottom.length > 0) {
            this.setState({
                bottom: "",
            });
        }

        let myThis = this.state.classThis;

        // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
        // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        this.uploadFileBot(event);

        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 4500,
            useWebWorker: true,
            fileType: "image/png",
            initialQuality: 0.6,
        };

        imageCompression(imageFile, options)
            .then(function (compressedFile) {
                // console.log(
                //     "compressedFile instanceof Blob",
                //     compressedFile instanceof Blob
                // ); // true
                // console.log(
                //     `compressedFile size ${
                //         compressedFile.size / 1024 / 1024
                //     } MB`
                // ); // smaller than maxSizeMB
                // console.log(`compressedFileName is ${compressedFile.name} `);
                // console.log(compressedFile); // write your own logic

                let fileReader = new FileReader();

                fileReader.readAsArrayBuffer(compressedFile);

                fileReader.onload = function (event) {
                    let mohsen = fileReader.result;
                    let x = new Uint8Array(mohsen);

                    let toHexString = (byteArray) => {
                        return Array.from(byteArray, function (byte) {
                            return ("0" + (byte & 0xff).toString(16)).slice(-2);
                        }).join("");
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

    NotPremium = () => {
        alert(
            "برای اضافه کردن تصویر به کارت لطفا اشتراک ویژه خود را تمدید کنید"
        );
    };

    render() {
        let topPreview;
        let botPreview;
        if (this.state.displayFileTop) {
            topPreview = (
                <img
                    src={this.state.displayFileTop}
                    className="form-group preview image__add-module-object"
                    alt={"No File To Show!!!"}
                />
            );
        } else if (this.state.top.includes("ps://leitnersys.ir/images/card")) {
            topPreview = (
                <img
                    src={this.state.top}
                    className="form-group preview image__add-module-object"
                    alt={"No File To Show!!!"}
                />
            );
        } else {
            topPreview = (
                <textarea
                    onChange={this.topCard}
                    id="card-top-input"
                    type="text"
                    className={"form-control " + this.state.directionClass}
                    value={this.state.top}
                />
            );
        }

        if (this.state.displayFileBot) {
            botPreview = (
                <img
                    src={this.state.displayFileBot}
                    className="form-group preview image__add-module-object"
                    alt={"No File To Show!!!"}
                />
            );
        } else if (
            this.state.bottom.includes("ps://leitnersys.ir/images/card")
        ) {
            botPreview = (
                <img
                    src={this.state.bottom}
                    className="form-group preview image__add-module-object"
                    alt={"No File To Show!!!"}
                />
            );
        } else {
            botPreview = (
                <textarea
                    onChange={this.bottomCard}
                    id="card-bottom-input"
                    type="text"
                    className={"form-control " + this.state.directionClassB}
                    value={this.state.bottom}
                />
            );
        }

        if (this.props.editMode && this.state.id == null) {
            this.setState({
                id: this.props.editableCard.id,
                top: this.props.editableCard.top,
                bottom: this.props.editableCard.bottom,
            });
        }

        return (
            <div role="dialog" className="rtl modal d-block dialog__scroller">
                <div role="document" className="modal-dialog">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <div className="modal-title h4">
                                {this.props.editMode ? (
                                    <span>ویرایش</span>
                                ) : (
                                    <span>افزودن</span>
                                )}{" "}
                                کارت
                            </div>
                        </div> */}
                        <div className="modal-body">
                            <div className="row mb-4">
                                <label htmlFor="card-top-input">
                                    محتوای روی کارت:
                                </label>

                                {!this.props.editMode ? (
                                    <div className="label__addcard-item">
                                        {this.state.userStatusIsPremium ? (
                                            <label
                                                htmlFor="upload-photo-top"
                                                className="add-sign-image"
                                            >
                                                <FcAddImage size="2rem" />
                                            </label>
                                        ) : (
                                            <div
                                                className="add-sign-image"
                                                onClick={this.NotPremium}
                                            >
                                                <FcAddImage size="2rem" />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}

                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    className="add-sign-top"
                                    id="upload-photo-top"
                                    onChange={this.onChangeHandlerTop}
                                />
                                <div className="image__add-module ">
                                    {this.state.TopImageIsLoadingToShow ==
                                    true ? (
                                        <div className="form-group preview image__add-module-object loading_for-imageupload">
                                            <div className="lds-default">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p></p>
                                    )}
                                    {topPreview}
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label htmlFor="card-bottom-input">
                                    محتوای پشت کارت:
                                </label>

                                {!this.props.editMode ? (
                                    <div className="label__addcard-item">
                                        {this.state.userStatusIsPremium ? (
                                            <label
                                                htmlFor="upload-photo-bot"
                                                className="add-sign-image"
                                            >
                                                <FcAddImage size="2rem" />
                                            </label>
                                        ) : (
                                            <div
                                                className="add-sign-image"
                                                onClick={this.NotPremium}
                                            >
                                                <FcAddImage size="2rem" />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}

                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    className="add-sign-bot"
                                    id="upload-photo-bot"
                                    onChange={this.onChangeHandlerBot}
                                />
                                <div className="image__add-module ">
                                    {/* this.state.BottomImageIsLoadingToShow */}
                                    {this.state.BottomImageIsLoadingToShow ==
                                    true ? (
                                        <div className="form-group preview image__add-module-object loading_for-imageupload">
                                            <div className="lds-default">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p></p>
                                    )}
                                    {botPreview}
                                </div>
                            </div>
                        </div>
                        {this.props.editMode ? (
                            <div className="modal-footer justify-content-between">
                                <div className="exit__remove-module">
                                    <button
                                        onClick={this.delete}
                                        type="button"
                                        className="btn btn-outline-danger"
                                    >
                                        <RiDeleteBinLine size="1.5rem" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            this.props.closeModal("review")
                                        }
                                        type="button"
                                        className="btn btn-outline-info margin__left-none"
                                    >
                                        خروج
                                    </button>
                                </div>
                                <div className="submit__btn-addcard">
                                    {this.state.BtnStatusIsLoading == true ? (
                                        <button
                                            onClick={this.newAdd}
                                            type="button"
                                            className="btn btn-primary loading__btn cursor__off submit-module-addcard "
                                        >
                                            <div class="lds-ellipsis">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>{" "}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={this.newEdit}
                                            type="button"
                                            className="btn btn-primary ml-1 submit-module-addcard "
                                        >
                                            ثبت ویرایش
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="modal-footer">
                                {this.state.BtnStatusIsLoading == true ? (
                                    <button
                                        onClick={this.newAdd}
                                        type="button"
                                        className="btn btn-primary loading__btn cursor__off"
                                    >
                                        <div class="lds-ellipsis">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>{" "}
                                    </button>
                                ) : (
                                    <button
                                        onClick={this.newAdd}
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        افزودن
                                    </button>
                                )}

                                <button
                                    onClick={() => this.props.closeModal()}
                                    type="button"
                                    className="btn btn-outline-info"
                                >
                                    خروج
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalAddCard;
