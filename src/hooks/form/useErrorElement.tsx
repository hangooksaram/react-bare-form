import { useState } from "react"

const useErrorElement = () => {
    const [errorElement, setErrorElement] = useState<HTMLInputElement | null>(null);


    return {errorElement, setErrorElement};
}
export default useErrorElement;