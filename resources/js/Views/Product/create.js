import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/front.layout";
import { Formik } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import CustomInput from "../../Components/Form/Custominput";
import Select from "react-select";
import ImageUploader from "react-images-upload";
import CKEditor from "ckeditor4-react";
import swal from "sweetalert";

const Create = (props) => {
    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        const data = new FormData();

        pictures.forEach((image_file) => {
            data.append("file[]", image_file);
        });

        data.append("categoryId", values.categoryId);
        data.append("name", values.name);
        data.append("modelCode", values.modelCode);
        data.append("barcode", values.barcode);
        data.append("brand", values.brand);
        data.append("tax", values.tax);
        data.append("stock", values.stock);
        data.append("sellingPrice", values.sellingPrice);
        data.append("buyingPrice", values.buyingPrice);
        data.append("text", values.text);
        data.append("property", JSON.stringify(property));

        const config = {
            headers: {
                Accept: "application/json",
                "content-type": "multipart/form-data",
                Authorization:
                    "Bearer " + props.AuthStore.appState.user.access_token,
            },
        };
        axios
            .post("/api/product", data, config)
            .then((res) => {
                console.log(res);

                if (res.data.success) {
                    swal("ÜRün Eklendi");
                    resetForm({});
                    setPictures([]);
                    setProperty([]);
                    setSubmitting(false);
                } else {
                    swal(res.data.message);
                    setSubmitting(true);
                }
            })
            .catch((e) => {
                setSubmitting(true);
                console.log(e);
            });
    };
    const [categories, setCategories] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [property, setProperty] = useState([]);
    const newProperty = () => {
        setProperty([...property, { property: "", value: "" }]);
    };

    const removeProperty = (index) => {
        const OldProperty = property;
        OldProperty.splice(index, 1); //indexden sonra 1 tane sil
        setProperty([...OldProperty]);
    };
    const changeTextInput = (event, index) => {
        console.log(property);
        console.log(event.target.value, index);
        property[index][event.target.name] = event.target.value; //property içersindeki property ve value e.target.name
        setProperty([...property]);
    };

    const onDrop = (picture) => {
        console.log(picture);
        setPictures([...pictures, picture]);
    };
    useEffect(() => {
        axios
            .get(
                "/api/product/create",

                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            props.AuthStore.appState.user.access_token,
                    },
                }
            )
            .then((res) => {
                setCategories(res.data.categories);
                console.log(res);
            })
            .catch((e) => console.log(e));
    }, [pictures]);

    return (
        <Layout>
            <Container className="mt-5">
                <Formik
                    initialValues={{
                        categoryId: "",
                        name: "",
                        modelCode: "",
                        barcode: "",
                        brand: "",
                        stock: 0,
                        tax: 0,
                        buyingPrice: "",
                        sellingPrice: "",
                        text: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object().shape({
                        categoryId: Yup.number().required(
                            "Kategori Seçimi Zorunludur"
                        ),
                        name: Yup.string().required("Ürün Adı Zorunludur"),
                        modelCode: Yup.string().required(
                            "Ürün Model Kodu Zorunludur"
                        ),
                        barcode: Yup.string().required(
                            "Ürün Barkodu Zorunludur"
                        ),
                        brand: Yup.string().required("Ürün Markası Zorunludur"),
                        buyingPrice: Yup.number().required(
                            "Ürün Alış Fiyatı Zorunludur"
                        ),
                        sellingPrice: Yup.number().required(
                            "Ürün Satış Fiyatı Zorunludur"
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
                        setFieldValue,
                        touched,
                    }) => (
                        <div>
                            <div className="row">
                                <div className="col-md-12">
                                    <ImageUploader
                                        withIcon={true}
                                        onChange={onDrop}
                                        imgExtension={[
                                            ".jpeg",
                                            ".gif",
                                            ".png",
                                            ".gif",
                                            ".jpg",
                                        ]}
                                        withPreview={true}
                                        maxFileSize={5242880}
                                        buttonText="Resim Seçiniz"
                                        label="Max dosya boyutu: 5mb, kabul edilen dosya türleri: jpg, gif, png"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Select
                                            onChange={(e) =>
                                                setFieldValue(
                                                    "categoryId",
                                                    e.id
                                                )
                                            }
                                            onBlur={handleBlur("categoryId")}
                                            placeholder={
                                                "Ürün Kategorisi seçiniz *"
                                            }
                                            getOptionLabel={(option) =>
                                                option.name
                                            }
                                            getOptionValue={(option) =>
                                                option.id
                                            }
                                            options={categories}
                                        />
                                    </div>
                                    {errors.categoryId &&
                                        touched.categoryId && (
                                            <p className="alert alert-danger mt-2 mb-2 p-2">
                                                {errors.categoryId}
                                            </p>
                                        )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <CustomInput
                                        title="Ürün Adı *"
                                        value={values.name}
                                        handleBlur={handleBlur("name")}
                                        handleChange={handleChange("name")}
                                    />
                                    {errors.name && touched.name && (
                                        <p className="alert alert-danger mt-2 mb-2 p-2">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <CustomInput
                                        title="Ürün Model Kodu *"
                                        value={values.modelCode}
                                        handleChange={handleChange("modelCode")}
                                        handleBlur={handleBlur("modelCode")}
                                    />
                                    {errors.modelCode && touched.modelCode && (
                                        <p className="alert alert-danger mt-2 mb-2 p-2">
                                            {errors.modelCode}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <CustomInput
                                        title="Barkod *"
                                        value={values.barcode}
                                        handleChange={handleChange("barcode")}
                                        handleBlur={handleBlur("barcode")}
                                    />
                                    {errors.barcode && touched.barcode && (
                                        <p className="alert alert-danger mt-2 mb-2 p-2">
                                            {errors.barcode}
                                        </p>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <CustomInput
                                        title="Marka *"
                                        value={values.brand}
                                        handleChange={handleChange("brand")}
                                        handleBlur={handleBlur("brand")}
                                    />
                                    {errors.brand && touched.brand && (
                                        <p className="alert alert-danger mt-2 mb-2 p-2">
                                            {errors.brand}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <CustomInput
                                        title="Stok"
                                        type="number"
                                        value={values.stock}
                                        handleChange={handleChange("stock")}
                                        handleBlur={handleBlur("stock")}
                                    />
                                    {errors.stock && touched.stock && (
                                        <p className="form-error">
                                            {errors.stock}
                                        </p>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <CustomInput
                                        title="KDV"
                                        value={values.tax}
                                        handleChange={handleChange("tax")}
                                        handleBlur={handleBlur("tax")}
                                    />
                                    {errors.tax && touched.tax && (
                                        <p>{errors.tax}</p>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <CustomInput
                                        title="Alış Fiyatı *"
                                        type="number"
                                        value={values.buyingPrice}
                                        handleChange={handleChange(
                                            "buyingPrice"
                                        )}
                                        handleBlur={handleBlur("buyingPrice")}
                                    />
                                    {errors.buyingPrice &&
                                        touched.buyingPrice && (
                                            <p className="alert alert-danger mt-2 mb-2 p-2">
                                                {errors.buyingPrice}
                                            </p>
                                        )}
                                </div>
                                <div className="col-md-6">
                                    <CustomInput
                                        title="Satış Fiyatı *"
                                        type="number"
                                        value={values.sellingPrice}
                                        handleChange={handleChange(
                                            "sellingPrice"
                                        )}
                                        handleBlur={handleBlur("sellingPrice")}
                                    />
                                    {errors.sellingPrice &&
                                        touched.sellingPrice && (
                                            <p className="alert alert-danger mt-2 mb-2 p-2">
                                                {errors.sellingPrice}
                                            </p>
                                        )}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <CKEditor
                                        data={values.text}
                                        onChange={(event) => {
                                            const data = event.editor.getData();
                                            setFieldValue("text", data);
                                        }}
                                    />
                                    {errors.text && touched.text && (
                                        <p className="form-error">
                                            {errors.text}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-3 mt-3">
                                <div className="col-md-12">
                                    <button
                                        type="button"
                                        onClick={newProperty}
                                        className="btn btn-primary"
                                    >
                                        Yeni Özellik
                                    </button>
                                </div>
                            </div>
                            {property.map((item, index) => (
                                <div key={index} className="row mb-1">
                                    <div className="col-5">
                                        <label>Özellik adı:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="property"
                                            onChange={(event) =>
                                                changeTextInput(event, index)
                                            }
                                            value={item.property}
                                        />
                                    </div>
                                    <div className="col-5">
                                        <label>Özellik Değeri:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="value"
                                            onChange={(event) =>
                                                changeTextInput(event, index)
                                            }
                                            value={item.value}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "flex-end",
                                        }}
                                        className="col-1"
                                    >
                                        <button
                                            onClick={() =>
                                                removeProperty(index)
                                            }
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                disabled={!isValid || isSubmitting}
                                onClick={handleSubmit}
                                className="mt-3 btn btn-lg btn-primary btn-block"
                                type="button"
                            >
                                Ürünü Ekle
                            </button>
                        </div>
                    )}
                </Formik>
            </Container>
        </Layout>
    );
};

export default inject("AuthStore")(observer(Create));
