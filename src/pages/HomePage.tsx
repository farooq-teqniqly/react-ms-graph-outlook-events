type CalendarEvent = {
  name: string;
  recurrence: {
    endDate: string;
  } | null;
};

const events = [
  {
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
      <table data-testid="events-table" className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, index) => (
            <tr className={index % 2 === 0 ? "bg-gray-200" : ""}>
              <td className="border">{e.name}</td>
              <td className="border">{e.recurrence ? e.recurrence.endDate : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
