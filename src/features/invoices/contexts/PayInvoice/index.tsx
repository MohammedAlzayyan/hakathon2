import {
  createContext,
  useContext,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import ConfirmDetails from "../../components/PayInvoice/ConfirmDetails";
import Preview from "../../components/PayInvoice/Preview";
import Payment from "../../components/PayInvoice/Payment";
import Confirmation from "../../components/PayInvoice/Confirmation";
import { URL_PATHS } from "data";
import { PAY_INVOICE_STEPS } from "../../data";
import { useInvoiceDetails, useCompleteInvoiceMutation } from "../../hooks";
import type {
  PayInvoiceContextType,
  PayInvoiceStateType,
  ConfirmDetailsInputsType,
} from "../../types";
import type { StepperOnChangeType } from "components/types";

const PayInvoiceContext = createContext<PayInvoiceContextType>({
  invoiceId: undefined,
  stepsData: {
    steps: [],
    activeStepIndex: 0,
    stepContent: <></>,
    currentStep: PAY_INVOICE_STEPS[0],
    nextStep: undefined,
    previousStep: undefined,
    isLastStep: false,
  },
  onStepperChange: () => {},
  invoiceDetails: {
    data: undefined,
    isLoading: true,
    error: "",
  },
  nextButton: {
    label: "",
    isLoading: false,
  },
});

export const usePayInvoice = () => useContext(PayInvoiceContext);

const PayInvoiceState: PayInvoiceStateType = ({ children }) => {
  const [steps, setSteps] = useState(PAY_INVOICE_STEPS);
  const confirmDetailsFormRef = useRef<HTMLButtonElement>(null);
  const { query, replace } = useRouter();
  const invoiceId = (query.invoiceId as string) || undefined;
  const {
    invoiceDetails,
    isLoading: invoiceLoading,
    error: invoiceError,
  } = useInvoiceDetails(invoiceId);
  const { triggerCompleteInvoice, isLoading: confirmDetailsLoading } =
    useCompleteInvoiceMutation(invoiceId);
  const activeStepIndex = steps.findIndex((step) => step.active);
  const currentStep = steps[activeStepIndex];
  const nextStep = steps[activeStepIndex + 1];
  const previousStep = steps[activeStepIndex - 1];
  const isLastStep = steps[steps.length - 1].id === currentStep.id;
  const nextButtonText = currentStep.id === "step3" ? "Pay $520" : "Next";
  const nextButtonLoading = confirmDetailsLoading;

  const nextActionHandler = useCallback(() => {
    const updatedSteps = steps.map((step) => {
      if (step.id === currentStep.id) {
        return { ...step, completed: true, active: false };
      } else if (step.id === nextStep.id) {
        return { ...step, active: true };
      } else {
        return step;
      }
    });
    setSteps(updatedSteps);
  }, [currentStep.id, nextStep?.id, steps]);

  const backActionHandler = useCallback(() => {
    const updatedSteps = steps.map((step) => {
      if (step.id === currentStep.id) {
        return { ...step, active: false };
      } else if (step.id === previousStep.id) {
        return { ...step, active: true };
      } else {
        return step;
      }
    });
    setSteps(updatedSteps);
  }, [currentStep.id, previousStep?.id, steps]);

  const onSubmitConfirmDetails = useCallback(
    async (data: ConfirmDetailsInputsType) => {
      try {
        const result = await triggerCompleteInvoice({
          client: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            address: {
              city: data.city,
              state: data.state,
              zipCode: data.zip,
              country: data.country,
            },
          },
          type: invoiceDetails?.type || "invoice",
          hashCode: invoiceDetails?.invoice.hashCode || "",
        });
        if (invoiceDetails?.type === "service") {
          replace(
            URL_PATHS.INVOICES.PAY_INVOICE(result?.data?.invoiceId as string),
            undefined,
            {
              shallow: true,
            }
          );
        }
        nextActionHandler();
      } catch (error) {
        console.log("😥 ~ triggerCompleteInvoice ~ error", error);
      }
    },
    [nextActionHandler, triggerCompleteInvoice, invoiceDetails, replace]
  );

  const onStepperChange: StepperOnChangeType = useCallback(
    (action) => {
      if (action === "next") {
        if (currentStep.id === "step1") {
          confirmDetailsFormRef.current?.click();
        } else {
          nextActionHandler();
        }
      } else {
        backActionHandler();
      }
    },
    [backActionHandler, currentStep.id, nextActionHandler]
  );

  const stepsContent = useMemo(
    () => [
      <ConfirmDetails
        key="step1"
        ref={confirmDetailsFormRef}
        onSubmit={onSubmitConfirmDetails}
      />,
      <Preview key="step2" />,
      <Payment key="step3" />,
      <Confirmation key="step4" />,
    ],
    [onSubmitConfirmDetails]
  );
  const stepContent = stepsContent[activeStepIndex];

  const value: PayInvoiceContextType = useMemo(
    () => ({
      invoiceId,
      stepsData: {
        steps,
        activeStepIndex,
        stepContent,
        currentStep,
        nextStep,
        previousStep,
        isLastStep,
      },
      invoiceDetails: {
        data: invoiceDetails,
        isLoading: invoiceLoading,
        error: invoiceError?.response?.data?.message || undefined,
      },
      onStepperChange,
      nextButton: {
        label: nextButtonText,
        isLoading: nextButtonLoading,
      },
    }),
    [
      invoiceId,
      steps,
      activeStepIndex,
      stepContent,
      currentStep,
      nextStep,
      previousStep,
      isLastStep,
      nextButtonText,
      onStepperChange,
      invoiceDetails,
      invoiceLoading,
      nextButtonLoading,
      invoiceError,
    ]
  );

  useEffect(() => {
    () => {
      // clean storage data
    };
  }, []);

  return (
    <PayInvoiceContext.Provider value={value}>
      {children}
    </PayInvoiceContext.Provider>
  );
};

export default PayInvoiceState;
