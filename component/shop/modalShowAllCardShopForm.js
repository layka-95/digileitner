import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
const axios = require('axios');

function ModalShowAllCardShopForm(props) {
    const [displayMode, setdisplayMode] = useState('d-block');
    const [userFilter, setuserFilter] = useState("");
    const [cards, setcards] = useState([]);
    const [loaded, setloaded] = useState(false);
    const [boxAddWaiting, setboxAddWaiting] = useState(false);

    const cookie = new Cookies();

    const closeModal = () => {
        setdisplayMode('');

        props.toggleModalShowAll();
    }

    const addBoxToArchive = () => {
        props.addBoxToArchive();
        setboxAddWaiting(true);
    }

    const searchInput = (event) => {
        setuserFilter(event.target.value)
    }


    useEffect(() => {
        const Token = cookie.get('leitner_token');
        const IdOfBox = props.boxId;
        // console.log(Token, IdOfBox)
        axios.post(process.env.serverUrl + '/card/shopcardshowall', {
            token: Token,
            box_id: IdOfBox
        })
            .then(function (response) {
                setcards(response.data)
            }).then(function (done) {
                setloaded(true)
            })

    }, [])




    const CardCounter = function (q) {
        var counter = 0;
        {
            q.map(a => {
                counter = counter + 1;

            })
        }
        return (counter);
    }

    const highlighter = (input) => {
        if (userFilter.length > 0) {
            input = input.replace(new RegExp(userFilter, 'ig'), `<span className="shop__highlighter">${userFilter}</span>`);
        }
        let result = { __html: input };
        return (<div dangerouslySetInnerHTML={result}></div>);
    }


    const FilteredCardCounter = function (Cards, userFilter) {
        return Cards.filter(cards => cards.top.toLowerCase().includes(userFilter.toLowerCase()) || cards.bottom.toLowerCase().includes(userFilter.toLowerCase())).length;
    }

    return (
        <div role="dialog" className={`rtl modal ${displayMode}`}>


            <div role="document" className="modal-dialog">
                <div className="modal-content archive__showallcardcontroller fade-in-right">
                    <div className="modal-header modal-header-bc">

                        <div className="shop__see-all-icon-on-top">
                            <li className="list-shop-icon pl-3 pr-1 postcard_shop-page closeshop" onClick={closeModal}><img src="../img/icons/arrow-right.png" alt="" className="arrow__icon-shop" /></li>
                            <li className="list-shop-icon pl-3 pr-1"><img src="../img/icons/book-open.png" alt="" className="postcard_shop-page" /></li>
                            {props.downloaded}
                            <li className="list-shop-icon pl-3 pr-1"><img src="../img/icons/postcard.png" alt="" className="openbook_shop-page" /></li>
                            {CardCounter(cards)}
                        </div>

                    </div>
                    <div className="title_allcards modal-header-bc modal-title h4 shop__title">{props.title}</div>

                    {boxAddWaiting == true &&
                        <div className="modal-header-bc">
                            <button className="shop__add-button modal-header-bc">
                                <li className="list-shop-icon shop__add-title"> لطفا صبر کنید </li>
                                <div className="loading-heart"> <div className="lds-heart"><div></div></div> </div>
                            </button>
                        </div>
                    }
                    {boxAddWaiting == false &&
                        <div className="modal-header-bc">
                            <button className="shop__add-button modal-header-bc" onClick={addBoxToArchive}>
                                <li className="list-shop-icon shop__add-title">افزودن به پنل کاربری</li>
                                <li className="list-shop-icon pl-3 "><img src="../img/icons/plus.png" alt="" className="plus_shop-page" /></li>
                            </button>
                        </div>
                    }




                    <div className="detaile__outer word__break-stoper">
                        {props.detaile}
                    </div>

                    <div className=" search__onshop-controller">
                        <input type="text" onChange={searchInput} className="shop__add-button modal-header-bc search__onshop form-control " placeholder="جستجو" />
                        <img src="../img/icons/search.png" alt="" className="search__icon" id="myInput" />
                    </div>

                    <div className="modal-body flex-row mz-scroll show-all-card">

                        {loaded === false &&
                             <div className="loading-heart"> <div className="lds-heart"><div></div></div> </div>
                        }
                        
                        {loaded === true &&
                            cards.filter(cards => cards.top.toLowerCase().includes(userFilter.toLowerCase()) || cards.bottom.toLowerCase().includes(userFilter.toLowerCase())).map((item, i) => {
                                return (<div key={i} className={' my-2 text-right showallcard__card'}>
                                    <div className="m-0 shop__card-top"><br /><p className="rtl__modal word__break-stoper enter__handler">{highlighter(item.top)}</p>
                                        {userFilter.length > 0 && <span className="badge shop__filter-counter">{i + 1}/{FilteredCardCounter(cards, userFilter)}</span>}
                                    </div>

                                    <div className="m-0 shop__card-bottom"><br /><strong><p className="rtl__modal word__break-stoper enter__handler">{highlighter(item.bottom)}</p></strong></div>
                                </div>);
                            })
                        }

                    </div>
                </div>
            </div>
        </div >
    )

}




export default ModalShowAllCardShopForm;
