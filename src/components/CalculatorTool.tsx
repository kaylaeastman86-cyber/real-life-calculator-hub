"use client";

import { type FormEvent, useMemo, useState } from "react";
import { getCalculatorBySlug, type CalculationResult } from "@/lib/calculators";

type CalculatorToolProps = {
  slug: string;
};

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;

export function CalculatorTool({ slug }: CalculatorToolProps) {
  const calculator = getCalculatorBySlug(slug);
  const initialValues = useMemo(() => {
    const values: FormValues = {};
    calculator?.fields.forEach((field) => {
      values[field.name] = "";
    });
    return values;
  }, [calculator]);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<CalculationResult | null>(null);

  if (!calculator) {
    return null;
  }

  function validate() {
    if (!calculator) {
      return { nextErrors: {}, parsedValues: {} };
    }

    const nextErrors: FormErrors = {};
    const parsedValues: Record<string, number> = {};

    calculator.fields.forEach((field) => {
      const rawValue = values[field.name]?.trim();
      const numberValue = Number(rawValue);

      if (!rawValue || Number.isNaN(numberValue)) {
        nextErrors[field.name] = "Enter a number.";
        return;
      }

      if (field.min !== undefined && numberValue < field.min) {
        nextErrors[field.name] = `Enter at least ${field.min}.`;
        return;
      }

      if (field.max !== undefined && numberValue > field.max) {
        nextErrors[field.name] = `Enter no more than ${field.max}.`;
        return;
      }

      parsedValues[field.name] = numberValue;
    });

    return { nextErrors, parsedValues };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!calculator) {
      return;
    }

    const { nextErrors, parsedValues } = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setResult(null);
      return;
    }

    setResult(calculator.calculate(parsedValues));
  }

  return (
    <form
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {calculator.fields.map((field) => {
          const inputId = `${calculator.slug}-${field.name}`;
          return (
            <div key={field.name}>
              <label className="block font-bold text-ink" htmlFor={inputId}>
                {field.label}
              </label>
              <div className="mt-2 flex min-h-12 overflow-hidden rounded-md border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-calm">
                {field.prefix ? (
                  <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-slate-600">
                    {field.prefix}
                  </span>
                ) : null}
                <input
                  aria-describedby={`${inputId}-help ${inputId}-error`}
                  className="min-w-0 flex-1 px-3 py-3 text-base outline-none"
                  id={inputId}
                  inputMode="decimal"
                  min={field.min}
                  max={field.max}
                  name={field.name}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [field.name]: event.target.value
                    }))
                  }
                  step={field.step}
                  type={field.type}
                  value={values[field.name] ?? ""}
                />
                {field.suffix ? (
                  <span className="flex items-center border-l border-slate-200 bg-slate-50 px-3 text-slate-600">
                    {field.suffix}
                  </span>
                ) : null}
              </div>
              {field.helperText ? (
                <p className="mt-2 text-sm leading-6 text-slate-600" id={`${inputId}-help`}>
                  {field.helperText}
                </p>
              ) : null}
              {errors[field.name] ? (
                <p className="mt-2 text-sm font-semibold text-red-700" id={`${inputId}-error`}>
                  {errors[field.name]}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <button
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-calm px-5 py-3 text-base font-bold text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-calm focus:ring-offset-2 sm:w-auto"
        type="submit"
      >
        Calculate
      </button>

      {result ? (
        <section
          aria-live="polite"
          className="mt-6 border-l-4 border-calm bg-leafwash p-5"
        >
          <h2 className="text-2xl font-bold tracking-normal text-ink">Result</h2>
          <p className="mt-3 text-xl font-bold text-calm">{result.summary}</p>
          <ul className="mt-4 space-y-2 text-slate-700">
            {result.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <h2 className="mt-6 text-2xl font-bold tracking-normal text-ink">
            What this means
          </h2>
          <p className="mt-3 leading-7 text-slate-700">{result.meaning}</p>
        </section>
      ) : null}
    </form>
  );
}
