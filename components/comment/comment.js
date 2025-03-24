import { useState } from "react";

export default function CommentPopup({ isOpen, onClose }) {
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-[500px]">
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none"
          rows={4}
          placeholder="Escreva aqui o seu comentário..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4 border-t pt-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={() => {
              setComment("");
              onClose();
            }}
          >
            Excluir
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            onClick={() => {
              console.log("Comentário enviado:", comment);
              setComment("");
              onClose();
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
