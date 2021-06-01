import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const Register = () => {
    const handleSubmit = () => {
        alert("Tıklandı");
    };
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
                                        <p>{errors.name}</p>
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
                                        <p>{errors.email}</p>
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
                                        <p>{errors.password}</p>
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
                                            <p>
                                                {errors.password_confirmation}
                                            </p>
                                        )}
                                    <label htmlFor="floatingPassword">
                                        Şifre Tekrarı
                                    </label>
                                </div>
                                <button
                                    disabled={!isValid || isSubmitting}
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
                        <button className="mt-1 w-100 btn btn-lg btn-outline-danger">
                            Giriş Yap
                        </button>
                    </Link>
                    <p className="mt-5 mb-3 text-muted">&copy; BStock 2021</p>
                </form>
            </main>
        </div>
    );
};

export default Register;
