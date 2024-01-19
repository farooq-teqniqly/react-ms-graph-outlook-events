import { useQuery } from "react-query";
import axios from "axios";
import { MicrosoftGraphCalendarEvent } from "../Types";

const fetchEvents = async (url: string) => {
  let response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
    },
  });

  let data = response.data;

  while (data["@odata.nextLink"]) {
    response = await axios.get(data["@odata.nextLink"], {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
      },
    });
    data = { ...data, value: [...data.value, ...response.data.value] };
  }

  data.value = data.value.filter(
    (item: MicrosoftGraphCalendarEvent) =>
      item.recurrence !== null &&
      (new Date(item.recurrence.range.endDate) > new Date("2024-01-01T00:00:00Z") ||
        item.recurrence.range.type === "noEnd"),
  );

  return data;
};

export const useCalendarEvents = (url: string) => {
  const queryInfo = useQuery("events", () => fetchEvents(url), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return {
    ...queryInfo,
    isLoading: queryInfo.status === "loading",
    isError: queryInfo.status === "error",
  };
};
