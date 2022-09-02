import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { parse, isValid } from "date-fns";

import {
  TextField,
  SelectField,
  DiagnosisSelection,
  HospitalField,
  OccupationalHealthcareField,
  HealthCheckField,
} from "./FormField";
import { EntryFormValues, EntryType } from "../types";

import { useStateValue } from "../state";
interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const validateDate = (date: string | undefined, name = "date") => {
  if (!date) {
    return `${name} field is required`;
  }
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  if (!isValid(parsedDate)) {
    return `Invalid ${name}`;
  }
  return "";
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: EntryType.HealthCheck,
        healthCheckRating: 0,
        discharge: {
          date: "",
          criteria: "",
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        let errstring = validateDate(values.date);
        if (errstring) {
          errors.date = errstring;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        // if (
        //   !values.diagnosisCodes ||
        //   !Array.isArray(values.diagnosisCodes) ||
        //   !values.diagnosisCodes[0]
        // ) {
        //   errors.diagnosisCodes = requiredError;
        // }
        if (values.type === EntryType.Hospital) {
          errstring = validateDate(values.discharge.date);
          if (errors.discharge) {
            errors.discharge = errstring;
          }
          if (!errors.discharge && !values.discharge.criteria) {
            errors.discharge = requiredError;
          }
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }

          errstring = "";
          if (values.sickLeave?.startDate) {
            errstring = validateDate(values.sickLeave?.startDate, "start date");

            if (errstring) {
              errors.sickLeave = errstring;
            }
          }

          errstring = "";
          if (values.sickLeave?.endDate) {
            errstring = validateDate(values.sickLeave?.endDate, "end date");
            if (!errors.sickLeave && errstring) {
              errors.sickLeave = errstring;
            }
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors }) => {
        console.log("errors", errors);
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={Object.values(EntryType).map((value) => ({
                value,
                label: value,
              }))}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <HealthCheckField type={values.type} />
            <HospitalField
              type={values.type}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <OccupationalHealthcareField
              type={values.type}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
