import React, { Component } from "react";


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            text: "",
            myfile: ""
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
        const { name, email, text } = this.state;
        return (
            <form
                id="form"
                encType="multipart/form-data"
                method="post"

                onSubmit={this.onSubmit.bind(this)}
            >
                <p>Имя</p>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Представьтесь"
                    onChange={this.Change.bind(this)}
                />
                <p>Email</p>
                <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    placeholder="Укажите почту"
                    onChange={this.Change.bind(this)}
                />
                <p>Сообщение</p>
                <textarea
                    id="text"
                    name="text"
                    value={text}
                    onChange={this.Change.bind(this)}
                />
                <p>Прикрепить файлы</p>
                <input
                    id="myfile"
                    type="file"
                    name="myfile[]"
                    multiple
                    onChange={this.Change.bind(this)}
                />
                <p>
                    <input value="Отправить" type="submit" />
                </p>
            </form>
        );
    }
}

export default Form;