export const validateInput = (
    value: string,
    pattern?: string,
    message?: string,
    setError?: React.Dispatch<React.SetStateAction<string | null>>
) => {
    if (pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
            if (setError) { setError(message || "Invalid input"); }
        } else {
            if (setError) { setError(null) }
        }
    }
};