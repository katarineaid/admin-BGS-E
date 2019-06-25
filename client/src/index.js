import React from "react";
import { render } from 'react-dom';
import App from "./common/components/App";
import configureStore from './common/store/configureStore';

const store = configureStore();

render(
  <App store={store}/>,
  document.getElementById("root")
);
