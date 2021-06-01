import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
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
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name"
                        />
                        <label htmlFor="floatingInput">İsim</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="middle"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email adresi</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="middle"
                            className="form-control"
                            id="floatingInput"
                            placeholder="******"
                        />
                        <label htmlFor="floatingInput">Şifre</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="*******"
                        />
                        <label htmlFor="floatingPassword">Şifre Tekrarı</label>
                    </div>
                    <button
                        className="w-100 btn btn-lg btn-primary"
                        type="submit"
                    >
                        Kayıt Ol
                    </button>
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

export default Index;
