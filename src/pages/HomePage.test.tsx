import { render, screen, within, cleanup } from "@testing-library/react";
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
  });

  it("Renders 'No end date' for events with no end date", () => {
    const mockData = {
      value: [
        {
          id: "event-id",
          subject: "Product Management Office Hours",
          recurrence: {
            range: {
              endDate: "0001-01-01",
            },
            pattern: {
              type: "weekly",
            },
          },
        },
      ],
    };

    render(<HomePage data={mockData} isLoading={false} isError={false}></HomePage>);

    const eventsTable = screen.getByTestId("events-table");
    const recurrenceEndDate = within(eventsTable).getByText("No end date");
    expect(recurrenceEndDate).toBeInTheDocument();
  });

  it("Renders better text for event frequency", () => {
    const graphFrequencyToAppFrequencyMap = [
      {
        from: "absoluteYearly",
        to: "Yearly",
      },
      {
        from: "relativeMonthly",
        to: "Monthly",
      },
      {
        from: "weekly",
        to: "Weekly",
      },
      {
        from: "monthly",
        to: "Monthly",
      },
    ];

    graphFrequencyToAppFrequencyMap.forEach((item) => {
      const mockData = {
        value: [
          {
            id: "event-id",
            subject: "Product Management Office Hours",
            recurrence: {
              range: {
                endDate: "0001-01-01",
              },
              pattern: {
                type: item.from,
              },
            },
          },
        ],
      };

      render(<HomePage data={mockData} isLoading={false} isError={false}></HomePage>);

      const eventsTable = screen.getByTestId("events-table");
      const frequency = within(eventsTable).getByText(item.to);
      expect(frequency).toBeInTheDocument();

      cleanup();
    });
  });
});
