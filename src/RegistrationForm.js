import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

const schema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Full Name should not contain numbers or special characters"
    ),
  email: yup.string().required("Email is Required").email("Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+-])[A-Za-z\d@$!%*?&#+-]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits"),
  dateOfBirth: yup
    .date()
    .required("Date of Birth is Required")
    .test("age", "Must be at least 18 years old", function (value) {
      const currentDate = new Date(); //current date
      const enteredDate = new Date(value); //convered entered date to same format
      const age = currentDate.getFullYear() - enteredDate.getFullYear(); //year of date subtract
      return age >= 18; //if >=18 pass the valiation age test else error message is shown
    }),
  gender: yup.string().required("Gender is required"),
  address: yup
    .string()
    .required("Address is Required")
    .min(10, "Must be at least 10 characters"),
  country: yup.string().required("Country is Required"),
  postalCode: yup
    .string()
    .required("Postal Code is required")
    .matches(/^[0-9]{5,6}$/, "Postal Code must be 5 or 6 digits"),
  occupation: yup
    .string()
    .required("Occupation is Required")
    .max(50, "Occupation must not exceed 50 characters"),
  terms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
});

const RegistrationForm = () => {
  const [registration, setRegistartion] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setRegistartion(!registration);
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {registration && (
        <div className="bg-green-500 text-white p-4 rounded mb-4">
          Registration successful!
        </div>
      )}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="text"
            {...register("fullName")}
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email Address</label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="email"
            {...register("email")}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="password"
            {...register("password")}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Confirm Password</label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="password"
            {...register("confirmPassword")}
          />
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            className="border border-gray-300 p-2 w-full rounded "
            type="text"
            {...register("phoneNumber")}
          />
          <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Date of Birth</label>
          <input
            className="border border-gray-300 p-2 w-full rounded "
            type="date"
            {...register("dateOfBirth")}
          />
          <p className="text-red-500 text-sm">{errors.dateOfBirth?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" value="Male" {...register("gender")} /> Male
            </label>
            <label className="flex items-center">
              <input type="radio" value="Female" {...register("gender")} />{" "}
              Female
            </label>
            <label className="flex items-center">
              <input type="radio" value="Other" {...register("gender")} /> Other
            </label>
          </div>
          <p className="text-red-500 text-sm">{errors.gender?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Address</label>
          <textarea
            className="border border-gray-300 p-2 w-full rounded"
            {...register("address")}
          />
          <p className="text-red-500 text-sm">{errors.address?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Country</label>
          <select
            className="border border-gray-300 p-2 w-full rounded focus:outline-none "
            {...register("country")}>
            <option value="">Select Country</option>
            <option value="Nepal">Nepal</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="India">India</option>
          </select>
          <p className="text-red-500 text-sm">{errors.country?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Postal Code</label>
          <input
            className="border border-gray-300 p-2 w-full rounded"
            type="text"
            {...register("postalCode")}
          />
          <p className="text-red-500 text-sm">{errors.postalCode?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Occupation</label>
          <input
            className="border border-gray-300 p-2 w-full rounded "
            type="text"
            {...register("occupation")}
          />
          <p className="text-red-500 text-sm">{errors.occupation?.message}</p>
        </div>

        <div className="flex items-center">
          <input type="checkbox" {...register("terms")} />
          <label className="ml-2">I agree to the terms and conditions</label>
        </div>
        <p className="text-red-500 text-sm">{errors.terms?.message}</p>

        <div>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full p-2 text-white rounded ${
              !isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
