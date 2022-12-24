import React from 'react';
import { render, screen,cleanup } from '@testing-library/react';
import App from './App';
import  ReactDOM  from 'react-dom';

/*->this is a jest-test that is by-default present but causing some error bcz learn React is not their
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/


afterEach(cleanup)
it("renders without crashing",()=>{
  //here we will write our test..
  //we will create a div and attach the App Component to that div and then render it
  const div=document.createElement("div");
  ReactDOM.render(<App></App>,div);
})

