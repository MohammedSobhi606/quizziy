import { useEffect, useState } from "react";

function useLocalStorage(key, defultvalue) {
    const [value, setvalue] = useState(() => {
        let currentValue;
        try {
            currentValue = JSON.parse(
                localStorage.getItem(key) || String(defultvalue)
            );
        } catch (error) {
            console.error("Error parsing localStorage value:", error);
            currentValue = defultvalue;
        }

        return currentValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setvalue];
}

export default useLocalStorage;
