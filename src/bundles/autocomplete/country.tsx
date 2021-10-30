import styled from "@emotion/styled";
import * as React from "react";
import { VscSearch as SearchIcon } from "react-icons/vsc";
import countryList from "./country-list.json";

const InputGroup = styled.div({
  margin: "1.75rem 0",
});
const InputLabel = styled.label({
  fontSize: "1rem",
  marginBottom: "0.65rem",
  display: "block",
});
const InputContainer = styled.div<{ fullWidth?: boolean; open?: boolean }>(
  (props) => ({
    display: "flex",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    backgroundColor: "#fff",
    borderRadius: props.open ? "0.5rem 0.5rem 0 0" : "0.5rem",
    width: props.fullWidth ? "100%" : "60%",
    alignItems: "center",
    position: "relative",
  }),
);
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
const Error = styled.div({
  color: "#f44336",
  fontSize: "0.9rem",
  marginLeft: "2rem",
});
const Col = styled.div({
  display: "flex",
  alignItems: "center",
});
const SuggestionContainer = styled.div({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 7,
  backgroundColor: "#fff",
  borderRadius: "0 0 0.5rem 0.5rem",
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  maxHeight: "20rem",
  overflowY: "auto",
});
const SuggestionListItem = styled.div<{ active?: boolean }>((props) => ({
  fontSize: "1rem",
  padding: "1rem 0.8rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  backgroundColor: props.active ? "#f5f5f5" : "transparent",
}));

export interface CountryAutoCompleteProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  validationMessage: string;
}

export const CountryAutoComplete = (props: CountryAutoCompleteProps) => {
  const [displayAutosuggestion, setDisplayAutoSuggestion] =
    React.useState(false);
  const [inputValue, setInputValue] = React.useState(props.value);
  const [activeSuggestion, setActiveSuggestion] = React.useState("");
  const inputContainerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
    if (ev.target.value.length > 0) {
      setDisplayAutoSuggestion(true);
    } else {
      setDisplayAutoSuggestion(false);
    }
  };

  React.useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const filteredCountries = countryList.filter(
      (country) =>
        country.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      if (activeSuggestion === "") {
        setActiveSuggestion(filteredCountries[0].name);
      } else {
        const index = filteredCountries.findIndex(
          (country) => country.name === activeSuggestion,
        );
        if (index < filteredCountries.length - 1) {
          setActiveSuggestion(filteredCountries[index + 1].name);
        }
      }
    } else if (ev.key === "ArrowUp") {
      ev.preventDefault();
      if (activeSuggestion === "") {
        setActiveSuggestion(
          filteredCountries[filteredCountries.length - 1].name,
        );
      } else {
        const index = filteredCountries.findIndex(
          (country) => country.name === activeSuggestion,
        );
        if (index > 0) {
          setActiveSuggestion(filteredCountries[index - 1].name);
        }
      }
    } else if (ev.key === "Enter") {
      ev.preventDefault();
      if (activeSuggestion !== "") {
        setInputValue(activeSuggestion);
        setDisplayAutoSuggestion(false);
        props.onChange(activeSuggestion);
      }
    } else if (ev.key === "Escape") {
      ev.preventDefault();
      setDisplayAutoSuggestion(false);
    }
  };

  return (
    <InputGroup>
      <InputLabel>Country</InputLabel>
      <Col>
        <InputContainer ref={inputContainerRef} open={displayAutosuggestion}>
          <Input
            placeholder="Country"
            value={inputValue}
            onChange={changeHandler}
            name="country"
            ref={inputRef}
            onKeyDown={onKeyDown}
          />
          <SearchIcon
            style={{ fontSize: 24, margin: "0 .75rem", color: "#909090" }}
          />
          {displayAutosuggestion && (
            <SuggestionContainer>
              {countryList
                .filter(
                  (country) =>
                    country.name
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) > -1,
                )
                .map((country) => (
                  <SuggestionListItem
                    key={country.code}
                    onClick={() => {
                      setInputValue(country.name);
                      props.onChange(country.name);
                      setDisplayAutoSuggestion(false);
                    }}
                    active={country.name === activeSuggestion}
                  >
                    {country.name}
                  </SuggestionListItem>
                ))}
            </SuggestionContainer>
          )}
        </InputContainer>
        {props.validationMessage.length > 0 && (
          <Error>{props.validationMessage}</Error>
        )}
      </Col>
    </InputGroup>
  );
};
