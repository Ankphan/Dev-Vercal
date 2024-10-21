import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack, Button, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { FiCopy, FiMenu, FiChevronDown } from 'react-icons/fi';

function VideoSummary({ videoId }) {
    const [transcript, setTranscript] = useState("");
    const [summary, setSummary] = useState([]);
    const toast = useToast();

    useEffect(() => {
        // Placeholder for transcript fetching
        fetchTranscript(videoId);
    }, [videoId]);

    const fetchTranscript = async (videoId) => {
        // Replace with actual transcript fetching logic
        const transcriptData = await getTranscriptFromAPI(videoId);
        setTranscript(transcriptData);
        summarizeTranscript(transcriptData);
    };

    const summarizeTranscript = async (transcriptData) => {
        // Replace with actual summarization logic
        const summaryData = await getSummaryFromAPI(transcriptData);
        setSummary(summaryData);
    };

    const handleCopySummary = () => {
        const summaryText = summary.map(item => `${item.timestamp}: ${item.content}`).join("\n");
        navigator.clipboard.writeText(summaryText);
        toast({
            title: 'Summary copied.',
            description: 'The video summary has been copied to your clipboard.',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <Box p={6}>
            <HStack mb={4} justify="space-between">
                <HStack spacing={4}>
                    <Menu>
                        <MenuButton as={Button} variant="outline" borderRadius="20px" leftIcon={<FiMenu />} rightIcon={<FiChevronDown />}>
                            Chronological
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Chronological</MenuItem>
                            <MenuItem>General</MenuItem>
                            <MenuItem>Sales</MenuItem>
                            <MenuItem>Customer Success</MenuItem>
                            <MenuItem>Demo</MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} variant="outline" borderRadius="20px" rightIcon={<FiChevronDown />}>
                            EN
                        </MenuButton>
                        <MenuList>
                            <MenuItem>EN</MenuItem>
                            <MenuItem>ES</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
                <IconButton
                    aria-label="Copy Summary"
                    icon={<FiCopy />}
                    variant="outline"
                    onClick={handleCopySummary}
                >
                    Copy Summary
                </IconButton>
            </HStack>

            <Text fontWeight="bold" mb={4}>Video Summary</Text>
            {summary.length > 0 ? (
                <VStack align="start" spacing={4}>
                    {summary.map((item, index) => (
                        <Box key={index}>
                            <Text fontWeight="bold">{item.timestamp}</Text>
                            <Text>{item.content}</Text>
                        </Box>
                    ))}
                </VStack>
            ) : (
                <Text>Generating summary...</Text>
            )}
        </Box>
    );
}

// Mock functions simulating API calls
async function getTranscriptFromAPI(videoId) {
    return "Full transcript text here...";
}

async function getSummaryFromAPI(transcriptData) {
    return [
        { timestamp: "Khái niệm về Business Case (0.00)", content: "Trong bài học này, người hướng dẫn nhấn mạnh rằng không đi sâu vào bất kỳ chức năng hay phòng ban cụ thể nào (như supply chain hay finance). Kiến thức tổng quát sẽ hỗ trợ, nhưng cần có kiến thức chuyên môn vững vàng để giải quyết các case chuyên sâu." },
        { timestamp: "Agenda của buổi học (47.00)", content: "Tìm hiểu các phần cơ bản của một business case và các bước tiếp cận và xử lý một business case: Định nghĩa vấn đề (Problem Definition), Phân tích (Analysis), Tổng hợp và khuyến nghị (Synthesis Recommendation), Quản lý rủi ro trong việc thực hiện (Implementation Risk Management)." },
        { timestamp: "Cách trình bày kết quả (95.00)", content: "Sau khi xử lý case, người học cần biết cách trình bày kết quả qua slide, video hoặc thuyết trình bằng miệng, với các yếu tố như câu chuyện (storyline) và cách thức trình bày khác nhau." },
        { timestamp: "Hai phần chính trong Business Case (139.00)", content: "Objective: Mục tiêu lớn cần giải quyết, ví dụ như tăng trưởng thị phần hay triển khai một chiến dịch marketing mới. Supporting Data: Dữ liệu hỗ trợ được cung cấp bởi đề bài, bao gồm dữ liệu liên quan đến vấn đề và dữ liệu nền tảng." },
        { timestamp: "Phân loại dữ liệu (239.00)", content: "Cần phân biệt giữa dữ liệu liên quan đến vấn đề và dữ liệu nền tảng, vì không phải tất cả dữ liệu đều có liên quan đến mục tiêu chính." },
        { timestamp: "Cách tiếp cận (371.00)", content: "Có hai cách tiếp cận chính là từ trên xuống (top down) và từ dưới lên (bottom up). Mỗi cách có ưu điểm riêng, và tùy vào lượng dữ liệu có sẵn mà lựa chọn cách tiếp cận phù hợp." },
        { timestamp: "Ví dụ cụ thể (831.00)", content: "Một ví dụ về việc tăng trưởng doanh thu của The Trainee Club trong ba năm tới đã được đưa ra, kèm theo các giả thuyết và cách phân tích để đạt được mục tiêu doanh thu." },
        { timestamp: "Đặt câu hỏi (1153.00)", content: "Cuối cùng, để hỗ trợ trong việc phân tích, cần đặt ra các câu hỏi như 'how', 'what', 'how much', 'why', và 'who' để xác định các yếu tố ảnh hưởng và dữ liệu cần thiết." }
    ];
}


export default VideoSummary;
