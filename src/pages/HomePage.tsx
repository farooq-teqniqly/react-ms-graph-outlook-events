import { CalendarEvent } from "../Types";
import CalendarEventsTable from "../components/CalendarEventsTable";

const events: CalendarEvent[] = [
  {
    id: "1234",
    name: "Product Management Office Hours",
    recurrence: {
      endDate: "2024-05-01",
    },
  },
];

function HomePage() {
  return (
    <div>
      <div className="font-xl font-bold pb-10">My Recurring Outlook Events</div>
      <CalendarEventsTable events={events}></CalendarEventsTable>
    </div>
  );
}

export default HomePage;
