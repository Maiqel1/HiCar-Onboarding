import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, type Step2Values } from "../schemas/step2Schema";
import { useFormStore } from "../store/useFormStore";
import { useStepNavigation } from "../hooks/useStepNavigation";
import { FormLayout } from "../components/FormLayout";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { RadioGroup } from "../components/ui/RadioGroup";

const CREDIT_SCORE_OPTIONS = [
  { value: "poor", label: "Poor (300–579)" },
  { value: "fair", label: "Fair (580–669)" },
  { value: "good", label: "Good (670–739)" },
  { value: "very_good", label: "Very Good (740–799)" },
  { value: "exceptional", label: "Exceptional (800–850)" },
];

const EMPLOYMENT_OPTIONS = [
  { value: "employed", label: "Employed" },
  { value: "self_employed", label: "Self-Employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "retired", label: "Retired" },
  { value: "student", label: "Student" },
];

export const Step2Preferences = () => {
  const { step2, setStep2 } = useFormStore();
  const { goNext, goBack, currentStep } = useStepNavigation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    resetField,
    formState: { errors },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      purchaseType: step2.purchaseType as Step2Values["purchaseType"],
      vehicleType: step2.vehicleType as Step2Values["vehicleType"],
      budgetMin: step2.budgetMin,
      budgetMax: step2.budgetMax,
      creditScoreRange: step2.creditScoreRange,
      employmentStatus: step2.employmentStatus,
      homeCharging: step2.homeCharging,
    },
  });

  const purchaseType = watch("purchaseType");
  const vehicleType = watch("vehicleType");

  useEffect(() => {
    if (purchaseType !== "financing") {
      resetField("creditScoreRange");
      resetField("employmentStatus");
    }
  }, [purchaseType, resetField]);

  useEffect(() => {
    if (vehicleType !== "ev") {
      resetField("homeCharging");
    }
  }, [vehicleType, resetField]);

  useEffect(() => {
    const subscription = watch((values) => {
      setStep2({
        purchaseType: values.purchaseType ?? "",
        vehicleType: values.vehicleType ?? "",
        budgetMin: values.budgetMin ?? "",
        budgetMax: values.budgetMax ?? "",
        creditScoreRange: values.creditScoreRange ?? "",
        employmentStatus: values.employmentStatus ?? "",
        homeCharging: values.homeCharging ?? "",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setStep2]);

  const onSubmit = (data: Step2Values) => {
    setStep2({
      purchaseType: data.purchaseType,
      vehicleType: data.vehicleType,
      budgetMin: data.budgetMin,
      budgetMax: data.budgetMax,
      creditScoreRange: data.creditScoreRange ?? "",
      employmentStatus: data.employmentStatus ?? "",
      homeCharging: data.homeCharging ?? "",
    });
    goNext(currentStep);
  };

  return (
    <FormLayout
      currentStep={2}
      title="Purchase Preferences"
      subtitle="Help us understand what you're looking for."
      onNext={handleSubmit(onSubmit)}
      onBack={() => goBack(currentStep)}
    >
      <Controller
        name="purchaseType"
        control={control}
        render={({ field }) => (
          <RadioGroup
            label="Purchase Type"
            name="purchaseType"
            required
            value={field.value ?? ""}
            onChange={field.onChange}
            error={errors.purchaseType?.message}
            options={[
              { value: "cash", label: "Cash" },
              { value: "financing", label: "Financing" },
            ]}
          />
        )}
      />

      {purchaseType === "financing" && (
        <div className="pl-4 border-l-2 border-blue-200 space-y-4">
          <Select
            id="creditScoreRange"
            label="Credit Score Range"
            required
            placeholder="Select range"
            options={CREDIT_SCORE_OPTIONS}
            error={errors.creditScoreRange?.message}
            {...register("creditScoreRange")}
          />
          <Select
            id="employmentStatus"
            label="Employment Status"
            required
            placeholder="Select status"
            options={EMPLOYMENT_OPTIONS}
            error={errors.employmentStatus?.message}
            {...register("employmentStatus")}
          />
        </div>
      )}

      <Controller
        name="vehicleType"
        control={control}
        render={({ field }) => (
          <RadioGroup
            label="Vehicle Type"
            name="vehicleType"
            required
            value={field.value ?? ""}
            onChange={field.onChange}
            error={errors.vehicleType?.message}
            options={[
              { value: "ev", label: "EV" },
              { value: "hybrid", label: "Hybrid" },
              { value: "gas", label: "Gas" },
              { value: "unsure", label: "Unsure" },
            ]}
          />
        )}
      />

      {vehicleType === "ev" && (
        <div className="pl-4 border-l-2 border-blue-200">
          <Controller
            name="homeCharging"
            control={control}
            render={({ field }) => (
              <RadioGroup
                label="Home charging available?"
                name="homeCharging"
                required
                value={field.value ?? ""}
                onChange={field.onChange}
                error={errors.homeCharging?.message}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            )}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="budgetMin"
          label="Budget Minimum ($)"
          type="number"
          placeholder="10000"
          required
          min="0"
          error={errors.budgetMin?.message}
          {...register("budgetMin")}
        />
        <Input
          id="budgetMax"
          label="Budget Maximum ($)"
          type="number"
          placeholder="50000"
          required
          min="0"
          error={errors.budgetMax?.message}
          {...register("budgetMax")}
        />
      </div>
    </FormLayout>
  );
};
