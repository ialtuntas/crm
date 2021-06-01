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
                    <h1 className="h3 mb-3 fw-normal">Giriş Yap</h1>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email adresi</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Şifre</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Beni
                            hatırla
                        </label>
                    </div>
                    <button
                        className="w-100 btn btn-lg btn-primary"
                        type="submit"
                    >
                        Giriş Yap
                    </button>
                    <Link to="/register">
                        <button className="mt-1 w-100 btn btn-lg btn-outline-danger">
                            Kayıt Ol
                        </button>
                    </Link>
                    <p className="mt-5 mb-3 text-muted">&copy; BStock 2021</p>
                </form>
            </main>
        </div>
    );
};

export default Index;
