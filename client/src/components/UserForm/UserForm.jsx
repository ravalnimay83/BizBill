import {useState} from "react";
import {addUser} from "../../Service/UserService.js";
import toast from "react-hot-toast";

const UserForm = ({setUsers}) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER"
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await addUser(data);
            setUsers((prevUsers) => [...prevUsers, response.data]);
            toast.success("User added successfully");
            setData({
                name: "",
                email: "",
                password: "",
                role: "ROLE_USER"
            });
        } catch(error) {
            console.error("Error adding user:", error);
            const message = error.response?.data?.message || error.message || "Failed to add user";
            toast.error("Error adding user: " + message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-form-container">
            <h4 className="mb-3 text-white fw-bold">Add User</h4>
            <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label text-white">
                        User Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="John Doe"
                        onChange={onChangeHandler}
                        value={data.name}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">
                        User Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="yourname@example.com"
                        onChange={onChangeHandler}
                        value={data.email}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="••••••••"
                        onChange={onChangeHandler}
                        value={data.password}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="form-label text-white">
                        Role
                    </label>
                    <select
                        id="role"
                        name="role"
                        className="form-select"
                        value={data.role}
                        onChange={onChangeHandler}
                    >
                        <option value="ROLE_USER">User (ROLE_USER)</option>
                        <option value="ROLE_ADMIN">Admin (ROLE_ADMIN)</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-warning w-100 fw-bold" disabled={loading}>
                    {loading ? "Saving..." : "Save User"}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
