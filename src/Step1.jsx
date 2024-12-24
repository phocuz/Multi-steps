import { useContext } from "react";
import { FormContext } from "./App";

function Step1() {
  const { formData, handleChange } = useContext(FormContext);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Personal info</h2>
      <p className="text-gray-500 mb-6">
        Please provide your name, email address, and phone number.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Stephen King"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. stephenking@lorem.com"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 234 567 890"
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>
      
    </div>
  );
}

export default Step1;