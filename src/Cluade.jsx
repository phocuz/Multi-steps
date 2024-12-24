// import React, { useState } from 'react';
// import { Check, ArrowLeft, ArrowRight } from 'lucide-react';

// // Form Configuration (can be expanded)
// const FORM_STEPS = [
//   {
//     id: 1,
//     title: 'Personal Info',
//     fields: [
//       { 
//         name: 'firstName', 
//         label: 'First Name', 
//         type: 'text', 
//         required: true 
//       },
//       { 
//         name: 'email', 
//         label: 'Email Address', 
//         type: 'email', 
//         required: true,
//         validation: (value) => {
//           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//           return emailRegex.test(value);
//         }
//       }
//     ]
//   },
//   {
//     id: 2,
//     title: 'Plan Selection',
//     fields: [
//       { 
//         name: 'planType', 
//         label: 'Select Plan', 
//         type: 'select', 
//         options: [
//           { value: 'basic', label: 'Basic Plan' },
//           { value: 'pro', label: 'Pro Plan' },
//           { value: 'enterprise', label: 'Enterprise Plan' }
//         ],
//         required: true
//       }
//     ]
//   },
//   {
//     id: 3,
//     title: 'Additional Options',
//     fields: [
//       { 
//         name: 'addOns', 
//         label: 'Select Add-ons', 
//         type: 'checkbox', 
//         options: [
//           { value: 'support', label: 'Priority Support' },
//           { value: 'training', label: 'Online Training' },
//           { value: 'consultation', label: 'Consultation' }
//         ]
//       }
//     ]
//   }
// ];

// const MultiStepForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({});
//   const [validationErrors, setValidationErrors] = useState({});

//   const handleInputChange = (stepId, name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear validation error for this field
//     setValidationErrors(prev => ({
//       ...prev,
//       [name]: null
//     }));
//   };

//   const validateStep = (step) => {
//     const errors = {};
    
//     step.fields.forEach(field => {
//       const value = formData[field.name];
      
//       // Check if required field is empty
//       if (field.required && (!value || value.length === 0)) {
//         errors[field.name] = `${field.label} is required`;
//       }
      
//       // Additional specific validations
//       if (field.validation && value && !field.validation(value)) {
//         errors[field.name] = `Invalid ${field.label} format`;
//       }
//     });

//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const goToNextStep = () => {
//     const currentStepConfig = FORM_STEPS.find(s => s.id === currentStep);
    
//     if (validateStep(currentStepConfig)) {
//       setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length));
//     }
//   };

//   const goToPreviousStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

//   const handleSubmit = () => {
//     if (validateStep(FORM_STEPS[FORM_STEPS.length - 1])) {
//       console.log('Form Submitted:', formData);
//       // Handle form submission logic
//     }
//   };

//   const renderField = (field) => {
//     const value = formData[field.name] || '';
//     const error = validationErrors[field.name];

//     switch(field.type) {
//       case 'text':
//       case 'email':
//         return (
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium">{field.label}</label>
//             <input
//               type={field.type}
//               value={value}
//               onChange={(e) => handleInputChange(currentStep, field.name, e.target.value)}
//               className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//           </div>
//         );
      
//       case 'select':
//         return (
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium">{field.label}</label>
//             <select
//               value={value}
//               onChange={(e) => handleInputChange(currentStep, field.name, e.target.value)}
//               className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
//             >
//               <option value="">Select an option</option>
//               {field.options.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//           </div>
//         );
      
//       case 'checkbox':
//         return (
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium">{field.label}</label>
//             {field.options.map(option => (
//               <div key={option.value} className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   id={option.value}
//                   checked={Array.isArray(value) ? value.includes(option.value) : false}
//                   onChange={(e) => {
//                     const currentValues = Array.isArray(value) ? value : [];
//                     const newValues = e.target.checked 
//                       ? [...currentValues, option.value]
//                       : currentValues.filter(v => v !== option.value);
                    
//                     handleInputChange(currentStep, field.name, newValues);
//                   }}
//                   className="mr-2"
//                 />
//                 <label htmlFor={option.value}>{option.label}</label>
//               </div>
//             ))}
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   const renderSummary = () => {
//     return (
//       <div className="space-y-4">
//         <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//         {FORM_STEPS.map(step => (
//           <div key={step.id} className="bg-gray-100 p-4 rounded">
//             <h3 className="font-semibold mb-2">{step.title}</h3>
//             {step.fields.map(field => {
//               const value = formData[field.name];
              
//               // Handle different field types for display
//               const displayValue = Array.isArray(value) 
//                 ? value.join(', ') 
//                 : (value || 'Not selected');
              
//               return (
//                 <div key={field.name} className="mb-2">
//                   <span className="font-medium mr-2">{field.label}:</span>
//                   <span>{displayValue}</span>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-center">
//           Multi-Step Form (Step {currentStep} of {FORM_STEPS.length})
//         </h1>
//       </div>

//       {currentStep <= FORM_STEPS.length - 1 ? (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">
//             {FORM_STEPS[currentStep - 1].title}
//           </h2>
//           {FORM_STEPS[currentStep - 1].fields.map(renderField)}
//         </div>
//       ) : (
//         renderSummary()
//       )}

//       <div className="flex justify-between mt-6">
//         {currentStep > 1 && (
//           <button
//             onClick={goToPreviousStep}
//             className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
//           >
//             <ArrowLeft className="mr-2" size={20} /> Previous
//           </button>
//         )}

//         {currentStep < FORM_STEPS.length ? (
//           <button
//             onClick={goToNextStep}
//             className="ml-auto flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             Next <ArrowRight className="ml-2" size={20} />
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmit}
//             className="ml-auto flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//           >
//             Confirm Order <Check className="ml-2" size={20} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultiStepForm;


