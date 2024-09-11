import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../../api/user"
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { NoteForm } from "../NoteForm";
import { FetchNoteListView } from "../NotesListView/fetchNoteListView";
import { LogoutButton } from "../LogoutButton";
import { UserView } from "../UserView";
import { queryClient } from "../../api/queriClient";


export const Account = () => {
  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: false
  },queryClient)


  switch (meQuery.status) {
    case "pending":
      return <Loader />;

    case "error":
      return <AuthForm />

    case "success":
      return <>
          <UserView user={meQuery.data}/>
          <NoteForm />
        <FetchNoteListView />
        <LogoutButton />
      </>
  }
}
