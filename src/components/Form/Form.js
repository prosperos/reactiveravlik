import React, { Component } from "react";


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            text: ""
        };
    }
    Change(e) {
        const { id, value } = e.currentTarget;
        this.setState({ [id]: value });
    }
    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        if (this.state.myfile) {
            formData.append("myfile", this.state.myfile);
        }
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("phone", this.state.phone);
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
        const { name, email, text, phone } = this.state;
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
                <input
                    id="tel"
                    name="phone"
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={phone}
                    placeholder="Телефон *"
                    onChange={this.Change.bind(this)}
                />
                <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    placeholder="Електронна скринька"
                    onChange={this.Change.bind(this)}
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