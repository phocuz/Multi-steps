import { createContext, useState } from "react";
import desktopImage from "./assets/desktop.svg";
import mobileImage from "./assets/mobile.svg";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

export const FormContext = createContext();

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    billing: "monthly",
    selectedPlan: null, // Initialize selectedPlan
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const steps = [
    { id: 1, label: "Your Info",  stepNum:"step 1" },
    { id: 2, label: "Select Plan", stepNum:"step 2" },
    { id: 3, label: "Add-ons",  stepNum:"step 3" },
    { id: 4, label: "Summary",  stepNum:"step 4" },
  ];

  function handleBack() {
    step > 1 && setStep((prev) => prev - 1);
  }

  function handleNext() {
    step < 4 && setStep((prev) => prev + 1);
  }

  return (
    <FormContext.Provider 
      value={{ 
        formData, 
        updateFormData, 
        handleChange, 
        step, 
        setStep, 
        handleNext, 
        handleBack,
      
      }}
    >
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg w-full max-w-4xl flex flex-col sm:flex-row">
          <div 
            className="w-1/3 p-4 bg-blue-500 text-white rounded-lg"
            style={{
              backgroundImage: `url(${window.innerWidth < 768 ? mobileImage : desktopImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <ul className="space-y-4">
              {steps.map((s, index) => (
                <li
                  key={s.id}
                  className={`flex items-center gap-2 ${
                    step === s.id ? "font-bold text-white" : "text-white-300"
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      step === s.id ? "bg-white text-blue-500" : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex flex-col ">
                    <span >{s.stepNum}</span>
                  <span className="uppercase">{s.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

         <div className="flex flex-col gap-6 justify-center items-center w-full">
           <div className="w-2/3 p-6">
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
          </div>

          <div className="flex justify-around w-full mt-6">
             {step > 1 && (
              <button
                className="text-blue-500 hover:underline"
                onClick={handleBack}
              >
                Go Back
              </button>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleNext}
            >
              Next Step
            </button>
          </div>
         </div>
        </div>

      </div>
    </FormContext.Provider>
  );
}

export default App;