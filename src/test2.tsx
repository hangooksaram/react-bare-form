import { useEffect } from "react";
import useErrorElement from "./hooks/useForm/useErrorElement";

const Test2 = () => {
  const { errorElement, setErrorElement } = useErrorElement();

  useEffect(() => {
    setErrorElement(
      document.querySelector('input[name="test"]')! as HTMLInputElement
    );
  }, []);

  useEffect(() => {
    console.log(errorElement?.focus());
  }, [errorElement]);
  return (
    <div>
      <h1>Test Component 2</h1>
      <p>This is a test component to demonstrate changes.</p>

      <input name="test" />
    </div>
  );
};
export default Test2;
