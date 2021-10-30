import styled from "@emotion/styled";
import { validate } from "class-validator";
import * as React from "react";
import { CountryAutoComplete } from "../autocomplete/country";
import { Form as FormValidator } from "./form";

const Form = styled.form({
  padding: "0 10%",
  flexGrow: 1,
  maxHeight: "100%",
  overflow: "auto",
});
const InputGroup = styled.div({
  margin: "1.75rem 0",
});
const InputLabel = styled.label({
  fontSize: "1rem",
  marginBottom: "0.65rem",
  display: "block",
});
const InputContainer = styled.div<{ fullWidth?: boolean }>((props) => ({
  display: "flex",
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  width: props.fullWidth ? "100%" : "60%",
}));
const Input = styled.input({
  border: "none",
  borderRadius: "0.25rem",
  fontSize: "1rem",
  padding: "0.8rem",
  flexGrow: 1,
  fontFamily: "inherit",
  outline: "none",
  fontWeight: 500,
});
const Textarea = styled.textarea({
  border: "none",
  borderRadius: "0.25rem",
  fontSize: "1rem",
  padding: "0.8rem",
  flexGrow: 1,
  fontFamily: "inherit",
  outline: "none",
  maxWidth: "100%",
  fontWeight: 500,
});
const Button = styled.button({
  backgroundColor: "#98eec8",
  border: "none",
  cursor: "pointer",
  fontSize: 18,
  fontWeight: 400,
  marginLeft: "auto",
  outline: "none",
  padding: "12px 18px",
  fontFamily: "inherit",
  flexGrow: 1,
  borderRadius: "4px",
  ":hover": {
    backgroundColor: "#3ef1a1",
  },
  transition: "background-color 0.2s ease-in-out",
  lineHeight: 1,
});
const Col = styled.div({
  display: "flex",
  alignItems: "center",
});
const Error = styled.div({
  color: "#f44336",
  fontSize: "0.9rem",
  marginLeft: "2rem",
});

export const FeedbackForm = () => {
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    phoneNumber: "",
  });
  const initValidation = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    phoneNumber: "",
  };
  const [validationErrors, setValidationErrors] =
    React.useState(initValidation);

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationErrors(initValidation);
    const validationForm = new FormValidator(form);
    validate(validationForm).then((errors) => {
      errors.forEach((error) => {
        console.log("error", error.constraints);
        setValidationErrors((validationErrors) => {
          if (!error.constraints) {
            return validationErrors;
          }
          return {
            ...validationErrors,
            [error.property]:
              error.constraints[Object.keys(error.constraints)[0]],
          };
        });
      });
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <h2>Thank you so much for taking the time!</h2>
      <p>Please provide the below details!</p>
      <InputGroup>
        <InputLabel>First Name:</InputLabel>
        <Col>
          <InputContainer>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={updateForm}
              placeholder="John"
            />
          </InputContainer>
          {validationErrors.firstName.length > 0 && (
            <Error>{validationErrors.firstName}</Error>
          )}
        </Col>
      </InputGroup>
      <InputGroup>
        <InputLabel>Last Name:</InputLabel>
        <Col>
          <InputContainer>
            <Input
              name="lastName"
              value={form.lastName}
              onChange={updateForm}
              placeholder="Doe"
            />
          </InputContainer>
          {validationErrors.lastName.length > 0 && (
            <Error>{validationErrors.lastName}</Error>
          )}
        </Col>
      </InputGroup>
      <InputGroup>
        <InputLabel>Address:</InputLabel>
        <Col>
          <InputContainer fullWidth>
            <Textarea
              name="address"
              value={form.address}
              onChange={updateForm}
              rows={4}
              placeholder="Enter your full postal address"
            />
          </InputContainer>
          {validationErrors.address.length > 0 && (
            <Error>{validationErrors.address}</Error>
          )}
        </Col>
      </InputGroup>
      <CountryAutoComplete
        value={form.country}
        onChange={(value) =>
          setForm({
            ...form,
            country: value,
          })
        }
        validationMessage={validationErrors.country}
      />
      <InputGroup>
        <InputLabel>Email:</InputLabel>
        <Col>
          <InputContainer>
            <Input
              name="phone"
              value={form.email}
              onChange={updateForm}
              placeholder="john@example.com"
            />
          </InputContainer>
          {validationErrors.email.length > 0 && (
            <Error>{validationErrors.email}</Error>
          )}
        </Col>
      </InputGroup>
      <InputGroup>
        <InputLabel>Phone Number:</InputLabel>
        <Col>
          <InputContainer>
            <Input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={updateForm}
              placeholder="1234567890"
            />
          </InputContainer>
          {validationErrors.phoneNumber.length > 0 && (
            <Error>{validationErrors.phoneNumber}</Error>
          )}
        </Col>
      </InputGroup>
      <Button type="submit">Submit feedback!</Button>
    </Form>
  );
};
