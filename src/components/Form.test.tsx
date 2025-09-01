import useForm from "@/hooks/form/useForm";
import { ValidateSchema } from "@/types/validate/schema";
import { useEffect, useRef } from "react";

const Test = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const initalFormValues = {
    email: "",
    name: "",
    password: "",
    age: 0,
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: 0,
    country: "",
    notes: "",
  };
  const validationSchema: ValidateSchema<typeof initalFormValues> = {
    email: {
      required: {
        message: "email is required",
      },
    },
    name: {
      required: {
        message: "name is required",
      },
      minLength: {
        message: "name must be at least 3 characters",
        value: 3,
      },
    },
    password: {
      required: {
        message: "password is required",
      },
      minLength: {
        message: "password must be at least 6 characters",
        value: 6,
      },
    },
    age: {
      required: {
        message: "age is required",
      },
      min: {
        message: "age must be at least 18",
        value: 18,
      },
      max: {
        message: "age must be at most 99",
        value: 99,
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

  const form = useForm({
    initialValues: initalFormValues,
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <form
      onSubmit={form.handleSubmit}
      style={{
        height: "300vh",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h1>Form Test</h1>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        name="email"
        onChange={form.handleChange}
        value={form.values.email}
        type="text"
        placeholder="Enter email"
        {...form.registerRef("email")}
      />
      {form.errors?.email}
      <label htmlFor="name">이름</label>
      <input
        id="name"
        name="name"
        onChange={form.handleChange}
        value={form.values.name}
        type="text"
        placeholder="Enter name"
        {...form.registerRef("name")}
      />
      {form.errors?.name}
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        name="password"
        onChange={form.handleChange}
        value={form.values.password}
        type="password"
        placeholder="Enter password"
        {...form.registerRef("password")}
      />
      {form.errors?.password}
      <label htmlFor="phone">전화번호</label>
      <input
        id="phone"
        name="phone"
        onChange={form.handleChange}
        value={form.values.phone}
        type="text"
        placeholder="Enter phone"
        {...form.registerRef("phone")}
      />
      {form.errors?.phone}
      <label htmlFor="age">나이</label>
      <input
        id="age"
        name="age"
        onChange={form.handleChange}
        value={form.values.age}
        type="number"
        placeholder="Enter age"
        {...form.registerRef("age")}
      />
      {form.errors?.age}
      <label htmlFor="address">주소</label>
      <input
        id="address"
        name="address"
        onChange={form.handleChange}
        value={form.values.address}
        type="text"
        placeholder="Enter address"
        {...form.registerRef("address")}
      />
      {form.errors?.address}
      <label htmlFor="city">도시</label>
      <input
        id="city"
        name="city"
        onChange={form.handleChange}
        value={form.values.city}
        type="text"
        placeholder="Enter city"
        {...form.registerRef("city")}
      />
      {form.errors?.city}
      <label htmlFor="state">주</label>
      <input
        id="state"
        name="state"
        onChange={form.handleChange}
        value={form.values.state}
        type="text"
        placeholder="Enter state"
        {...form.registerRef("state")}
      />
      {form.errors?.state}
      <label htmlFor="zip">우편번호</label>
      <input
        id="zip"
        name="zip"
        onChange={form.handleChange}
        value={form.values.zip}
        type="text"
        placeholder="Enter zip"
        {...form.registerRef("zip")}
      />
      {form.errors?.zip}
      <label htmlFor="country">나라</label>
      <input
        id="country"
        name="country"
        onChange={form.handleChange}
        value={form.values.country}
        type="text"
        placeholder="Enter country"
        {...form.registerRef("country")}
      />
      {form.errors?.country}
      <label htmlFor="notes">메모</label>
      <textarea
        id="notes"
        name="notes"
        onChange={form.handleChange}
        value={form.values.notes}
        placeholder="Enter notes"
        {...form.registerRef("notes")}
      ></textarea>
      {form.errors?.notes}
      <button type="submit">제출</button>
    </form>
  );
};
export default Test;
