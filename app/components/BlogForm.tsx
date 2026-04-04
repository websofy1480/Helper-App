"use client"
import { useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(
    () => import("jodit-react"),
    { ssr: false }
);

const Editor = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");


    const placeholder = 'Start typings...'

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Blog here...'
    }),
        [placeholder]
    );


    const submitBlog = async () => {
        await fetch("/api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });
    };

    return (
        <>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={newContent => setContent(newContent)}
                onChange={newContent => { }}
                className="m-20"
            />
            <button onClick={submitBlog}>Save</button>
        </>
    );
};

export default Editor;
