import React from "react";
import { Route, Switch } from "react-router-dom";

import FrontIndex from "./Views/Index";
import FrontLogin from "./Views/Login";
import FrontRegister from "./Views/Register";
const Main = () => (
    <Switch>
        <Route exact path="/" component={FrontIndex} />
        <Route path="/Login" component={FrontLogin} />
        <Route path="/Register" component={FrontRegister} />
    </Switch>
);
export default Main;