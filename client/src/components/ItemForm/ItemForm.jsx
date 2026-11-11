import {useState} from "react";

const ItemForm = () => {

    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        category: "",
        price: "",
        description: ""
    });

    const onChangeHandler = (e) => {

    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }


    return (
        <div className="item-form-container" style={{height: '100vh', overflowY: 'auto', overflowX: 'auto'}}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card.col-md-8.from-container">
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <img src="https://placehold.co/48x48" alt="" width={48}></img>
                                    </label>
                                    <input type="file" id="image" name="image" className="form-control" hidden/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Category Name
                                    </label>
                                    <input type="text"
                                           id="name"
                                           name="name"
                                           className="form-control"
                                           placeholder="Item Name"
                                           onChange={onChangeHandler}
                                           value={data.name}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">
                                        Category
                                    </label>
                                    <select name="category" id="category" className="form-select">
                                        <option value="">Select a category</option>
                                        <option value="Category 1">Category 1</option>
                                        <option value="Category 2">Category 2</option>
                                        <option value="Category 3">Category 3</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">
                                        Price
                                    </label>
                                    <input type="number" id="price" name="price" className="form-control"
                                           placeholder="&#8377;200.00"/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        rows="5"
                                        id="discription"
                                        name="discription"
                                        className="form-control"
                                        placeholder="Write description here.."></textarea>
                                </div>

                                <button type="submit" className="btn btn-warning w-100">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemForm