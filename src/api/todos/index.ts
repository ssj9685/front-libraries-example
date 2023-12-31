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
    async onMutate(newTodo) {
      await queryClient.cancelQueries({ queryKey: [key] });
      const previousTodos = queryClient.getQueryData([key]);
      queryClient.setQueryData([key], (old: FindAllTodoDto) => ({
        items: [...old.items, newTodo],
        totalCount: old.totalCount,
      }));

      return {
        rollback: () => {
          queryClient.setQueryData([key], previousTodos);
        },
      };
    },
    onError(err, newTodo, context) {
      context?.rollback();
    },
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
