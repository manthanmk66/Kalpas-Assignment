import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaGlobe, FaPhone } from "react-icons/fa";

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: "input" | "textarea" | "select";
  errorText?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Field: React.FC<FieldProps> = ({
  id,
  label,
  placeholder,
  type,
  errorText,
  icon,
  value,
  onChange,
}) => {
  switch (type) {
    case "input":
      return (
        <div className="flex flex-col min-w-[200px]">
          <label htmlFor={id} className="text-sm leading-6 text-neutral-800">
            {label}
          </label>
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            className="p-2 mt-1 text-sm bg-white rounded-lg text-zinc-400"
            aria-label={label}
            value={value}
            onChange={onChange}
          />
          {errorText && (
            <div className="mt-1 text-sm text-red-500">{errorText}</div>
          )}
        </div>
      );

    case "textarea":
      return (
        <div className="flex flex-col min-w-[200px] mt-2">
          <label htmlFor={id} className="text-sm leading-6 text-neutral-800">
            {label}
          </label>
          <textarea
            id={id}
            placeholder={placeholder}
            className="p-2 mt-1 text-sm bg-white rounded-lg text-zinc-400"
            aria-label={label}
            value={value}
            onChange={onChange}
          />
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col min-w-[200px] mt-2">
          <label htmlFor={id} className="text-sm leading-6 text-neutral-800">
            {label}
          </label>
          <div className="flex items-center p-2 mt-1 bg-white rounded-lg text-zinc-400">
            <input
              id={id}
              type="text"
              placeholder={placeholder}
              className="flex-grow"
              aria-label={label}
              value={value}
              onChange={onChange}
            />
            {icon && <span className="w-5 ml-2">{icon}</span>}
          </div>
        </div>
      );

    default:
      return null;
  }
};

const MyComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    country: "",
    state: "",
    email: "",
    mobile: "",
    feedback: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <section className="flex flex-col items-center max-w-lg p-4 mx-auto">
      <div className="flex flex-col w-full">
        <header className="text-lg font-bold leading-8 text-neutral-800">
          <h1 className="text-xl">Thank you for your time!</h1>
          <p className="text-sm leading-6 text-neutral-800">
            Please provide the details below.
          </p>
        </header>
        <form
          className="flex flex-col items-start mt-4"
          onSubmit={handleSubmit}
        >
          <Field
            id="fullName"
            label="Full Name"
            placeholder="Enter Your Full Name"
            type="input"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Field
            id="address"
            label="Address"
            placeholder="Enter your full Postal Address"
            type="textarea"
            value={formData.address}
            onChange={handleChange}
          />
          <div className="flex flex-wrap gap-4 mt-2">
            <Field
              id="country"
              label="Country"
              placeholder="Enter Your Country Name"
              type="select"
              icon={<FaGlobe />}
              value={formData.country}
              onChange={handleChange}
            />
            <Field
              id="state"
              label="State"
              placeholder="Enter Your State Name"
              type="select"
              icon={<FaGlobe />}
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <Field
              id="email"
              label="Email Id"
              placeholder="Enter Your Mail id"
              type="input"
              errorText="Please enter a valid e-mail"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="flex flex-col min-w-[200px]">
              <label
                htmlFor="mobile"
                className="text-sm leading-6 text-neutral-800"
              >
                Mobile Number
              </label>
              <div className="flex items-center p-2 mt-1 bg-white rounded-lg text-zinc-400">
                <span className="mr-2">
                  <FaPhone />
                </span>
                <input
                  id="mobile"
                  type="text"
                  placeholder="Enter Your Mobile Number"
                  className="p-2 bg-white rounded-lg"
                  aria-label="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <Field
            id="feedback"
            label="Feedback"
            placeholder="Write Your Feedback"
            type="textarea"
            value={formData.feedback}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="px-6 py-2 mt-6 text-lg font-bold text-center text-white rounded-lg bg-emerald-300"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
};

export default MyComponent;
