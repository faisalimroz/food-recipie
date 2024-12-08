import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/task";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    tasks: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.task],
    }),

    task: build.query({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.task]
    }),

    addTask: build.mutation({
        query: (data) => ({
          url : `${URL}/create`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.task]
      }),

    updateTask: build.mutation({
      query: (data) => ({
        url : `${URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.task]
    }),

    
    deleteTask: build.mutation({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.task]
    }),

  }),
});

export const { useTasksQuery,useTaskQuery,useAddTaskMutation,useUpdateTaskMutation,useDeleteTaskMutation, } = taskApi;