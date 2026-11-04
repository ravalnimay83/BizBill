import { useState } from "react";
import { deleteUser } from "../../Service/UserService.js";
import toast from "react-hot-toast";

const UsersList = ({ users, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const safeUsers = Array.isArray(users) ? users : [];
    const filteredUsers = safeUsers.filter((user) => {
        const query = searchTerm.toLowerCase();
        const nameMatch = (user?.name || "").toLowerCase().includes(query);
        const emailMatch = (user?.email || "").toLowerCase().includes(query);
        return nameMatch || emailMatch;
    });

    const deleteByUserId = async (id) => {
        try {
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
            toast.success("User deleted successfully.");
        } catch (error) {
            console.error("Error while deleting user:", error);
            const message = error.response?.data?.message || error.message || "Error while deleting user.";
            toast.error(message);
        }
    };

    return (
        <div className="users-list-container d-flex flex-column h-100">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-secondary">
                <h4 className="m-0 text-white fw-bold">Users</h4>
                <span className="badge bg-primary px-3 py-2 rounded-pill">
                    {safeUsers.length} total
                </span>
            </div>

            <div className="input-group mb-3">
                <input
                    type="text"
                    name="keyword"
                    id="keyword"
                    placeholder="Search by name or email"
                    className="form-control"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <span className="input-group-text bg-warning text-dark">
                    <i className="bi bi-search"></i>
                </span>
            </div>

            <div className="users-cards-wrapper flex-grow-1 overflow-auto pe-1">
                {filteredUsers.length === 0 ? (
                    <p className="text-secondary p-3 text-center">No users found.</p>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {filteredUsers.map((user, index) => (
                            <div
                                key={user.userId || index}
                                className="card p-3 border-secondary"
                                style={{
                                    background: "rgba(255, 255, 255, 0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255, 255, 255, 0.12)"
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-3">
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                backgroundColor: "#6366f1",
                                                fontSize: "1.1rem"
                                            }}
                                        >
                                            {(user?.name || "U").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="d-flex align-items-center gap-2">
                                                <h6 className="mb-0 text-white fw-semibold">{user.name}</h6>
                                                <span
                                                    className={`badge ${
                                                        user.role === "ROLE_ADMIN" ? "bg-danger" : "bg-secondary"
                                                    }`}
                                                    style={{ fontSize: "0.7rem" }}
                                                >
                                                    {user.role || "ROLE_USER"}
                                                </span>
                                            </div>
                                            <small className="text-white-50">{user.email}</small>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
                                        style={{ width: "36px", height: "36px", borderRadius: "8px" }}
                                        title="Delete User"
                                        onClick={() => deleteByUserId(user.userId)}
                                    >
                                        <i className="bi bi-trash3-fill"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;
