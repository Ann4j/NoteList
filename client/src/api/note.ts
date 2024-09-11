import { useEffect, useState } from "react";
import { z } from "zod";
import { validateResponse } from "./validateresponse";


/**
 * Интерфейс поста.
 */
// export interface Note {
//     id: string;
//     title: string,
//     text: string,
//     userId: string,
//     createdAt: number
// }

// export type NoteList = Note[];

// function isNote(data: unknown): data is Note {
//     return (
//     typeof data === "object" &&
//     data !== null &&
//     "id" in data &&
//     typeof data.id === "string" &&
//     "title" in data &&
//     typeof data.title === "string" &&
//     "text" in data &&
//     typeof data.text === "string" &&
//     "userId" in data &&
//     typeof data.userId === "string" &&
//     "createdAt" in data &&
//     typeof data.createdAt === "number"
//     )
// }


export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number()
})

export type Note = z.infer<typeof noteSchema>;
export const NoteList = z.array(noteSchema);
export type NoteList = z.infer<typeof NoteList>;

export const fetchNoteListSchema = z.object({
  list: NoteList
});

type fetchNoteListResponse = z.infer<typeof fetchNoteListSchema>;

export function fetchNoteList(): Promise<fetchNoteListResponse> {
  return fetch('api/notes')
    .then((response) => response.json())
    .then((data) => fetchNoteListSchema.parse(data))
}


interface idleRequestState {
  status: 'idle'
};

interface loadingRequestState {
  status: 'pending'
};


interface succesRequestState {
  status: 'success',
  data: NoteList
};

interface errorRequestState {
  status: 'error',
  error: unknown
}

type RequestState = idleRequestState | loadingRequestState | succesRequestState | errorRequestState;

export function useNoteList() {
  const [state, setState] = useState<RequestState>({ status: 'idle' });

  useEffect(() => {
    if (state.status === "pending") {
      fetchNoteList()
        .then((data) => {
          setState({ status: "success", data: data.list })
        })
        .catch((error) => {
          setState({ status: "error", error })
        })
    }
  }, [state]);


  useEffect(() => {
    setState({ status: "pending" })
  }, [])

  const reFetch = () => {
    setState({ status: "pending" })
  }

  return {
    state,
    reFetch
  }
}


export function createNote(data:any):Promise<void> {
  return fetch('api/notes', {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  })
  .then(validateResponse)
  .then(()=> undefined)
}
