export const validateJson = (
    jsonInput: string,
    setError?: React.Dispatch<React.SetStateAction<string | null>>
) => {
    try {
        const parsedData = JSON.parse(jsonInput); // Attempt to parse the JSON
        if (setError) { setError(null) }
        return { isValid: true, data: parsedData };; // Return parsed JSON data
    } catch (error: any) {
        if (setError) {
            setError(error.message)
        }
        return { isValid: false, error: error.message }; // Return error message if JSON is invalid
    }
};

