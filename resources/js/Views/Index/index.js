import { inject, observer } from "mobx-react";
import React from "react";

const Index = (props) => {
    props.AuthStore.getToken();
    const logout = () => {
        props.AuthStore.removeToken();
        props.history.push("/login");
    };
    console.log(props.AuthStore.appState.user.id);
    return (
        <div>
            Burası index <button onClick={logout}> Çıkış</button>{" "}
        </div>
    );
};

export default inject("AuthStore")(observer(Index));
