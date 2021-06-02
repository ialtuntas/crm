import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { inject, observer } from "mobx-react";
// formlara id veya name değeri tanımlanmak zorunda touchedin duzgun çalışması için
const Register = (props) => {
    console.log(props);
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        if (props.AuthStore.appState != null) {
            if (props.AuthStore.appState.isLoggedIn) {
                return props.history.push("/");
            }
        }
    });
    const handleSubmit = (values) => {
        axios
            .post(`/api/auth/register`, { ...values })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    const userData = {
                        id: res.data.id,
                        name: res.data.name,
                        email: res.data.email,
                        access_token: res.data.access_token,
                    };
                    const appState = {
                        isLoggedIn: true,
                        user: userData,
                    };
                    props.AuthStore.saveToken(appState);
                    props.history.push("/");
                    //location.reload();
                    alert("Kayıt Tamamlandı");
                } else {
                    alert("Kayıt Yapamadınız");
                }
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    let err = error.response.data;
                    setErrors(err.errors);
                    //alert(err.errors)
                } else if (error.request) {
                    let err = error.request;
                    setError(err);
                } else {
                    setError(error.message);
                }
            });
    };
    let arr = [];
    Object.values(errors).forEach((value) => {
        arr.push(value);
    });
    return (
        <div className="lr-container">
            <main className="form-signin">
                <form>
                    <img
                        className="mb-4"
                        src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
                        alt=""
                        width="72"
                        height="57"
                    />
                    <h1 className="h3 mb-3 fw-normal">Kayıt Ol</h1>

                    {arr.length != 0 &&
                        arr.map((item) => (
                            <div
                                key={item}
                                className="alert alert-danger"
                                role="alert"
                            >
                                {item}
                            </div>
                        ))}
                    {error != "" && (
                        <div
                            key={item}
                            className="alert alert-danger"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            password_confirmation: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email("Email Formatı Hatalı")
                                .required("Email Zorunludur"),
                            name: Yup.string().required(" Ad Soyad Zorunludur"),
                            password: Yup.string().required("Şifre Zorunludur"),
                            password_confirmation: Yup.string()
                                .required("Şifre Tekrarı Zorunludur")
                                .oneOf(
                                    [Yup.ref("password"), null],
                                    "Şifreler Eşleşmiyor"
                                ),
                        })}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            errors,
                            isValid,
                            isSubmitting,
                            touched,
                        }) => (
                            <div>
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="name"
                                        name="name"
                                        onBlur={handleBlur}
                                        placeholder="Ad Soyad"
                                        value={values.name}
                                        onChange={handleChange("name")}
                                    />

                                    {errors.name && touched.name && (
                                        <div
                                            className="alert alert-danger mt-2 mb-2 p-1"
                                            role="alert"
                                        >
                                            {errors.name}
                                        </div>
                                    )}
                                    <label htmlFor="floatingInput">İsim</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="middle"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        name="email"
                                        autoComplete="off"
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onChange={handleChange("email")}
                                    />
                                    {errors.email && touched.email && (
                                        <div
                                            className="alert alert-danger mt-2 mb-2 p-1"
                                            role="alert"
                                        >
                                            {errors.email}
                                        </div>
                                    )}
                                    <label htmlFor="floatingInput">
                                        Email adresi
                                    </label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="******"
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange("password")}
                                    />
                                    {errors.password && touched.password && (
                                        <div
                                            className="alert alert-danger mt-2 mb-2 p-1"
                                            role="alert"
                                        >
                                            {errors.password}
                                        </div>
                                    )}
                                    <label htmlFor="floatingInput">Şifre</label>
                                </div>

                                <div className="form-floating">
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        className="form-control"
                                        placeholder="*******"
                                        onBlur={handleBlur}
                                        value={values.password_confirmation}
                                        onChange={handleChange(
                                            "password_confirmation"
                                        )}
                                    />
                                    {errors.password_confirmation &&
                                        touched.password_confirmation && (
                                            <div
                                                className="alert alert-danger mb-2 p-1"
                                                role="alert"
                                            >
                                                {errors.password_confirmation}
                                            </div>
                                        )}
                                    <label htmlFor="floatingPassword">
                                        Şifre Tekrarı
                                    </label>
                                </div>
                                <button
                                    disabled={!isValid}
                                    onClick={handleSubmit}
                                    className="w-100 btn btn-lg btn-primary"
                                    type="button"
                                >
                                    Kayıt Ol
                                </button>
                            </div>
                        )}
                    </Formik>
                    <Link to="/login">
                        <div className="mt-1 w-100 btn btn-lg btn-outline-danger">
                            Giriş Yap
                        </div>
                    </Link>
                    <p className="mt-5 mb-3 text-muted">&copy; BStock 2021</p>
                </form>
            </main>
        </div>
    );
};

export default inject("AuthStore")(observer(Register));
