import { render, screen, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./HomePage";
import { useCalendarEvents } from "../hooks/useCalendarEvents";

jest.mock("../hooks/useCalendarEvents");

describe("Outlook Events App", () => {
  const queryClient = new QueryClient();

  it("Renders the header", () => {
    (useCalendarEvents as jest.Mock).mockReturnValue({
      data: {
        value: [],
      },
      isLoading: false,
      isError: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <HomePage url="test-url" />
      </QueryClientProvider>,
    );
    const header = screen.getByText("My Recurring Outlook Events");
    expect(header).toBeInTheDocument();
  });

  it("Renders the event", () => {
    const mockData = {
      value: [
        {
          id: "event-id",
          subject: "Product Management Office Hours",
          recurrence: {
            range: {
              endDate: "2024-05-01",
            },
            pattern: {
              type: "weekly",
            },
          },
        },
      ],
    };

    (useCalendarEvents as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <HomePage url="test-url" />
      </QueryClientProvider>,
    );
    const eventsTable = screen.getByTestId("events-table");

    const eventName = within(eventsTable).getByText("Product Management Office Hours");
    expect(eventName).toBeInTheDocument();

    const recurrenceEndDate = within(eventsTable).getByText("2024-05-01");
    expect(recurrenceEndDate).toBeInTheDocument();

    const frequency = within(eventsTable).getByText("weekly");
    expect(frequency).toBeInTheDocument();
  });
});
