import { useContext } from "react";
import { FormContext } from "./App";

// Define plans here since it wasn't in the original code
const plans = [
  { 
    id: 1, 
    name: "Arcade", 
    icon: "🎮", 
    price: {
      monthly: "$9/mo",
      yearly: "$90/yr"
    } 
  },
  { 
    id: 2, 
    name: "Advanced", 
    icon: "🎳", 
    price: {
      monthly: "$12/mo", 
      yearly: "$120/yr"
    } 
  },
  { 
    id: 3, 
    name: "Pro", 
    icon: "🎲", 
    price: {
      monthly: "$15/mo",
      yearly: "$150/yr"
    } 
  }
];

function Step2() {
  const { formData, updateFormData } = useContext(FormContext);

  const handlePlanSelect = (plan) => {
    updateFormData({ 
      selectedPlan: plan,
      planPrice: plan.price[formData.billing]
    });
  };

  const toggleBilling = () => {
    updateFormData({
      billing: formData.billing === "monthly" ? "yearly" : "monthly"
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select your plan</h2>
      <p className="text-gray-500 mb-6">
        You have the option of monthly or yearly billing.
      </p>
      <div className="space-y-4 flex gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => handlePlanSelect(plan)}
            className={`w-full p-4 flex items-center h-[150px] justify-between border rounded-lg ${
              formData.selectedPlan?.id === plan.id
                ? "border-blue-500 bg-blue-50"
                : "border-blue-950"
            }`}
          >
            <div className="flex items-center gap-4 flex-col justify-between mx-auto">
              <span className="text-4xl">{plan.icon}</span>
              <div>
                <h3 className="font-bold text-[20px]">{plan.name}</h3>
                <p className="text-gray-500">
                  {plan.price[formData.billing]}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <span>Monthly</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={formData.billing === "yearly"}
            onChange={toggleBilling}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full focus:ring-4 focus:ring-blue-300 checked:bg-blue-600">
            <div
              className="dot absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition peer-checked:translate-x-full"
            ></div>
          </div>
        </label>
        <span>Yearly</span>
      </div>
    </div>
  );
}

export default Step2;