export type CalendarEvent = {
  id: string;
  name: string;
  recurrence: {
    endDate: string;
  } | null;
};
