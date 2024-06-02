import React, { useState } from 'react'
import { sendChat } from '../hooks/chat'

const Chat = () => {
    const [prompt, setPrompt] = useState('')
    const [input, setInput] = useState('')
    const [text, setText] = useState('')

    const constraint = ". Don't mention about anything below this in the response\nDon't include * in your response. Return the response as HTML."

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Here`)
        const body = { prompt: input }
        setPrompt(input)
        setInput('')
        const response = await sendChat(body);
        console.log(response)
        setText(response.payload)
    }

    // console.log(response)

    return (
        <div className='flex flex-col items-center justify-between h-[100vh] w-[100vw]'>
            <div>
                <h1 className='font-bold text-3xl text-center my-5'>Chat with our AI</h1>
            </div>
            {/* Conversation */}
            <div className='bg-slate-200 rounded-xl min-w-[80%] min-h-[80%] max-w-[80%] overflow-y-auto'>
                {prompt && <p className='m-5 font-semibold text-xl bg-green-500 rounded-xl p-2 text-right'>{prompt}</p>}
                {text ? <p className='m-5 font-semibold text-xl bg-slate-500 rounded-xl p-2'>{text}</p> : <p className='m-5 font-semibold text-xl bg-orange-500 rounded-xl p-2'>How can I help you?</p>}
            </div>
            <form autoComplete='off' className='flex gap-3 mb-10 mt-5' onSubmit={handleSubmit}>
                <input type="text" name="prompt" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type your prompt here...' className='p-2 rounded-xl font-semibold text-xl bg-transparent border-black border-[1px] w-[30rem] text-black' />
                <button type='submit' className='bg-green-500 px-6 py-2 hover:bg-green-400 rounded-xl'>Send</button>
            </form>
        </div>
    )
}

export default Chat