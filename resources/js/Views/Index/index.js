import { inject, observer } from "mobx-react";
import React from "react";
import Layout from "../../Components/Layout/front.layout";

const Index = (props) => {
    props.AuthStore.getToken();

    //console.log(props.AuthStore.appState.user.id);
    return (
        <Layout>
            <div>Burası index</div>
        </Layout>
    );
};

export default inject("AuthStore")(observer(Index));
