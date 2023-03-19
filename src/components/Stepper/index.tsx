import React from "react";
import ProgressBar from "./ProgressBar";
import Content from "./Content";
import Actions from "./Actions";
import type { StepperProps, StepperContextType } from "../types";

const StepperContext = React.createContext<StepperContextType>({
  activeStep: 0,
  steps: [],
  onChange: () => {},
});

export const useStepperContext = () => {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error(
      `Stepper components cannot be rendered outside the StepperProvider`
    );
  }
  return context;
};

export const Stepper = ({
  steps,
  activeStep,
  onChange,
  children,
}: StepperProps) => {
  const value = React.useMemo(
    () => ({ steps, activeStep, onChange }),
    [steps, activeStep, onChange]
  );

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};

Stepper.ProgressBar = ProgressBar;
Stepper.Content = Content;
Stepper.Actions = Actions;

export default Stepper;
