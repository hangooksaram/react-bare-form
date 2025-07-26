import { useRef } from "react";
import useForm from "./hooks/useForm/useForm";
import { ValidateSchema } from "./types";

const Test = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const initalFormValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    notes: "",
  };
  const validationSchema: ValidateSchema = {
    name: {
      required: {
        message: "name is required",
      },
    },
    email: {
      required: {
        message: "email is required",
      },
    },
    phone: {
      required: {
        message: "phone is required",
      },
    },
    address: {
      required: {
        message: "address is required",
      },
    },
    city: {
      required: {
        message: "city is required",
      },
    },
    state: {
      required: {
        message: "state is required",
      },
    },
    zip: {
      required: {
        message: "zip is required",
      },
    },
    country: {
      required: {
        message: "country is required",
      },
    },
    notes: {
      required: {
        message: "notes are required",
      },
    },
  };

  const form = useForm(initalFormValues, validationSchema);

  const submitOnEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={{
        height: "300vh",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      onKeyDown={submitOnEnter}
    >
      <input
        ref={form.focusWhenInvalid}
        name="name"
        onChange={form.handleChange}
        value={form.values.name}
        type="text"
        placeholder="Enter name"
      />
      {form.errors?.name}

      <input
        ref={form.focusWhenInvalid}
        name="email"
        onChange={form.handleChange}
        value={form.values.email}
        type="text"
        placeholder="Enter email"
      />
      {form.errors?.email}

      <input
        ref={form.focusWhenInvalid}
        name="phone"
        onChange={form.handleChange}
        value={form.values.phone}
        type="text"
        placeholder="Enter phone"
      />
      {form.errors?.phone}

      <input
        ref={form.focusWhenInvalid}
        name="address"
        onChange={form.handleChange}
        value={form.values.address}
        type="text"
        placeholder="Enter address"
      />
      {form.errors?.address}

      <input
        ref={form.focusWhenInvalid}
        name="city"
        onChange={form.handleChange}
        value={form.values.city}
        type="text"
        placeholder="Enter city"
      />
      {form.errors?.city}

      <input
        name="state"
        onChange={form.handleChange}
        value={form.values.state}
        type="text"
        placeholder="Enter state"
      />
      {form.errors?.state}

      <input
        name="zip"
        onChange={form.handleChange}
        value={form.values.zip}
        type="text"
        placeholder="Enter zip"
      />
      {form.errors?.zip}

      <input
        name="country"
        onChange={form.handleChange}
        value={form.values.country}
        type="text"
        placeholder="Enter country"
      />
      {form.errors?.country}

      <textarea
        name="notes"
        onChange={form.handleChange}
        value={form.values.notes}
        placeholder="Enter notes"
      ></textarea>
      {form.errors?.notes}
      <button ref={buttonRef} type="submit">
        Submit
      </button>
    </form>
  );
};
export default Test;
