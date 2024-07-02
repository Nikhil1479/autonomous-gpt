import { useState } from "react";
import './index.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";

function App() {
    const [messages, setMessages] = useState([{
        message: "Hello I am Autonomous GPT",
        sender: "Chat GPT",
        direction: "incoming"
    }]);

    const [isTyping, setIsTyping] = useState(false);


    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }   

        const newMessages = [...messages, newMessage]

        setMessages(newMessages)
        setIsTyping(true)
        processMessageToChatGPT(messages)
    }
    
    function processMessageToChatGPT(chatMessages) {
        let apiMessage = chatMessages.map((messageObj) => {
            
            let role = "";

            if (messageObj.sender == "Chat GPT") {
                role = "assistant";
            } else {
                role = "user"
            }
            return { role: role, content: messageObj.message }
        });

        // await fetch("https:api.openai.com/v1/chat/completions", {
        //     method: "POST",
             
        // })
        console.log(apiMessage)

    }

    return (
        <div className="App">
            <div style={{position: "relative", height: "600px", width: "500px"}}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={isTyping ? <TypingIndicator content="Autonomous Thinking"/> : null}>
                                {messages.map((message, i) => {
                                    return <Message key={i} model={message}/>
                                })}
                        </MessageList>
                        <MessageInput placeholder="Type your Message" onSend={handleSend}/>
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default App