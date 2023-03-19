import Button from "../Button";
import { useStepperContext } from "./index";
import type { StepperActionsType } from "../types";

export const Actions: StepperActionsType = ({
  nextButtonText = "Next",
  nexButtonLoading = false,
}) => {
  const { steps, activeStep, onChange } = useStepperContext();
  const isLastStep = steps.length - 1 === activeStep;

  const onBackClick = () => onChange("back");

  const onNextClick = () => onChange("next");

  return (
    <div className="flex gap-4 justify-end">
      {activeStep > 0 && (
        <Button
          buttonSize="small"
          className="max-w-[150px] bg-white text-black border hover:bg-gray-light"
          fullWidth
          onClick={onBackClick}
        >
          Back
        </Button>
      )}
      {!isLastStep && (
        <Button
          buttonSize="small"
          className="max-w-[150px] border"
          fullWidth
          onClick={onNextClick}
          loading={nexButtonLoading}
        >
          {nextButtonText}
        </Button>
      )}
    </div>
  );
};

export default Actions;
