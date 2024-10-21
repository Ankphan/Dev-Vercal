import React, { useState, useRef, useEffect } from 'react';
import { Box, VStack, Flex, Text, Button, Input, IconButton, Image } from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import '@/styles/LoadingDots.css'; // Import CSS for the animated dots

function ChatBot() {
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi, how can I help you?' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [showPreDefinedQuestions, setShowPreDefinedQuestions] = useState(true); // State to control showing questions
    const messagesEndRef = useRef(null); // Ref to scroll to the bottom of the chat

    const preDefinedQuestions = [
        'Why was this meeting scheduled?',
        'What would help make progress?',
        'What challenges do you foresee?',
        'Describe the key stakeholders?'
    ];

    const handleSend = (text) => {
        if (text) {
            setMessages([...messages, { type: 'user', text }]);
            setShowPreDefinedQuestions(false); // Hide questions after sending a message
            setUserInput('');
            setLoading(true); // Set loading to true when waiting for bot response

            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: `You asked: "${text}". Let me look into that.12312313123131312313` }]);
                setLoading(false);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend(userInput);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Box w="100%" bg="gray.50" p={4} borderRadius="md">
            <VStack align="start" spacing={4}>
                <Box
                    w="100%"
                    h="300px"  // Set height for the chat area
                    overflowY="auto"
                    bg="gray.50"
                    p={4}
                    borderRadius="md"
                >
                    {messages.map((msg, index) => (
                        <Flex
                            key={index}
                            justify={msg.type === 'bot' ? 'flex-start' : 'flex-end'}
                            w="100%"
                            mb={4} // Ensure space between messages
                        >
                            {msg.type === 'bot' && (
                                <Image
                                    boxSize="30px"
                                    borderRadius="full"
                                    src="/theme/home_page/Beta_Logo.png"
                                    alt="Bot Logo"
                                    mr={2}
                                />
                            )}

                            <Box
                                bg={msg.type === 'bot' ? 'blue.100' : 'green.100'}
                                p={2}
                                borderRadius="md"
                                maxW="80%"
                                wordWrap="break-word"
                            >
                                <Text fontWeight="semibold">{msg.text}</Text>
                            </Box>
                        </Flex>
                    ))}

                    {loading && (
                        <Flex justify="flex-start" w="100%" mb={4}>
                            <Image
                                boxSize="30px"
                                borderRadius="full"
                                src="/theme/home_page/Beta_Logo.png"
                                alt="Bot Logo"
                                mr={2}
                            />
                            <Box className="loading-dots" bg="blue.100" p={2} borderRadius="md">
                                <span>.</span><span>.</span><span>.</span>
                            </Box>
                        </Flex>
                    )}

                    <div ref={messagesEndRef} />
                </Box>

                <VStack align="start" w="100%">
                    {!showPreDefinedQuestions ? null : (
                        <>
                            <Text mb={2} fontWeight="semibold">Ask a question or pick one of these:</Text>
                            <Flex wrap="wrap" gap={2}>
                                {preDefinedQuestions.map((question, index) => (
                                    <Button key={index} variant="outline" onClick={() => handleSend(question)} border="1px solid">
                                        {question}
                                    </Button>
                                ))}
                            </Flex>
                        </>
                    )}

                    <Flex w="100%" mt={4}>
                        <Input
                            placeholder="Ask Beta AI"

                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={handleKeyPress} // Add key press handler for "Enter"
                        />
                        <IconButton
                            aria-label="Send"
                            icon={<FiSend />}
                            onClick={() => handleSend(userInput)}
                            ml={2}
                            isDisabled={loading}
                        />
                    </Flex>
                </VStack>
            </VStack>
        </Box>
    );
}

export default ChatBot;
