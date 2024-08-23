import * as React from "react";

interface BaseFieldProps {
  id: string;
  label: string;
  placeholder: string;
  errorText?: string;
  imgSrc?: string; // Optional for select inputs
}

interface InputProps extends BaseFieldProps {
  type?: string;
}

interface TextareaProps extends BaseFieldProps {}

interface SelectProps extends BaseFieldProps {}

type FieldProps = InputProps | TextareaProps | SelectProps;

const Field: React.FC<
  FieldProps & { type: "input" | "textarea" | "select" }
> = ({
  id,
  label,
  placeholder,
  type = "text",
  errorText,
  imgSrc,
  ...props
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
            type={type}
            placeholder={placeholder}
            className="mt-1 p-2 text-sm bg-white rounded-lg text-zinc-400"
            aria-label={label}
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
            className="mt-1 p-2 text-sm bg-white rounded-lg text-zinc-400"
            aria-label={label}
          />
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col min-w-[300px] mt-2">
          <label htmlFor={id} className="text-sm leading-6 text-neutral-800">
            {label}
          </label>
          <div className="flex items-center mt-1 p-2 bg-white rounded-lg text-zinc-400">
            <input
              id={id}
              type="text"
              placeholder={placeholder}
              className="flex-grow"
              aria-label={label}
            />
            {imgSrc && (
              <img loading="lazy" src={imgSrc} alt="" className="w-5 ml-2" />
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
};

const MyComponent: React.FC = () => (
  <section className="flex flex-col items-center max-w-lg mx-auto p-4">
    <div className="flex flex-col w-full">
      <header className="text-lg font-bold leading-8 text-neutral-800">
        <h1 className="text-xl">Thank you for your time!</h1>
        <p className="text-sm leading-6 text-neutral-800">
          Please provide the details below.
        </p>
      </header>
      <form className="flex flex-col items-start mt-4">
        <Field
          id="fullName"
          label="Full Name"
          placeholder="Enter Your Full Name"
          type="input"
        />
        <Field
          id="address"
          label="Address"
          placeholder="Enter your full Postal Address"
          type="textarea"
        />
        <div className="flex flex-wrap gap-4 mt-2">
          <Field
            id="country"
            label="Country"
            placeholder="Enter Your Country Name"
            type="select"
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/214927e30f7927e1f2d07db1a307d5a814133726699c542de725e133d0b62120?placeholderIfAbsent=true&apiKey=4f5e8168750948a38cec95fbef7182ac"
          />
          <Field
            id="state"
            label="State"
            placeholder="Enter Your State Name"
            type="select"
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/214927e30f7927e1f2d07db1a307d5a814133726699c542de725e133d0b62120?placeholderIfAbsent=true&apiKey=4f5e8168750948a38cec95fbef7182ac"
          />
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          <Field
            id="email"
            label="Email Id"
            placeholder="Enter Your Mail id"
            type="input"
            errorText="Please enter a valid e-mail"
          />
          <div className="flex flex-col min-w-[200px]">
            <label
              htmlFor="mobile"
              className="text-sm leading-6 text-neutral-800"
            >
              Mobile Number
            </label>
            <div className="flex items-center mt-1 p-2 bg-white rounded-lg text-zinc-400">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/13b1a7beb952eb550b12f83495018088975087d1a5898cb8fb960b7fa527619a?placeholderIfAbsent=true&apiKey=4f5e8168750948a38cec95fbef7182ac"
                alt=""
                className="w-5 mr-2"
              />
              <input
                id="mobile"
                type="text"
                placeholder="Enter Your Mobile Number"
                className="p-2 bg-white rounded-lg"
                aria-label="Mobile Number"
              />
            </div>
          </div>
        </div>
        <Field
          id="feedback"
          label="Feedback"
          placeholder="Write Your Feedback"
          type="textarea"
        />
        <button
          type="submit"
          className="mt-6 px-6 py-2 text-lg font-bold text-center text-white bg-emerald-300 rounded-lg"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  </section>
);

export default MyComponent;
