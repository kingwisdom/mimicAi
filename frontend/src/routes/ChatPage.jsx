import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import model from "../lib/gemini";
import Markdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./twick.css";

const ChatPage = () => {
  const location = useLocation();
  const { data } = location.state;

  const [question, setQuestion] = useState(data);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [textToCopy, setTextToCopy] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
  const [solutionList, setSolutionList] = useState([]);
  const [err, setErr] = useState("");
  // const [img, setImg] = useState({
  //     isLoading: false,
  //     error: "",
  //     dbData: {},
  //     aiData: {},
  // });

  // const chat = model.startChat({
  //     history: [
  //         data?.history.map(({ role, parts }) => ({
  //             role,
  //             parts: [{ text: parts[0].text }],
  //         })),
  //     ],
  //     generationConfig: {
  //         // maxOutputTokens: 100,
  //     },
  // });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer]);

  useEffect(() => {
    add(data);
  }, []);

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //     mutationFn: () => {
  //         return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
  //             method: "PUT",
  //             credentials: "include",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //                 question: question.length ? question : undefined,
  //                 answer,
  //                 img: img.dbData?.filePath || undefined,
  //             }),
  //         }).then((res) => res.json());
  //     },
  //     onSuccess: () => {
  //         queryClient
  //             .invalidateQueries({ queryKey: ["chat", data._id] })
  //             .then(() => {
  //                 formRef.current.reset();
  //                 setQuestion("");
  //                 setAnswer("");
  //                 setImg({
  //                     isLoading: false,
  //                     error: "",
  //                     dbData: {},
  //                     aiData: {},
  //                 });
  //             });
  //     },
  //     onError: (err) => {
  //         console.log(err);
  //     },
  // });
  const add = async (text) => {
    setLoading(true);
    setQuestion(text);

    let obj = {};
    let currentQuestion = text; // Use local variable to avoid closure issues

    try {
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: currentQuestion }],
          },
          {
            role: "model",
            parts: [{ text: answer }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const result = await chat.sendMessageStream(currentQuestion);
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
        obj.answer = accumulatedText;
      }

      obj.question = currentQuestion;

      setSolutionList((prevSolutionList) => {
        // Check if the object already exists to avoid duplicates
        if (!prevSolutionList.some((item) => item.question === obj.question)) {
          return [...prevSolutionList, obj];
        }
        return prevSolutionList;
      });

      setLoading(false);
    } catch (err) {
      setErr(
        "Model cannot process your request, please reframe your question and ask again"
      );
      console.log(err);
    }
  };

  // const add = async (text, isInitial) => {
  //     if (!isInitial) setQuestion(text);

  //     try {
  //         const result = await chat.sendMessageStream(
  //             Object.entries(img.aiData).length ? [img.aiData, text] : [text]
  //         );
  //         let accumulatedText = "";
  //         for await (const chunk of result.stream) {
  //             const chunkText = chunk.text();
  //             console.log(chunkText);
  //             accumulatedText += chunkText;
  //             setAnswer(accumulatedText);
  //         }

  //         mutation.mutate();
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    add(text);
    formRef.current.reset();
  };

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };
  return (
    <>
      <div className="page-content p-b50">
        <div className="container">
          <div className="title-bar">
            <h6 className="title"></h6>
          </div>

          {err ? <p className="text-danger">{err}</p> : ""}
          <ul className="message-list">
            {/* {question && ( */}
            {solutionList?.map((item, i) => (
              <div key={i}>
                <li>
                  <div className="media-content">
                    <div className="right-content card card-body bg-secondary">
                      <h6 className="name text-warning">Me</h6>
                      <div className="text-white">{item?.question}</div>
                    </div>
                  </div>
                </li>
                {/* )} */}

                <li>
                  <div className="media-content">
                    <div className="card card-body bg-outline-secondary">
                      <h6 className="name" style={{ color: "orange" }}>
                        MimicAI
                      </h6>
                      <div className="last-msg">
                        <div className="markdown-container">
                          <Markdown>{item?.answer}</Markdown>
                        </div>
                      </div>
                      <div className="d-flex">
                        <CopyToClipboard
                          text={item?.answer}
                          onCopy={onCopyText}
                        >
                          <i
                            className="fa fa-copy"
                            style={{ fontSize: 24, cursor: "pointer" }}
                          ></i>
                        </CopyToClipboard>
                        <p
                          style={{ cursor: "pointer" }}
                          className="mx-4 text-danger"
                          onClick={() => add(item?.answer)}
                        >
                          Regenerate
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
          {copyStatus && (
            <p className="alert alert-secondary">Text copied to clipboard!</p>
          )}
          {/* <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, width: '80%', margin: '0 auto', height: 'auto' }}> */}
          {loading ? <p className="text-secondary">Loading...</p> : ""}
          <div ref={endRef}></div>
          <div style={{ marginTop: 40, marginBottom: 40 }}></div>
          <div style={{ width: "100%" }}>
            <div className="bg-white input-group input-group-icon input-mini">
              <form
                style={{ width: "80%", margin: 15 }}
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label htmlFor="file">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/385/385487.png"
                      alt=""
                      style={{ height: 20 }}
                    />
                  </label>
                  {/* <Upload setImg={setImg} /> */}
                  <input id="file" type="file" multiple={false} hidden />
                  <textarea
                    className="form-control"
                    name="text"
                    placeholder="Ask anything..."
                  />

                  <button
                    style={{ border: "none", background: "none" }}
                    type="submit"
                  >
                    {/* <i className="icon text-primary opacity-100 feather icon-pin" /> */}
                    <img
                      src="https://www.freeiconspng.com/thumbs/up-arrow-png/black-up-arrow-png-6.png"
                      alt=""
                      style={{ height: 20 }}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <NewPrompt /> */}
      <a href="/dashboard" className="btn btn-sm">
        Home
      </a>
    </>
  );
};

export default ChatPage;
