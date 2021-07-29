import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

//test that when we get an error response for scoop and toppings routes, we get two
//alert banners
test("handles errors for scoops and toppings routes", async () => {
  //reset handlers with error
  server.resetHandlers(
    rest.get("http//localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http//localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  //render order entry
  render(<OrderEntry />);

  //find alerts
  //choose which query to use: get because we expect it to be there right away?
  //query because we expect it not to be there right away?
  //or is it a find because we expect it to be there async?
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

//waitFor method: wait until we have two alerts. Otherwise test will find one alert and
//stop
//issue was that it was not waiting for both server calls to return. Waitfor method becuase FindBy was not enough
//findby would succeed when first server call returned, we needed to wait for both of them.
//most of the time findby is enough but there are cases where it is not.
