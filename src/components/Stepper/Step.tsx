import { useMemo } from "react";
import { CheckIconMini } from "lib/@heroicons";
import Triangle from "../svg/Triangle";
import type { StepType } from "../types";

export const Step: StepType = ({
  step,
  className,
  bulletClassName,
  withArrow = false,
  isLastBullet = false,
  lastStep,
}) => {
  const { classNames, stepBulletContent } = useMemo(() => {
    const classNames = {
      step: `flex-1 h-1 flex items-center ${className ?? ""}`,
      bullet: `h-6 w-6 rounded-full shadow flex items-center justify-center relative ${
        bulletClassName ?? ""
      }`,
      lastBullet:
        "h-6 w-6 rounded-full shadow flex items-center justify-center relative",
      stepInfo:
        "absolute top-8 shadow-[1px_1px_1px_0px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] px-2 py-1 rounded w-max max-w-[125px] text-xs font-medium text-center",
      arrow: "absolute top-0 -mt-1 w-full right-0 left-0",
    };

    let stepBulletContent = null;

    if (step.active) {
      classNames.stepInfo += " bg-white";
      classNames.arrow += " text-white";
    } else {
      classNames.stepInfo += " bg-gray-50";
      classNames.arrow += " text-gray-50";
    }

    if (isLastBullet) {
      classNames.lastBullet += " ml-auto -mr-6";
      if (step.completed || step.active) {
        classNames.stepInfo += " text-indigo-700";
      } else {
        classNames.stepInfo += " text-gray-400";
        classNames.lastBullet += " bg-white";
      }
    } else {
      if (!step.completed && step.active) {
        classNames.stepInfo += " text-indigo-700";
      } else {
        classNames.stepInfo += " text-gray-400";
      }
    }

    if (!step.completed && !step.active) {
      classNames.bullet += " bg-white";
    } else {
      if (step.completed) {
        stepBulletContent = <CheckIconMini className="w-4 h-4 text-white" />;
        classNames.step += " bg-indigo-700";
        classNames.bullet += " bg-indigo-700";
      }

      if (step.active) {
        stepBulletContent = (
          <div
            className={`h-3 w-3 rounded-full ${
              step.active && step.completed ? "bg-white" : "bg-indigo-700"
            }`}
          />
        );
      }
      classNames.bullet += " bg-white";
    }

    return { classNames, stepBulletContent };
  }, [step, className, bulletClassName, isLastBullet]);

  return (
    <div className={classNames.step}>
      <div className={classNames.bullet}>
        {stepBulletContent}
        <div className={classNames.stepInfo}>
          {withArrow && <Triangle className={classNames.arrow} />}
          <p>{step.title}</p>
        </div>
      </div>
      {isLastBullet && (
        <div className={classNames.lastBullet}>
          {stepBulletContent}
          <div className={classNames.stepInfo}>
            {withArrow && <Triangle className={classNames.arrow} />}
            <p>{lastStep.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step;
