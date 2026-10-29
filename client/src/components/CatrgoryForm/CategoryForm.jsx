const CategoryForm = () => {
    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card.col-md-8.from-container">
                    <div className="card-body">
                        <form>
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
                                       placeholder="Enter Category name"/>
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
                            <div className="mb-3">
                                <label htmlFor="bgcolor" className="form-label">Background color</label>
                                <br/>
                                <input type="color" name="bgColor"
                                       id="bgcolor"
                                       placeholder="#ffffaa"/>
                            </div>
                            <button type="submit" className="btn btn-warning w-100">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CategoryForm;