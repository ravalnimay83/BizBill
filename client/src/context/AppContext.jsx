import {AppContext} from "./AppContextDefinition";
import {useEffect, useState} from "react";
import {fetchCategory} from "../Service/CategoryService.js";

export const AppContextProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [auth, setAuth] = useState({
        token:null,
        role:null
    });

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetchCategory();
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.warn("Categories response is not an array:", response.data);
                }
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        }

        loadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({token, role});
    }

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};
