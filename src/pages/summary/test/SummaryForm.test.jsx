import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

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
  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  //unchecking checkbox again disables button
  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

//we replaced fireEvent clicks with userEvents because it most closely resembles how user
//will interact

//popover test
test("popover responds to hover", async () => {
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  //popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  //although technically this line is not needed as above line will throw if it can't
  //popover, it's best practice to include below line anyway as it makes test more readable:
  expect(popover).toBeInTheDocument();

  //popover diappears when we mouse out
  userEvent.unhover(termsAndConditions);

  //popover disappearing asynchranously after test function complete
  //solved problems by making our assertion async & adding waitForElementToBeRemoved
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
