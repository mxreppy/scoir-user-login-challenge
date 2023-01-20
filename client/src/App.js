import React from "react";
import {useForm} from "react-hook-form";
import "./App.css";

function App() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data) => console.log(data);

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