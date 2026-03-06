import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1Values } from "../schemas/step1Schema";
import { useFormStore } from "../store/useFormStore";
import { useStepNavigation } from "../hooks/useStepNavigation";
import { FormLayout } from "../components/FormLayout";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "ng", label: "Nigeria" },
  { value: "za", label: "South Africa" },
  { value: "gh", label: "Ghana" },
  { value: "ke", label: "Kenya" },
  { value: "other", label: "Other" },
];

export const Step1PersonalInfo = () => {
  const { step1, setStep1 } = useFormStore();
  const { goNext, currentStep } = useStepNavigation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: step1,
  });
  
  useEffect(() => {
    const subscription = watch((values) => {
      setStep1({
        firstName: values.firstName ?? "",
        lastName: values.lastName ?? "",
        email: values.email ?? "",
        phone: values.phone ?? "",
        country: values.country ?? "",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setStep1]);

  const onSubmit = (data: Step1Values) => {
    setStep1({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone ?? "",
      country: data.country,
    });
    goNext(currentStep);
  };

  return (
    <FormLayout
      currentStep={1}
      title="Personal Information"
      subtitle="Let's start with the basics."
      onNext={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="firstName"
          label="First Name"
          placeholder="Jane"
          required
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          id="lastName"
          label="Last Name"
          placeholder="Smith"
          required
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="jane@example.com"
        required
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        id="phone"
        label="Phone Number"
        type="tel"
        placeholder="e.g. 07911123456"
        hint="Optional — required if you choose Phone or WhatsApp in Step 3"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Select
        id="country"
        label="Country"
        required
        placeholder="Select your country"
        options={COUNTRIES}
        error={errors.country?.message}
        {...register("country")}
      />
    </FormLayout>
  );
};
