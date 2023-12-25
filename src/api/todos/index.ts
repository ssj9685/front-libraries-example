import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const key = "todos";

const url = "/todos";

interface Todo {
  todoId: string;
  title: string;
  completed: boolean;
}

interface CreateDto {
  title: string;
  completed: boolean;
}

interface FindAllTodoDto {
  totalCount: number;
  items: Todo[];
}

const findAll = () => axios.get<FindAllTodoDto[]>(url).then((res) => res.data);
const create = (data: CreateDto) =>
  axios.post(url, data).then((res) => res.data);

const useFindAll = () =>
  useQuery({
    queryKey: [key],
    queryFn: findAll,
    staleTime: Infinity,
  });

const useGet = () => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<FindAllTodoDto>([key]);
};

const useCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
    },
  });
};

export const todoQuery = {
  key,
  url,
  useFindAll,
  useGet,
  useCreate,
};
