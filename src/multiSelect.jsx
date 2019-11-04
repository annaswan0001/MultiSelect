import React, { useState, useEffect } from "react";
import { Clear, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import PropTypes from 'prop-types';

export default function MultiSelect(props) {

      const [value, setValue] = useState("");
      const [values, setValues] = useState([]);
      const [focusedValue, setFocusValue] = useState(-1);
      const [isOpen, handleOpen] = useState(false);
      const [options, setOptions] = useState(props.options);



      useEffect(() => {
            filteredOptions();
      }, [value]);

      const filteredOptions = () => {
            if (!value) {
                  setOptions(props.options);
            } else {
                  const filterValue = options.filter(option => {
                        return option.value
                              .toLowerCase()
                              .includes(value.toLowerCase());
                  });

                  setOptions(filterValue);
            }
      };

      const onChange = e => {
            setValue(e.target.value);
      };

      const onClick = () => {
            handleOpen(isOpen => !isOpen);
      };

      const onBlur = () => {
            setTimeout(() => {
                  setFocusValue(-1);
                  handleOpen(false);
            }, 100);
      };

      const onDeleteOption = e => {
            const { value } = e.currentTarget.dataset;
            let [...newValues] = values;
            const index = newValues.indexOf(value);
            newValues.splice(index, 1);
            setValues(newValues);
      };

      const onHoverOption = e => {
            const { value } = e.currentTarget.dataset;
            const index = options.findIndex(option => option.value === value);
            setFocusValue(index);
      };

      const onClickOption = e => {
            const { value } = e.currentTarget.dataset;
            let [...valuesNew] = values;
            const index = valuesNew.indexOf(value);

            if (index === -1) {
                  valuesNew.push(value);
            } else {
                  valuesNew.splice(index, 1);
            }

            setValues(valuesNew);
            onBlur();
      };

      const renderOptions = () => {
            if (!isOpen) {
                  return null;
            }

            return (
                  <div onBlur={onBlur} className="options">
                        {options.map(renderOption)}
                  </div>
            );
      };

      const onKeyDown = e => {
            switch (e.key) {
                  case " ":
                        e.preventDefault();
                        if (isOpen) {
                              if (focusedValue !== -1) {
                                    const [...newValues] = values;
                                    const value = options[focusedValue].value;
                                    const index = newValues.indexOf(value);

                                    if (index === -1) {
                                          newValues.push(value);
                                    } else {
                                          newValues.splice(index, 1);
                                    }

                                    setValues(newValues);
                              }
                        } 
                        break;
                  case "Escape":
                        if (isOpen) {
                              e.preventDefault();
                              handleOpen(false);
                        }
                        break;

                  case "Enter":
                        const option = options[focusedValue];
                        const value = option.value;
                        let [...valuesNew] = values;

                        const index = valuesNew.indexOf(value);
                        if (index === -1) {
                              valuesNew.push(value);
                        } else {
                              valuesNew.splice(index, 1);
                        }
                        setValues(valuesNew);
                        onBlur();
                        break;
                  case "ArrowDown":
                        e.preventDefault();

                        let inFocus = focusedValue;

                        if (inFocus < options.length - 1) {
                              inFocus++;

                              if (inFocus > -1) setFocusValue(inFocus);
                        }
                        break;
                  case "ArrowUp":
                        e.preventDefault();

                        let inFocusV = focusedValue;

                        if (inFocusV > 0) {
                              inFocusV--;
                              setFocusValue(inFocusV);
                        }
                        break;
                  default:
                        break;
            }
      };

      const stopPropagation = e => {
            e.stopPropagation();
      };

      const renderValues = () => {
            const { placeholder } = props;
            if (values.length === 0) {
                  return (
                        <input
                              className="selectInput"
                              value={value}
                              type="text"
                              placeholder={placeholder}
                              onChange={onChange}
                              
                        />
                  );
            }

            return values.map(value => {
                  return (
                        <span
                              key={value}
                              onClick={stopPropagation}
                              className="multiple value"
                        >
                              {value}
                              <span
                                    data-value={value}
                                    onClick={onDeleteOption}
                                    className="delete"
                              >
                                    <Clear style={{ height: "0.8em" }} />
                              </span>
                        </span>
                  );
            });
      };

      const renderOption = (option, index) => {
            const { value } = option;
            const selected = values.includes(value);

            let className = "option";
            if (selected) className += " selected";
            if (index === focusedValue) className += " focused";

            return (
                  <div
                        key={value}
                        data-value={value}
                        className={className}
                        onMouseOver={onHoverOption}
                        onClick={onClickOption}
                  >
                        {value}
                  </div>
            );
      };

      return (
            <div
                  className="select"
                  tabIndex="0"
                  onBlur={onBlur}
                  onKeyDown={onKeyDown}
                  onClick={onClick}
            >
                  <label className="label">{props.label}</label>
                  <div className="selection">
                        {renderValues()}
                        <span className="arrow">
                              {isOpen ? (
                                    <KeyboardArrowUp />
                              ) : (
                                    <KeyboardArrowDown />
                              )}
                        </span>
                  </div>
                  {renderOptions()}
            </div>
      );
}

MultiSelect.propTypes = {
      options: PropTypes.array,
      optionalString: PropTypes.string
};
