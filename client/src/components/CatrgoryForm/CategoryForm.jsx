import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContextDefinition.js";
import { addCategory } from "../../Service/CategoryService.js";
import './CategoryForm.css';
const CategoryForm = () => {
    const { setCategories } = useContext(AppContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [bgColor, setBgColor] = useState("#563d7c");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!file) {
            setError("Please choose a category image.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("category", JSON.stringify({ name, description, bgColor }));
            formData.append("file", file);

            const response = await addCategory(formData);
            setCategories((current) => [...current, response.data]);
            setName("");
            setDescription("");
            setBgColor("#563d7c");
            setFile(null);
            event.target.reset();
        } catch (submitError) {
            setError("Unable to save the category. Please try again.");
            console.error(submitError);
        }
    };

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({});

    return (
        <div className="mx-2 mt-2">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="category-image" className="form-label">Image</label>
                        <input id="category-image" type="file" accept="image/*" className="form-control"
                               onChange={(event) => setFile(event.target.files[0] || null)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category-name" className="form-label">Category Name</label>
                        <input id="category-name" className="form-control" value={name}
                               onChange={(event) => setName(event.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category-description" className="form-label">Description</label>
                        <textarea id="category-description" className="form-control" value={description}
                                  onChange={(event) => setDescription(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category-color" className="form-label">Background Color</label>
                        <input id="category-color" type="color" className="form-control form-control-color"
                               value={bgColor} onChange={(event) => setBgColor(event.target.value)} />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-warning w-100">Save</button>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;
