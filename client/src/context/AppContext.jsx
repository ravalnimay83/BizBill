import {AppContext} from "./AppContextDefinition";
import {useEffect} from "react";
import {useState} from "react";
import {fetchCategory} from "../Service/CategoryService.js";

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);


    useEffect(() => {
        async function loadData() {
            const response = await fetchCategory();
            setCategories(response.data);
        }

        loadData();
    }, [])

    const contextValue = {
        categories,
        setCategories
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}
