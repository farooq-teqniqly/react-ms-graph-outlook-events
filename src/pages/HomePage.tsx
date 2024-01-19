import { CalendarEvent, MicrosoftGraphCalendarEvent } from "../Types";
import CalendarEventsTable from "../components/CalendarEventsTable";
import { useCalendarEvents } from "../hooks/useCalendarEvents";

// @ts-ignore
import composeHooks from "react-hooks-compose";

const convertCalendarEvents = (event: MicrosoftGraphCalendarEvent): CalendarEvent => {
  let frequency = event.recurrence!.pattern.type;

  if (frequency === "absoluteYearly") {
    frequency = "Yearly";
  } else if (frequency === "relativeMonthly") {
    frequency = "Monthly";
  } else {
    frequency = frequency.charAt(0).toUpperCase() + frequency.slice(1);
  }

  return {
    id: event.id,
    name: event.subject,
    recurrence: event.recurrence
      ? {
          endDate:
            event.recurrence.range.endDate === "0001-01-01"
              ? "No end date"
              : event.recurrence.range.endDate,
          frequency: frequency,
        }
      : null,
  };
};

const HomePage = ({ data, isLoading, isError, url }: any) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred</div>;

  const events: CalendarEvent[] = data.value.map(convertCalendarEvents);
  events.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <div className="font-xl font-bold pb-10">My Recurring Outlook Events</div>
      <CalendarEventsTable events={events}></CalendarEventsTable>
    </div>
  );
};

const HomePageContainer = composeHooks((props: any) => ({
  useCalendarEvents: () => useCalendarEvents(props.url),
}))(HomePage);

export default HomePageContainer;
