import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import Layout from "../../Components/Layout/front.layout";

const Index = (props) => {
    useEffect(() => {
        axios
            .get(
                "/api/product",

                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            props.AuthStore.appState.user.access_token,
                    },
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((e) => console.log(e));
    }, []);
    return (
        <Layout>
            <button onClick={() => props.history.push("/urunler/ekle")}>
                Yeni ürün ekle
            </button>
            <div>Burası ürünler</div>
        </Layout>
    );
};

export default inject("AuthStore")(observer(Index));
