import { CalendarEvent } from "../Types";

type Props = {
  events: CalendarEvent[];
};

function CalendarEventsTable({ events }: Props) {
  return (
    <table data-testid="events-table" className="table-auto w-full">
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th className="text-left">End Date</th>
          <th className="text-left">Frequency</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e, index) => (
          <tr key={e.id} className={index % 2 === 0 ? "bg-gray-200" : ""}>
            <td className="border text-left">{e.name}</td>
            <td className="border text-left">
              {e.recurrence!.endDate !== "0001-01-01" ? e.recurrence!.endDate : "No end date"}
            </td>
            <td className="border text-left">{e.recurrence!.frequency}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CalendarEventsTable;
