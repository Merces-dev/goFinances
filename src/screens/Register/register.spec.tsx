import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Register } from ".";
import { Providers } from "../../utils/tests";
describe("Register Screen", () => {
  it("should open category modal when user click on the category button.", () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });
    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");
    
    expect(categoryModal.props.visible).not.toBeTruthy();
    expect(buttonCategory).toBeTruthy();
    
    fireEvent.press(buttonCategory);

    expect(categoryModal.props.visible).toBeTruthy();
  });
});
