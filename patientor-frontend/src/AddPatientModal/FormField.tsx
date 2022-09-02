import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import {
  Diagnosis,
  EntryType,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import { InputLabel } from "@material-ui/core";
import Input from "@material-ui/core/Input";

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

export type TypeOption = {
  value: EntryType;
  label: string;
};

export type HealthCheckOption = {
  value: HealthCheckRating | string;
  label: HealthCheckRating | string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[] | TypeOption[] | HealthCheckOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

export const HospitalField = ({
  type,
  setFieldValue,
  setFieldTouched,
}: {
  type: EntryType;
  setFieldValue: FormikProps<{
    discharge: HospitalEntry["discharge"];
  }>["setFieldValue"];
  setFieldTouched: FormikProps<{
    discharge: HospitalEntry["discharge"];
  }>["setFieldTouched"];
}) => {
  if (type !== EntryType.Hospital) return null;

  const [discharge, setDischarge] = useState<HospitalEntry["discharge"]>({
    date: "",
    criteria: "",
  });
  const field = "discharge";

  const onDischargeChange = (discharge: HospitalEntry["discharge"]) => {
    setDischarge(discharge);
    setFieldTouched(field, true);
    setFieldValue(field, discharge);
  };
  return (
    <div>
      <InputLabel>{field.toUpperCase()}</InputLabel>
      <TextFieldMUI
        fullWidth
        label="Date"
        placeholder="YYYY-MM-DD"
        value={discharge.date}
        name="discharge"
        onChange={(e) =>
          onDischargeChange({ ...discharge, date: e.target.value })
        }
      />
      <TextFieldMUI
        fullWidth
        label="Criteria"
        placeholder="Criteria"
        value={discharge.criteria}
        name="discharge"
        onChange={(e) =>
          onDischargeChange({ ...discharge, criteria: e.target.value })
        }
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field} />
      </Typography>
    </div>
  );
};

type SickLeave = OccupationalHealthcareEntry["sickLeave"];
export const OccupationalHealthcareField = ({
  type,
  setFieldTouched,
  setFieldValue,
}: {
  type: EntryType;
  setFieldValue: FormikProps<{
    sickLeave: SickLeave;
  }>["setFieldValue"];
  setFieldTouched: FormikProps<{
    sickLeave: SickLeave;
  }>["setFieldTouched"];
}) => {
  if (type !== EntryType.OccupationalHealthcare) return null;

  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });
  const field = "sickLeave";

  const onSickLeaveChange = (sickLeave: SickLeave) => {
    setSickLeave(sickLeave);
    setFieldTouched(field, true);
    setFieldValue(field, sickLeave);
  };

  return (
    <div>
      <Field
        name="employerName"
        label="Employer Name"
        placeholder="Employer Name"
        component={TextField}
      />
      <InputLabel>{field.toUpperCase()}</InputLabel>
      <TextFieldMUI
        fullWidth
        label="Start Date"
        placeholder="YYYY-MM-DD"
        value={sickLeave?.startDate}
        name="sickLeave"
        onChange={(e) => {
          const obj = sickLeave ? sickLeave : { endDate: "", startDate: "" };
          return onSickLeaveChange({ ...obj, startDate: e.target.value });
        }}
      />
      <TextFieldMUI
        fullWidth
        label="End Date"
        placeholder="YYYY-MM-DD"
        value={sickLeave?.endDate}
        name="sickLeave"
        onChange={(e) => {
          const obj = sickLeave ? sickLeave : { endDate: "", startDate: "" };
          return onSickLeaveChange({ ...obj, endDate: e.target.value });
        }}
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field} />
      </Typography>
    </div>
  );
};

export const HealthCheckField = ({ type }: { type: EntryType }) => {
  if (type !== EntryType.HealthCheck) return null;

  const getHealthCheckString = () =>
    Object.values(HealthCheckRating).filter((value) => isNaN(Number(value)));
  const getHealthCheckNumber = () =>
    Object.values(HealthCheckRating).filter((value) => !isNaN(Number(value)));
  return (
    <SelectField
      label="HealthCheckRating"
      name="healthCheckRating"
      options={getHealthCheckNumber().map((value, i) => ({
        value,
        label: getHealthCheckString()[i],
      }))}
    />
  );
};

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {
  const [value, setValue] = useState<number>();

  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value === undefined) return;
          if (value > max) setValue(max);
          else if (value <= min) setValue(min);
          else setValue(Math.floor(value));
        }}
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, [...data]);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: "30px" }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
