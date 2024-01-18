import { CalendarEvent } from "../Types";

type Props = {
  events: CalendarEvent[];
};

function CalendarEventsTable({ events }: Props) {
  return (
    <table data-testid="events-table" className="table-auto w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e, index) => (
          <tr key={e.id} className={index % 2 === 0 ? "bg-gray-200" : ""}>
            <td className="border">{e.name}</td>
            <td className="border">{e.recurrence ? e.recurrence.endDate : "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CalendarEventsTable;
