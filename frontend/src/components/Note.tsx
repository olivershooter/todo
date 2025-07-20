import { MdDelete } from "react-icons/md";
import { NoteProp } from "../types/notes";

export const Note = ({
  note,
  onDelete,
}: {
  note: NoteProp;
  onDelete: (id: number) => void;
}) => {
  const formattedDate = new Date().toLocaleDateString("en-GB");

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 group relative overflow-hidden">
      <div className="absolute top-3 right-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <button
          className="btn btn-square btn-error btn-sm"
          onClick={() => onDelete(note.id)}
        >
          <MdDelete className="text-white" />
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-title text-base-content mb-2 break-words">
          {note.title}
        </h3>

        <div className="divider mb-1 mt-0"></div>

        <p className="text-base-content whitespace-pre-line break-words">
          {note.content}
        </p>

        <div className="text-xs text-base-content/50 mt-4">
          <div className="badge badge-outline">{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};
