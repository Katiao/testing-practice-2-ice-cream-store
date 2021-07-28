import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);

  //by default, checkbox unchecked and button disabled:
  const checkbox = screen.getByRole("checkbox", {
    //RegEx : terms and conditions with any capitalization:
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

//2nd test interacts with checkbox:
test("Checkbox enables button on first click and disables on second click", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  //checking checkbox enables button
  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  //unchecking checkbox again disables button
  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
