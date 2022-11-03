import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";
import { Comment } from "../models/Comment";

const CommentsForm: React.FC<{ slug: string }> = ({ slug }) => {
  const [error, setError] = useState<boolean>(false);
  const [localStorage, setLocalStorage] = useState<Storage | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalStorage(window.localStorage);
    nameEl.current!.value = window.localStorage.getItem("name") as string;
    emailEl.current!.value = window.localStorage.getItem("email") as string;
  }, []);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current as HTMLTextAreaElement;
    const { value: name } = nameEl.current as HTMLInputElement;
    const { value: email } = emailEl.current as HTMLInputElement;
    const { checked: storeData } = storeDataEl.current as HTMLInputElement;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj: Comment = { comment, name, email, slug };

    if (storeData) {
      localStorage!.setItem("name", name);
      localStorage!.setItem("email", email);
    } else {
      localStorage!.removeItem("name");
      localStorage!.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          name="comment"
          placeholder="comment"
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          name="name"
          placeholder="name"
          type="text"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save my Email, Name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are mandatory.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment Submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
