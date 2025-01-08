import useAxiosWithInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";
import { useState } from "react";

interface IuseCrud<T> {
  users: T[];
  fetchUserData: () => Promise<void>;
  error: Error | null;
  isLoading: boolean;
}

const userCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
  const jwtAxios = useAxiosWithInterceptor();
  const [users, setUsers] = useState<T[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
      const data = response.data;
      setUsers(data);
      setError(null);
      setIsLoading(false);
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(new Error("400"));
      }
      setIsLoading(false);
      throw error;
    }
  };

  return {
    users,
    fetchUserData,
    error,
    isLoading,
  };
};

export default userCrud;
