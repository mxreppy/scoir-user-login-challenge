import React from "react";
import {useForm} from "react-hook-form";
import "./App.css";

function App() {
    const {register, handleSubmit, formState: {errors}} = useForm();


    const onSubmit = (data) => {

        console.log(data);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", data.username);
        urlencoded.append("password", data.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/login/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


    }

    function Login() {
        return (

            <section>

                <p className="title">Login Form</p>

                <form className="App" onSubmit={handleSubmit(onSubmit)}>
                    <span>Username: </span>
                    <input type="Username" {...register("username", {required: true})} />
                    {errors.username && <span style={{color: "red"}}>
        *Username* is mandatory </span>}
                    <span>Password: </span><
                    input type="password" {...register("password")} />
                    <input type={"submit"} style={{backgroundColor: "#a1eafb"}}/>
                </form>
            </section>

        );
    }


    return (
        <>
            <Login/>
        </>
    );
}

export default App;