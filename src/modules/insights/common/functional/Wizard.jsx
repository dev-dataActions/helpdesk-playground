import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "../base/Button";
import { Label } from "../base/Label";
import { WizardContext } from "../contexts/WizardContext";
import { MdErrorOutline } from "react-icons/md";
import { Loader } from "../base/Loader";

export const Wizard = ({ steps, updateFormData, formData }) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;

  const next = async () => {
    setLoading(true);
    setErrors([]);
    const currentStepConfig = steps[currentStep];
    if (currentStepConfig.onNext) {
      const proceed = await currentStepConfig.onNext(formData);
      if (proceed?.errors?.length > 0) {
        setErrors(proceed?.errors ?? []);
        setLoading(false);
        return;
      }
    }
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
    setLoading(false);
  };

  const previous = () => {
    setErrors([]);
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentStepConfig = steps[currentStep];
    if (isLastStep) {
      setLoading(true);
      if (currentStepConfig.onSubmit) await currentStepConfig.onSubmit(formData);
      else if (currentStepConfig.onNext) await currentStepConfig.onNext(formData);
      setLoading(false);
    } else {
      await next();
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <WizardContext.Provider value={{ currentStep, formData, updateFormData }}>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4 gap-2">
          <h1 className="text-lg font-medium w-[80%]">{steps[currentStep].title}</h1>
          <p className="text-sm w-[20%] text-right">{`Step ${currentStep + 1} of ${
            steps.length
          }`}</p>
        </div>
        <div className="p-4 border border-gray-300 rounded-md shadow-sm">
          {errors?.length > 0 && (
            <div className="flex flex-col gap-y-2 mb-2">
              {errors?.map((error, index) => (
                <p
                  key={index}
                  className=" border border-red-400 px-2 py-1.5 rounded-md text-sm flex gap-2 items-center text-red-500 bg-red-50 text-xs"
                >
                  <MdErrorOutline size={16} />
                  {error}
                </p>
              ))}
            </div>
          )}
          <CurrentStepComponent formData={formData} updateFormData={updateFormData} />
          <div className="flex justify-between mt-3">
            <Button
              type="button"
              className="px-0 py-0"
              onClick={previous}
              disabled={currentStep === 0}
              label={
                <Label
                  icon={<AiOutlineArrowLeft size={16} />}
                  text="Previous"
                  className="text-sm"
                />
              }
            />
            <Button
              type="submit"
              className="px-0 py-0"
              label={
                loading ? (
                  <Loader loaderSize="w-4 h-4" loaderText="Loading" />
                ) : isLastStep ? (
                  "Submit"
                ) : (
                  <Label
                    icon={<AiOutlineArrowRight size={16} />}
                    text="Next"
                    className="text-sm"
                    labelFirst
                  />
                )
              }
            />
          </div>
        </div>
      </form>
    </WizardContext.Provider>
  );
};