//import React, { useState } from "react";

// const steps = [
//   { id: 1, label: "Your Info" },
//   { id: 2, label: "Select Plan" },
//   { id: 3, label: "Add-ons" },
//   { id: 4, label: "Summary" },
// ];

// const plans = [
//   { id: 1, name: "Arcade", price: "$9/mo", icon: "🎮" },
//   { id: 2, name: "Advanced", price: "$12/mo", icon: "👾" },
//   { id: 3, name: "Pro", price: "$15/mo", icon: "🎮" },
// ];

// export default function MultiStepForm() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     billing: "monthly",
//     selectedPlan: plans[0],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNext = () => setStep((prev) => prev + 1);
//   const handleBack = () => setStep((prev) => prev - 1);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col sm:flex-row">
//         {/* Sidebar */}
//         <div className="w-1/3 p-4 bg-blue-500 text-white rounded-lg">
//           <ul className="space-y-4">
//             {steps.map((s, index) => (
//               <li
//                 key={s.id}
//                 className={`flex  items-center gap-2 ${
//                   step === s.id ? "font-bold text-white" : "text-gray-300"
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 flex items-center justify-center rounded-full ${
//                     step === s.id ? "bg-white text-blue-500" : "bg-gray-300"
//                   }`}
//                 >
//                   {index + 1}
//                 </div>
//                 <span>{s.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="w-2/3 p-6">
//           {step === 1 && (
//             <div>
//               <h2 className="text-xl font-bold mb-4">Personal info</h2>
//               <p className="text-gray-500 mb-6">
//                 Please provide your name, email address, and phone number.
//               </p>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="e.g. Stephen King"
//                     className="w-full p-3 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="e.g. stephenking@lorem.com"
//                     className="w-full p-3 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Phone Number</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="e.g. +1 234 567 890"
//                     className="w-full p-3 border rounded-lg"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {step === 2 && (
//             <div>
//               <h2 className="text-xl font-bold mb-4">Select your plan</h2>
//               <p className="text-gray-500 mb-6">
//                 You have the option of monthly or yearly billing.
//               </p>
//               <div className="space-y-4">
//                 {plans.map((plan) => (
//                   <button
//                     key={plan.id}
//                     onClick={() =>
//                       setFormData((prev) => ({ ...prev, selectedPlan: plan }))
//                     }
//                     className={`w-full p-4 flex items-center justify-between border rounded-lg ${
//                       formData.selectedPlan.id === plan.id
//                         ? "border-blue-500 bg-blue-50"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     <div className="flex items-center gap-4">
//                       <span className="text-2xl">{plan.icon}</span>
//                       <div>
//                         <h3 className="font-bold">{plan.name}</h3>
//                         <p className="text-gray-500">{plan.price}</p>
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//               <div className="mt-6 flex justify-between items-center">
//                 <span>Monthly</span>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only"
//                     checked={formData.billing === "yearly"}
//                     onChange={() =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         billing: prev.billing === "monthly" ? "yearly" : "monthly",
//                       }))
//                     }
//                   />
//                   <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600">
//                     <div
//                       className="dot absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition peer-checked:translate-x-full"
//                     ></div>
//                   </div>
//                 </label>
//                 <span>Yearly</span>
//               </div>
//             </div>
//           )}

//           <div className="flex justify-between mt-6">
//             {step > 1 && (
//               <button
//                 className="text-blue-500 hover:underline"
//                 onClick={handleBack}
//               >
//                 Go Back
//               </button>
//             )}
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//               onClick={handleNext}
//             >
//               Next Step
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// APP
//import React, { createContext, useState } from "react";
// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import Summary from "./Step4";

// export const FormContext = createContext();

// const App = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     preferences: "",
//   });

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   const updateFormData = (newData) => {
//     setFormData({ ...formData, ...newData });
//   };

//   return (
//     <FormContext.Provider value={{ formData, updateFormData }}>
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col sm:flex-row">

//         <div>
//         {step === 1 && <Step1 nextStep={nextStep} />}
//         {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
//         {step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} />}
//         {step === 4 && <Summary formData={formData} prevStep={prevStep} />}
//         </div>

//       </div>
//     </FormContext.Provider>
//   );
// };

// export default App;
