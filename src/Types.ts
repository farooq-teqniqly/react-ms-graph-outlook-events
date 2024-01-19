export type MicrosoftGraphCalendarEvent = {
  "@odata.etag": string;
  id: string;
  subject: string;
  recurrence: {
    pattern: {
      type: string;
      interval: number;
      month: number;
      dayOfMonth: number;
      daysOfWeek: string[];
      firstDayOfWeek: string;
      index: string;
    };
    range: {
      type: string;
      startDate: string;
      endDate: string;
      recurrenceTimeZone: string;
      numberOfOccurrences: number;
    };
  } | null;
};

export type CalendarEvent = {
  id: string;
  name: string;
  recurrence: {
    endDate: string;
  } | null;
};
