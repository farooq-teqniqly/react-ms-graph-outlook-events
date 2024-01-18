import { render, screen, within } from "@testing-library/react";
import HomePage from "./HomePage";

describe("Outlook Events App", () => {
  it("Renders the header", () => {
    render(<HomePage></HomePage>);
    const header = screen.getByText("My Recurring Outlook Events");
    expect(header).toBeInTheDocument();
  });

  it("Renders the event", () => {
    render(<HomePage></HomePage>);
    const eventsTable = screen.getByTestId("events-table");

    const eventName = within(eventsTable).getByText("Product Management Office Hours");
    expect(eventName).toBeInTheDocument();

    const recurrenceEndDate = within(eventsTable).getByText("2024-05-01");
    expect(recurrenceEndDate).toBeInTheDocument();
  });
});
