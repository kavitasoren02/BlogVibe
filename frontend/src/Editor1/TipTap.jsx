import "./Tiptap.css";
import { useState, useCallback, useContext, useEffect, useRef } from "react";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import { EditorContext } from "./TiptapContext";
import { toast } from "react-toastify";
import Loader from "../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { _get } from "../Service/ApiService";

import {
  FaBold,
  FaHeading,
  FaItalic,
  FaUndo,
  FaUnderline,
  FaRedo,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaQuoteRight,
  FaStrikethrough,
  FaHighlighter,
  FaLink,
  FaUnlink,
  FaSubscript,
  FaSuperscript,
  FaLevelDownAlt,
  FaCode,
  FaImage,
  FaParagraph,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify,
  FaEraser,
  FaFont,
  FaTrashAlt,
  FaUpload,
  FaTimes,
} from "react-icons/fa";

// import Bold from "@tiptap/extension-bold";
// import Italic from "@tiptap/extension-italic";
// import Strike from "@tiptap/extension-strike";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import Image from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";
import UniqueID from "@tiptap/extension-unique-id";
import TextAlign from "@tiptap/extension-text-align";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";

import { _post, _put } from "../Service/ApiService";
import {
  CREATE_BLOGS,
  GET_ALL_IMAGE,
  UPDATE_BLOGS,
} from "../Service/useApiService";
import { useLocation } from "react-router-dom";
Modal.setAppElement("#root");

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const [showMenu, setShowMenu] = useState(false);
  const [showAlign, setShowAlign] = useState(false);
  const [showFonts, setShowFonts] = useState(false);

  const setHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
    setShowMenu(false);
  };

  const setLink = useCallback(() => {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("URL", prev);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const openFileDialog = () => {
    const src = window.prompt("Enter Image URL");
    // console.log(src);
    if (src !== null || src !== "") {
      editor.chain().focus().setImage({ src }).run();
    } else {
      alert("Please enter image URL");
    }
  };

  const handleClear = () => {
    editor.commands.clearContent();
    setTitle("");
    setIsPublished(null);
  };

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />{" "}
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />{" "}
        </button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <FaParagraph />{" "}
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FaUnderline />
        </button>

        <div className="heading-picker">
          <button
            className="heading-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaHeading className="icon" />
            <span className="caret">▼</span>
          </button>

          {showMenu && (
            <div className="heading-menu">
              <button onClick={() => setHeading(1)}>H1</button>
              <button onClick={() => setHeading(2)}>H2</button>
              <button onClick={() => setHeading(3)}>H3</button>
            </div>
          )}
        </div>

        <div className="heading-picker">
          <button
            className="heading-btn"
            onClick={() => setShowAlign((p) => !p)}
          >
            <FaAlignJustify className="icon" />
            <span className="caret">▼</span>
          </button>

          {showAlign && (
            <div className="heading-menu">
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                <FaAlignLeft />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                <FaAlignCenter />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                <FaAlignRight />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
              >
                <FaAlignJustify />
              </button>
              <button
                onClick={() => editor.chain().focus().unsetTextAlign().run()}
              >
                <FaEraser />
              </button>
            </div>
          )}
        </div>

        <div className="heading-picker">
          <button
            className="heading-btn"
            onClick={() => setShowFonts((p) => !p)}
          >
            <FaFont />
            <span className="caret">▼</span>
          </button>

          {showFonts && (
            <div className="heading-menu">
              {[
                { label: "Inter", value: "Inter" },
                { label: "Comic Sans", value: '"Comic Sans MS", "Comic Sans"' },
                { label: "Serif", value: "serif" },
                { label: "Monospace", value: "monospace" },
                { label: "Cursive", value: "cursive" },
                { label: "Exo 2", value: '"Exo 2"' },
                {
                  label: "Times New Roman",
                  value: '"Times New Roman", Times, serif',
                },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => {
                    editor.chain().focus().setFontFamily(f.value).run();
                    setShowFonts(false);
                  }}
                  style={{ fontFamily: f.value }}
                >
                  {f.label}
                </button>
              ))}

              <button
                onClick={() => {
                  editor.chain().focus().unsetFontFamily().run();
                  setShowFonts(false);
                }}
              >
                <FaEraser className="mr-2" />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive("highlight") ? "is-active" : ""}
        >
          <FaHighlighter />
        </button>

        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          <FaLink />
        </button>

        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          <FaUnlink />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={editor.isActive("subscript") ? "is-active" : ""}
        >
          <FaSubscript />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={editor.isActive("superscript") ? "is-active" : ""}
        >
          <FaSuperscript />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <FaQuoteLeft />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <FaQuoteRight />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaListUl />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>

        <button
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}
        >
          <FaLevelDownAlt />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <FaCode />
        </button>

        <button onClick={openFileDialog}>
          <FaImage />
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <FaRedo />
        </button>

        <button
          className="bg-red-600 text-white h-15 w-25 mt-7 ml-4 mb-5 rounded-lg"
          onClick={handleClear}
        >
          <FaTrashAlt className="inline-block ml-1" />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  StarterKit,
  //   Bold,
  //   Italic,
  //   Strike,
  Underline,
  Highlight,
  Subscript,
  Superscript,
  Blockquote,
  BulletList,
  ListItem,
  Paragraph,
  Image,
  ImageResize,
  Typography,
  Text,
  FontFamily,
  TextStyle.configure({ mergeNestedSpanStyles: true }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  UniqueID.configure({
    types: ["heading", "paragraph"],
  }),
  Emoji.configure({
    emojis: gitHubEmojis,
    enableEmoticons: true,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],

    validate: (href) => {
      try {
        const url = new URL(href.includes(":") ? href : `https://${href}`);

        // disallowed protocols
        const badProtocols = ["ftp", "file", "mailto"];
        if (badProtocols.includes(url.protocol.replace(":", ""))) return false;

        // disallowed domains
        const badDomains = ["example-phishing.com", "malicious-site.net"];
        if (badDomains.includes(url.hostname)) return false;

        return true;
      } catch {
        return false;
      }
    },
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Placeholder.configure({
    placeholder: "Type here...",
    showOnlyWhenEditable: true,
    showOnlyCurrent: false,
  }),
];

export default function TipTapEditor() {
  const { state } = useLocation();
  const isEditing = Boolean(state?.blog);
  const navigate = useNavigate();
  const {
    title,
    setTitle,
    content,
    setContent,
    isPublished,
    setIsPublished,
    description,
    setDescription,
    images,
    setImages,
  } = useContext(EditorContext);

  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(!isEditing);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageData, setImageData] = useState([]);

  const subtitleRef = useRef(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "200px",
      transform: "translate(-50%, -50%)",
      border: "2px dashed #3b82f6",
      backgroundColor: "#ffffff",
      width: "800px",
      height: "500px",
      marginLeft: "100px",
      textAlign: "center",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isEditing) {
      const b = state.blog;
      setTitle(b.title);
      setDescription(b.description);
      setContent(b.content);
      setIsPublished(b.isPublished);
      setImages(b.images);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await _put(UPDATE_BLOGS(state.blog._id), {
          title,
          content,
          description,
          isPublished,
          images,
        });
        toast.success("Blog updated");
      } else {
        await _post(CREATE_BLOGS, {
          title,
          content,
          description,
          isPublished,
          images,
        });
        toast.success("Blog created");
      }
      navigate("/posts");
    } catch (err) {
      console.error(err);
      toast.error("Could not create blog.");
    } finally {
      setLoading(false);
    }
  };

  const getAllImage = async () => {
    try {
      const { data } = await _get(GET_ALL_IMAGE);
      setImageData(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllImage();
  }, []);

  const onClickImageHandler = async (url) => {
    if (url) {
      setImages(url);
    }
  };

  const removeImage = async (e) => {
    e.stopPropagation();
    setImages("");
  }

  if (!ready) return <Loader />;

  return (
    <div className="editor-wrapper">
      {loading && <Loader />}

      <h1 className="text-4xl m-5">Add New Post</h1>
      <input
        className="title-input mb- "
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => {
          setDescription(editor.getText() || "Default description");
          setContent(editor.getHTML());
        }}
        editorProps={{ attributes: { class: "tiptap" } }}
      />

      <label className="publish-toggle ml-8 mt-4 flex items-center gap-2 text-xl ">
        <span>Status</span>

        <select
          className="border rounded px-2 py-1 cursor-pointer"
          value={isPublished}
          onChange={(e) => {
            const v = e.target.value;
            setIsPublished(v);
          }}
        >
          <option value="" disabled>
            Select an Option
          </option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>

      <div
        className="ml-8 mt-6 h-28 w-63 border border-dashed border-gray-400 bg-white flex flex-col items-center justify-center text-gray-500 text-sm cursor-pointer"
        onClick={openModal}
      >
        {images ? (
          <div className="relative h-full w-full">
            <FaTimes 
            onClick={removeImage}
            className="cursor-pointer absolute top-2 right-2 text-white" />
            <img className="h-full w-full" src={images} />
          </div>
        ) : (
          <div className="flex flex-col items-center ">
            <FaUpload name="upload" className="text-xl mb-2 text-blue-500" />
            Upload Thumbnail
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
          onClick={closeModal}
        >
          <FaTimes className="cursor-pointer" />
        </button>
        <div className="grid grid-cols-3 gap-4 mt-10 overflow-y-auto h-[380px] px-4">
          {imageData.length > 0 ? (
            imageData.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Uploaded ${index}`}
                className="w-full h-40 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onClickImageHandler(img.url)}
              />
            ))
          ) : (
            <p>No images found.</p>
          )}
        </div>

        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => {
              closeModal();
            }}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          >
            OK
          </button>
        </div>
      </Modal>

      <button
        className="bg-blue-700 h-15 w-25 mt-7 ml-10 mb-5 rounded-lg cursor-pointer"
        onClick={handleSave}
      >
        {loading ? "Saving…" : "Save"}
      </button>
    </div>
  );
}
