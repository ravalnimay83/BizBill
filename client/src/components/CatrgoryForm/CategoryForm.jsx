import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextDefinition.js";
import { addCategory } from "../../Service/CategoryService.js";
import { assets } from "../../assets/assets.js";
import "./CategoryForm.css";

const initialData = { name: "", description: "", bgColor: "#563d7c" };

const CategoryForm = () => {
    const { setCategories } = useContext(AppContext);
    const [data, setData] = useState(initialData);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((current) => ({ ...current, [name]: value }));
    };

    const onImageChangeHandler = (event) => {
        setImage(event.target.files?.[0] || null);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setError("");

        if (!image) {
            setError("Please choose a category image.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        formData.append("file", image);

        try {
            const response = await addCategory(formData);
            setCategories((current) => [...current, response.data]);
            setData(initialData);
            setImage(null);
            event.target.reset();
        } catch (submitError) {
            setError("Unable to save the category. Please try again.");
            console.error("Unable to save category", submitError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-2 mt-2">
            <div className="card-body">
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3">
                        <label htmlFor="category-image" className="form-label">Image</label>
                        <label htmlFor="category-image" className="category-image-upload">
                            <img src={image ? URL.createObjectURL(image) : assets.upload}
                                 alt="Category preview" className="category-image-preview" />
                            <span>{image ? image.name : "Choose an image"}</span>
                        </label>
                        <input id="category-image" type="file" accept="image/*"
                               className="form-control d-none" onChange={onImageChangeHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category-name" className="form-label">Category Name</label>
                        <input id="category-name" name="name" className="form-control"
                               value={data.name} onChange={onChangeHandler} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category-description" className="form-label">Description</label>
                        <textarea id="category-description" name="description" className="form-control"
                                  value={data.description} onChange={onChangeHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category-color" className="form-label">Background Color</label>
                        <input id="category-color" name="bgColor" type="color"
                               className="form-control form-control-color" value={data.bgColor}
                               onChange={onChangeHandler} />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;
