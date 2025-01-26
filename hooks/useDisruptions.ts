import axios from "axios";
import { useEffect, useState } from "react";
import { type Disruption } from "../types/disruption";

/**
 * React hook used to retrieve disruptions from the API
 * Returns a tuple containing the list of disruptions and the fetching status
 *
 * TODO: Currently fetches the data retrieved from the relay server, not for the database entity.
 * Will need this to be updated when those have been implemented.
 */
export const useDisruptions = (): [Array<Disruption>, boolean] => {
  const [disruptions, setDisruptions] = useState<Array<Disruption>>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchDisruptions = async () => {
      try {
        setIsFetching(true);
        const { data } = await axios.get<Array<Disruption>>("/api/disruptions");
        setDisruptions(data);
      } catch (error) {
        console.warn(error);
        setDisruptions([]);
      } finally {
        setIsFetching(false);
      }
    };

    void fetchDisruptions();
  }, []);

  return [disruptions, isFetching];
};
