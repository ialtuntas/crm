import axios from "axios";
import { inject, observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const Layout = (props) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    props.AuthStore.getToken();
    const history = useHistory();
    useEffect(() => {
        const token =
            props.AuthStore.appState != null
                ? props.AuthStore.appState.user.access_token
                : null;
        axios
            .post(
                "/api/authenticate",
                {},
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((res) => {
                if (!res.data.isLoggedIn) {
                    history.push("/login");
                }
                setUser(res.data.user);
                setIsLoggedIn(res.data.isLoggedIn);
            })
            .catch((e) => {
                history.push("/login");
            });
    }, []);
    const logout = () => {
        axios
            .post(
                "/api/logout",
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            props.AuthStore.appState.user.access_token,
                    },
                }
            )
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
        props.AuthStore.removeToken();
        history.push("/login");
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">BStock</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Yönetim Paneli</Nav.Link>
                            <Nav.Link href="#pricing">Ürünler</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown
                                title={user.name}
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Profil Düzenle
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Şifre Değiştir
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>
                                    Çıkış Yap
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>{props.children}</div>
        </>
    );
};
export default inject("AuthStore")(observer(Layout));
