import prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import './App.css'
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import axios from "axios"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  
  const [code,setCode] = useState(` function sum(){
                return 1 + 1
                }`)
  
  const [review,setReview] = useState(``)
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    prism.highlightAll()
  },[])

   async function reviewCode(){
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/ai/get-review`, {code})
    setReview(response.data)
    } catch (error) {
      setReview("Error fetching review. Please try again.",error);
    }
    setLoading(false);
    
  }

  return (
    <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code=> prism.highlight(code, prism.languages.javascript, "javascript")}
          padding={10}
          style={{
            height: "100%",
            width: "100%",
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            border: "1px solid #ddd",
            borderRadius: "5px"
          }}
          >

          </Editor>
        </div>
        <button onClick={reviewCode} className="review glow-on-hover">Review</button>
      </div>
      <div className="right">
        {
          loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Markdown
        rehypePlugins={[rehypeHighlight]}
        >{review}</Markdown>
          )
        }
      </div>
    </main>
    </>
  )
}

export default App
