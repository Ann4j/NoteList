import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { NoteList } from "../../api/note";
import { FC } from "react";

export interface NoteListViewProps {
  noteList: NoteList
}

export const NotesListView: FC<NoteListViewProps> = ({ noteList }) => {
  return (
    <ul className="note-list-view">
      {noteList.map((note) => ( 
        <li>
          <NoteView note={note} />
        </li>
      ))}
    </ul>
  );
};
