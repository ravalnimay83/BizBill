import {AppContext} from "./AppContextDefinition";
import {useEffect, useState} from "react";
import {fetchCategory} from "../Service/CategoryService.js";

export const AppContextProvider = (props) => {
    const [categories, setCategories] = useState([]);

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

    const contextValue = {
        categories,
        setCategories
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};
