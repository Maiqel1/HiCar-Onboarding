import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStep3Schema, type Step3Values } from "../schemas/step3Schema";
import { useFormStore } from "../store/useFormStore";
import { useStepNavigation } from "../hooks/useStepNavigation";
import { FormLayout } from "../components/FormLayout";
import { Input } from "../components/ui/Input";
import { RadioGroup } from "../components/ui/RadioGroup";

export const Step3ContactSchedule = () => {
  const { step3, step1, setStep3 } = useFormStore();
  const { goNext, goBack, currentStep } = useStepNavigation();

  const step3Schema = createStep3Schema(step1.phone);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      preferredContact:
        step3.preferredContact as Step3Values["preferredContact"],
      addressLine1: step3.addressLine1,
      city: step3.city,
      postalCode: step3.postalCode,
      testDriveDate: step3.testDriveDate,
    },
  });

  useEffect(() => {
    const subscription = watch((values) => {
      setStep3({
        preferredContact: values.preferredContact ?? "",
        addressLine1: values.addressLine1 ?? "",
        city: values.city ?? "",
        postalCode: values.postalCode ?? "",
        testDriveDate: values.testDriveDate ?? "",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setStep3]);

  const onSubmit = (data: Step3Values) => {
    setStep3({
      preferredContact: data.preferredContact,
      addressLine1: data.addressLine1,
      city: data.city,
      postalCode: data.postalCode,
      testDriveDate: data.testDriveDate ?? "",
    });
    goNext(currentStep);
  };

  const minDateTime = new Date();
  minDateTime.setMinutes(
    minDateTime.getMinutes() - minDateTime.getTimezoneOffset(),
  );
  const minDateTimeStr = minDateTime.toISOString().slice(0, 16);

  return (
    <FormLayout
      currentStep={3}
      title="Contact & Schedule"
      subtitle="How should we reach you, and where are you based?"
      onNext={handleSubmit(onSubmit)}
      onBack={() => goBack(currentStep)}
    >
      <Controller
        name="preferredContact"
        control={control}
        render={({ field }) => (
          <RadioGroup
            label="Preferred Contact Method"
            name="preferredContact"
            required
            value={field.value ?? ""}
            onChange={field.onChange}
            error={errors.preferredContact?.message}
            options={[
              { value: "email", label: "Email" },
              { value: "phone", label: "Phone" },
              { value: "whatsapp", label: "WhatsApp" },
            ]}
          />
        )}
      />

      {!step1.phone && (
        <div className="flex gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="flex-shrink-0 mt-0.5"
          >
            <path
              d="M8 1L1.5 13h13L8 1z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M8 6v3M8 11v.5"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
          <span>
            You didn't provide a phone number in Step 1. Go back if you want to
            use Phone or WhatsApp contact.
          </span>
        </div>
      )}

      <Input
        id="addressLine1"
        label="Address Line 1"
        placeholder="123 Main Street"
        required
        error={errors.addressLine1?.message}
        {...register("addressLine1")}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="city"
          label="City"
          placeholder="London"
          required
          error={errors.city?.message}
          {...register("city")}
        />
        <Input
          id="postalCode"
          label="Postal Code"
          placeholder="SW1A 1AA"
          required
          error={errors.postalCode?.message}
          {...register("postalCode")}
        />
      </div>

      <Input
        id="testDriveDate"
        label="Preferred Test Drive Date & Time"
        type="datetime-local"
        min={minDateTimeStr}
        hint="Optional — must be a future date"
        error={errors.testDriveDate?.message}
        {...register("testDriveDate")}
      />
    </FormLayout>
  );
};
