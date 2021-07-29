import { render, screen } from "@testing-library/react";

import Options from "../Options";

//we'll test that it displays an image for each of the options that we return from server
//in this case it's returning from Mock service worker
//When you are waiting for something to appear async on the page, you must use await findBy

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  //using RegEx, $ means scoop is at the end of string, i means case insensitive
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

//same test as above but with toppings route
test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
