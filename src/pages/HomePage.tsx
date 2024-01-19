import { CalendarEvent, MicrosoftGraphCalendarEvent } from "../Types";
import CalendarEventsTable from "../components/CalendarEventsTable";
import { useCalendarEvents } from "../hooks/useCalendarEvents";

function HomePage() {
  const { data, isLoading, isError } = useCalendarEvents(
    "https://graph.microsoft.com/v1.0/me/events?$filter=type eq 'seriesMaster'&select=id,recurrence,subject&top=1000",
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred</div>;

  const events: CalendarEvent[] = data.value.map((event: MicrosoftGraphCalendarEvent) => ({
    id: event.id,
    name: event.subject,
    recurrence: event.recurrence
      ? {
          endDate: event.recurrence.range.endDate,
        }
      : null,
  }));

  return (
    <div>
      <div className="font-xl font-bold pb-10">My Recurring Outlook Events</div>
      <CalendarEventsTable events={events}></CalendarEventsTable>
    </div>
  );
}

export default HomePage;
