export type CalendarEvent = {
  name: string;
  recurrence: {
    endDate: string;
  } | null;
};
