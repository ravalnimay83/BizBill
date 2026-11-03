import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContextDefinition.js";
import {deleteCategory} from "../../Service/CategoryService.js";
import {assets} from "../../assets/assets.js";
import './CategoryList.css';
import toast from "react-hot-toast";

const CategoryList = () => {
    const {categories, setCategories} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");

    const safeCategories = Array.isArray(categories) ? categories : [];
    const filterCategories = safeCategories.filter((category) =>
        (category?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteByCategoryId = async (categoryId) => {
        try {
            const response = await deleteCategory(categoryId);
            if (response.status === 204) {
                const updatedCategories = safeCategories.filter((category) => category.categoryId !== categoryId);
                setCategories(updatedCategories);
                toast.success('Category deleted successfully.');
            } else {
                toast.error('Category not found / Unable to delete the category.');
            }
        } catch (error) {
            console.error("Unable to delete category", error);
            toast.error('Unable to delete category.');
        }
    };

    return (
        <div className="category-list-container">
            <div className="category-list-heading">
                <h4>Categories</h4>
                <span>{safeCategories.length} total</span>
            </div>
            <div className="row pe-2">
                <div className="input-group mb-3">
                    <input type="text"
                           name="keyword"
                           id="keyword"
                           placeholder="Search by category"
                           className="form-control"
                           onChange={e => setSearchTerm(e.target.value)}
                           value={searchTerm}/>
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>

            <div className="category-cards">
                {filterCategories.length === 0 ? (
                    <p className="text-secondary p-3">No categories found.</p>
                ) : (
                    filterCategories.map((category, index) => (
                        <div key={category.categoryId || index} className="category-card"
                             style={{backgroundColor: category.bgColor || '#563d7c'}}>
                            <div className="category-image-frame">
                                <img
                                    src={category.imageUrl || assets.upload}
                                    alt={category.name || 'Category'}
                                    className="category-img"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = assets.upload;
                                    }}
                                />
                            </div>
                            <div className="category-card-content">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1 text-white">{category.name}</h5>
                                        <p className="mb-0 text-white">{category.items ?? 0} Items</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="category-delete-btn"
                                        title="Delete Category"
                                        aria-label={`Delete ${category.name}`}
                                        onClick={() => deleteByCategoryId(category.categoryId)}
                                    >
                                        <i className="bi bi-trash3-fill" aria-hidden="true"></i>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
