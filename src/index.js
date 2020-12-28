import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NameForm from './NameForm';
import Clock from './Clock';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <div>
      <NameForm></NameForm>
  </div>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <div>
//       <Progress val="10"/>

//     </div>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
