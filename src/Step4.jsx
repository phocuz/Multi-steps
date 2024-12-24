import { useContext } from "react";
import { FormContext } from "./App";

function Step4() {
  const { formData } = useContext(FormContext);
  const addOns = [
  {
    id: 'online_service',
    name: 'Online service',
    price: 1
  },
  {
    id: 'larger_storage',
    name: 'Larger storage',
    price: 2
  },
  {
    id: 'custom_profile',
    name: 'Custom profile',
    price: 2
  }
];

  // Calculate the total cost
  const totalCost = formData.selectedPlan?.price[formData.billing] || 0;
  const addOnCosts = (formData.selectedAddOns || [])
    .reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
  const totalPerYear = totalCost + addOnCosts;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Finishing up</h2>
      <p className="text-gray-500 mb-6">Double-check everything looks OK before confirming.</p>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Arcade (Yearly)</span>
          <span>${formData.selectedPlan?.price[formData.billing]}/yr</span>
        </div>
        {formData.selectedAddOns?.map(addOnId => {
          const addOn = addOns.find(a => a.id === addOnId);
          return (
            <div key={addOnId} className="flex justify-between">
              <span>{addOn?.name}</span>
              <span>${addOn?.price}/yr</span>
            </div>
          );
        })}
        <div className="border-t pt-4 flex justify-between font-medium">
          <span>Total (per year)</span>
          <span>${totalPerYear}/yr</span>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button className="btn-secondary">Go Back</button>
        <button className="btn-primary">Confirm</button>
      </div>
    </div>
  );
}

export default Step4;