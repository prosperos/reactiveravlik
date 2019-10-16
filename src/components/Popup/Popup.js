import React from "react";
import Popup from "reactjs-popup";
import MyForm from "../Form/Form";
export default () => (
    <Popup trigger={<button className="button big_button"> Зв'язатись з нами </button>} modal>
        {close => (
            <div className="modal modalMobile">
                <a className="close" onClick={close}>
                    <span></span>
                    <span></span>
                </a>
                <div className="form_wrapper_mobile">
                    <h3>Зв'язатись з нами</h3>

                    <MyForm />
                </div>
            </div>
        )}
    </Popup>
);