import { inject, observer } from "mobx-react";
import React from "react";
import Layout from "../../Components/Layout/front.layout";

const Index = (props) => {
    return (
        <Layout>
            <div>Burası ürünler create</div>
        </Layout>
    );
};

export default inject("AuthStore")(observer(Index));
