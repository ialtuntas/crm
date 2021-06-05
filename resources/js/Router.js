import React from "react";
import { Route, Switch } from "react-router-dom";
import PriveteRoute from "./PrivateRoute";
/*sayfalar*/
import FrontIndex from "./Views/Index";
import FrontLogin from "./Views/Login";
import FrontRegister from "./Views/Register";

/*ürünler*/
import ProductIndex from "./Views/Product";
import ProductCreate from "./Views/Product/create";
const Main = () => (
    <Switch>
        <PriveteRoute exact path="/" component={FrontIndex} />
        <PriveteRoute exact path="/urunler" component={ProductIndex} />
        <PriveteRoute exact path="/urunler/ekle" component={ProductCreate} />
        <Route path="/Login" component={FrontLogin} />
        <Route path="/Register" component={FrontRegister} />
    </Switch>
);
export default Main;
