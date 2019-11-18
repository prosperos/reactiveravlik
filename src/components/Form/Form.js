import React, { Component } from "react";


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            tel: "",
            text: "",

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
        console.log('handleEmailChange: ', email)
        const emailValid = this.validateEmail(email)

        this.setState({
            email: email,
            emailValid: emailValid
        })
    }

    validateTel(tel){
        const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        return re.test(tel)
    }

    handleTelChange = (e) => {
        const tel = e.target.value
        console.log('handletelChange: ', tel)
        const telValid = this.validateTel(tel)

        this.setState({
            tel: tel,
            telValid: telValid
        })
    }



    onInputFocus = (e) => {
        console.log("focus: ",e)
    }

    onInputBlur = (e) => {

        console.log("Blur: ",e)
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
        fetch("/send.php", {
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

        let emailClass = 'field-container'

        if (!emailValid) {
            emailClass += ' error'
        }

        console.log("emailValid: ", emailValid)

        return (
            <form
                id="form"
                method="post"

                onSubmit={this.onSubmit.bind(this)}
            >
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Ім'я *"
                    onChange={this.Change.bind(this)}
                />

                <label className={emailClass}>Телефон *</label>
                <input
                    id="tel"
                    name="phone"
                    type="tel"
                    value={tel}
                    placeholder="Телефон *"
                    onChange={this.handleTelChange}
                />
                <label className={emailClass}>Електронна скринька</label>
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
                <textarea
                    id="text"
                    name="text"
                    placeholder="Коментар"
                    value={text}
                    onChange={this.Change.bind(this)}
                />
                <input value="Відправити" className="big_button" type="submit" />
            </form>
        );
    }
}

export default Form;