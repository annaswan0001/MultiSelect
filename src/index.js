import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import {vacation, prices} from './api'
import MultiSelect from "./multiSelect";

ReactDOM.render(
      <div>
            <MultiSelect
                  placeholder="Страна для отпуска..."
                  options={vacation}
            />
    
            <MultiSelect
                  placeholder="Цена..."
                  options={prices}
            />
      </div>,
      document.getElementById("root")
);
