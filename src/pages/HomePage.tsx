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
      <div>My Recurring Outlook Events</div>
      <table data-testid="events-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr>
              <td>{e.name}</td>
              <td>{e.recurrence ? e.recurrence.endDate : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
