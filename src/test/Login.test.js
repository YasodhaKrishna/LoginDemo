import ShallowRenderer from "react-test-renderer/shallow";

import React from "react";
import { shallow, mount } from "enzyme";
import Login from "../Login";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

const mockStore = configureStore([]);

// in your test:
describe("Login component tests", () => {
  let wrapper;
  let store;
    beforeEach(() => {
      store = mockStore({
        isLoginCredValid: false,
      });
      store.dispatch = jest.fn();
      wrapper = renderer.create(
        <Provider store={store}>
          <Login />
        </Provider>
      );
    });

  it("should have a btn component", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Login />);
    const result = renderer.getRenderOutput();

    console.log(result);
    wrapper = shallow(<Login />).dive();

    wrapper.find('input[type="email"]').simulate("change", {
      target: { name: "username", value: "admin@gmail.com" },
    });
    expect(wrapper.state("username")).toEqual("admin@gmail.com");
  });

  it('should have input for email and password', ()=> {
      //Email and password input field should be present
      expect(wrapper.find('input#email')).toHaveLength(1);
      expect(wrapper.find('input#password')).toHaveLength(1);
  });

  it('should an avatar', ()=> {
      //Avatar should be present
      expect(wrapper.find('.avatar')).toHaveLength(1);
  });

  it('should have an empty email and password state var', ()=> {
      // Optionally test to check if password and email are empty strings on
        //  setup
      expect(wrapper.state('email')).toEqual('');
      expect(wrapper.state('password')).toEqual('');
  });

  it('should test email and password presence', () => {

       //should return true
       expect(validateEmailAndPasswordPresence('email@email.com','password').toEqual(true));

       //should return false
        expect(validateEmailAndPasswordPresence('','').toEqual(false));
  });
});
