import { useEffect, useRef, useState } from "react";
// import Upload from "../upload/Upload";
import model from "../lib/gemini";
import Markdown from "react-markdown";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
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
        // }, [data, ]);
    }, [question, answer]);

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
        setLoading(true)
        setQuestion(text)
        try {
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: question }],
                    },
                    {
                        role: "model",
                        parts: [{ text: answer }],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 100,
                },
            });
            const result = await chat.sendMessageStream(text);
            let accumulatedText = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                // console.log(chunkText);
                accumulatedText += chunkText;
                setAnswer(accumulatedText);
            }
            setLoading(false)
            // mutation.mutate();
        } catch (err) {
            setErr("Model cannot process your request, please reframe your question and ask again");
            console.log(err)
        }
    }
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
        formRef.current.reset()
    };

    // // IN PRODUCTION WE DON'T NEED IT
    // const hasRun = useRef(false);

    // useEffect(() => {
    //     if (!hasRun.current) {
    //         if (data?.history?.length === 1) {
    //             add(data.history[0].parts[0].text, true);
    //         }
    //     }
    //     hasRun.current = true;
    // }, []);

    return (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', position: 'relative' }}>
            {/* ADD NEW CHAT */}

            {err ? (<p className="text-danger">{err}</p>) : ""}
            <ul className="message-list">
                {question && (
                    <li>
                        <div className="media-content">
                            <div className="right-content card card-body bg-secondary">
                                <h6 className="name text-warning">Me</h6>
                                <div className="text-white">{question}</div>
                            </div>
                        </div>
                    </li>)}

                {answer && (
                    <li>
                        <div className="media-content">
                            <div className='card card-body bg-outline-secondary'>
                                <h6 className="name" style={{ color: 'orange' }}>MimicAI</h6>
                                <div className="last-msg" style={{}}><Markdown>{answer}</Markdown></div>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            {loading ? (<p className="text-secondary">Loading...</p>) : ""}
            <div ref={endRef}></div>
            <div style={{ marginTop: 40, marginBottom: 40 }}></div>
            <div style={{ width: '100%', margin: '0 auto', position: 'absolute', bottom: 50 }}>
                <div className="bg-white input-group input-group-icon input-mini">
                    <form style={{ width: '100%', margin: 15 }} onSubmit={handleSubmit} ref={formRef}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="file">
                                <img src="https://cdn-icons-png.flaticon.com/512/385/385487.png" alt="" style={{ height: 20 }} /></label>
                            {/* <Upload setImg={setImg} /> */}
                            <input id="file" type="file" multiple={false} hidden />
                            <input type="text" className="form-control" name="text" placeholder="Ask anything..." />

                            <button style={{ border: 'none', background: 'none' }} type="submit">
                                {/* <i className="icon text-primary opacity-100 feather icon-pin" /> */}
                                <img src="https://www.freeiconspng.com/thumbs/up-arrow-png/black-up-arrow-png-6.png" alt="" style={{ height: 20 }} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default NewPrompt;