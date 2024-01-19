import { CalendarEvent, MicrosoftGraphCalendarEvent } from "../Types";
import CalendarEventsTable from "../components/CalendarEventsTable";
import { useCalendarEvents } from "../hooks/useCalendarEvents";

// @ts-ignore
import composeHooks from "react-hooks-compose";

const HomePage = ({ data, isLoading, isError, url }: any) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred</div>;

  const events: CalendarEvent[] = data.value.map((event: MicrosoftGraphCalendarEvent) => ({
    id: event.id,
    name: event.subject,
    recurrence: event.recurrence
      ? {
          endDate: event.recurrence.range.endDate,
          frequency: event.recurrence.pattern.type,
        }
      : null,
  }));

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
