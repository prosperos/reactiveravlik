import React, { Component } from "react";
import emailjs from 'emailjs-com';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            tel: "",
            text: "",
            label_show: false,
            label_show_phone: false,
            label_show_comment: false,
            label_show_name: false,

            formErrors: {name: '', email: '', tel: ''},
            nameValid: false,
            emailValid: false,
            telValid: false,
        };
    }


    validateEmail (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }

    handleEmailChange = (e) => {
        const email = e.target.value
        //console.log('handleEmailChange: ', email)
        const emailValid = this.validateEmail(email)

        this.setState({
            email: email,
            emailValid: emailValid
        })
    }

    validateTel(tel){
        const re = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/
        return re.test(tel)
    }

    handleTelChange = (e) => {
        const tel = e.target.value
        //console.log('handletelChange: ', tel)
        const telValid = this.validateTel(tel)
        if (telValid){
            this.setState({label_show_phone: true})
        }
        console.log('telValid', telValid)
        this.setState({
            tel: tel,
            telValid: telValid
        })
    }

    onInputFocus = (e) => {
        this.setState({label_show: true})
    }
    onInputBlur = (e) => {
        this.setState({label_show: false})
    }


    onInputBlurPhone = (e) => {
        const valid = this.validateTel(e.target.value)
        this.setState({label_show_phone: false})
    }
    onInputFocusPhone = (e) => {
        this.setState({label_show_phone: true})
    }


    onInputBlurComment = (e) => {
        this.setState({label_show_comment: false})
    }
    onInputFocusComment = (e) => {
        this.setState({label_show_comment: true})
    }


    onInputBlurName = (e) => {
        this.setState({label_show_name: false})
    }
    onInputFocusName = (e) => {
        this.setState({label_show_name: true})
    }


    Change(e) {
        const { id, value } = e.currentTarget;
        this.setState({ [id]: value });
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData();

        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("phone", this.state.tel);
        formData.append("text", this.state.text);


      /*  emailjs.sendForm('YOUR_SERVICE_ID', 'template_xXusUPNE', e.target, 'user_OjX64uhRPz1vNiB6lKfcv')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });*/


        fetch("./../send.php", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data);
            });
        });
    }

    render() {
        const { name, email, text, tel, emailValid } = this.state;

      /*  let emailClass = 'field-container emailClass'

        if (!emailValid) {
            emailClass += ' error'
        }*/

        return (
            <form
                id="form"
                method="post"
                onSubmit={this.onSubmit.bind(this)}
            >
                <div className="wrapper_name">
                    <label className={this.state.label_show_name ? 'label_active ' : null}>Ім'я *</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        placeholder="Ім'я *"
                        onFocus={this.onInputFocusName}
                        onBlur={this.onInputBlurName}
                        onChange={this.Change.bind(this)}
                    />
                </div>
                <div className="wrapper_phone">
                    <label className={this.state.label_show_phone ? 'label_active ' : null}>Телефон *</label>

                    <input
                        id="tel"
                        name="phone"
                        type="tel"
                        value={tel}
                        placeholder="Телефон *"
                        onChange={this.handleTelChange}
                        onFocus={this.onInputFocusPhone}
                        onBlur={this.onInputBlurPhone}
                    />
                </div>
                <div className="wrapper_email">
                    <label className={this.state.label_show ? 'label_active ' : null}>Електронна скринька</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        placeholder="Електронна скринька"
                        onChange={this.handleEmailChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                    />
                </div>
                <div className="wrapper_comment">
                    <label className={this.state.label_show_comment ? 'label_active ' : null}>Коментар</label>
                    <textarea
                        id="text"
                        name="text"
                        placeholder="Коментар"
                        value={text}
                        onFocus={this.onInputFocusComment}
                        onBlur={this.onInputBlurComment}
                        onChange={this.Change.bind(this)}
                    />
                </div>
                <input value="Відправити" className="big_button" type="submit" />
            </form>
        );
    }
}

export default Form;