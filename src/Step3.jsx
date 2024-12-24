import { useContext } from "react";
import { FormContext } from "./App";

const addOns = [
  {
    id: 1,
    name: "Online service",
    description: "Access to multiplayer games",
    price: 1
  },
  {
    id: 2,
    name: "Larger storage",
    description: "Extra 10TB of cloud save",
    price: 2
  },
  {
    id: 3,
    name: "Customizable profile",
    description: "Personalize your profile",
    price: 2
  }
];

function Step3() {
  const { formData, updateFormData } = useContext(FormContext);

  const handleAddOnSelect = (addOn) => {
    if (formData.selectedAddOns?.includes(addOn.id)) {
      updateFormData({
        selectedAddOns: formData.selectedAddOns.filter(id => id !== addOn.id)
      });
    } else {
      updateFormData({
        selectedAddOns: [...(formData.selectedAddOns || []), addOn.id]
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pick add-ons</h2>
      <p className="text-gray-500 mb-6">
        Add-ons help enhance your gaming experience.
      </p>
      <div className="space-y-4">
        {addOns.map((addOn) => (
          <div
            key={addOn.id}
            className={`w-full p-4 flex items-center justify-between border rounded-lg ${
              formData.selectedAddOns?.includes(addOn.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => handleAddOnSelect(addOn)}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={formData.selectedAddOns?.includes(addOn.id)}
                readOnly
                className="w-5 h-5"
              />
              <div>
                <h3 className="font-bold">{addOn.name}</h3>
                <p className="text-gray-500">{addOn.description}</p>
              </div>
            </div>
            <div className="text-blue-500 font-medium">${addOn.price}/mo</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step3;