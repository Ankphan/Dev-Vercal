import React, { useRef, useEffect, useState } from 'react';
import { VStack, Flex, Text, Button, HStack } from '@chakra-ui/react';

const Transcript = ({ transcript, currentTime, onTranscriptClick, videoDuration, searchTerm, autoScrollEnabled }) => {
    const activeEntryRef = useRef(null);
    const transcriptContainerRef = useRef(null);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [searchResults, setSearchResults] = useState([]);

    const highlightText = (text, term) => {
        if (!term) return text;
        const parts = text.split(new RegExp(`(${term})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === term.toLowerCase() ? (
                <Text as="mark" bg="yellow.300" key={index}>{part}</Text>
            ) : (
                part
            )
        );
    };

    const jumpToSearchResult = (index) => {
        if (searchResults.length && searchResults[index] !== undefined) {
            setHighlightIndex(index);  // Update the highlightIndex
            onTranscriptClick(searchResults[index].time); // Jump to the correct time in video
        }
    };

    useEffect(() => {

        if (searchTerm) {
            const results = transcript.filter(entry =>
                entry.text.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);

            // Only reset index to 0 if it was empty before (i.e. when the search is first performed)
            if (results.length && highlightIndex >= results.length) {
                setHighlightIndex(0);
            }
        } else {
            setSearchResults([]); // Clear search results if no search term
            setHighlightIndex(0); // Reset index if no search
        }
    }, [searchTerm, transcript, highlightIndex]);

    useEffect(() => {
        if (autoScrollEnabled && activeEntryRef.current && transcriptContainerRef.current) {
            const offsetTop = activeEntryRef.current.offsetTop;
            transcriptContainerRef.current.scrollTo({
                top: offsetTop - transcriptContainerRef.current.clientHeight / 2,
                behavior: 'smooth',
            });
        }
    }, [currentTime, highlightIndex, autoScrollEnabled]);

    const handleNextResult = () => {
        if (highlightIndex < searchResults.length - 1) {
            const newIndex = highlightIndex + 1;
            jumpToSearchResult(newIndex);
        }
    };

    const handlePrevResult = () => {
        if (highlightIndex > 0) {
            const newIndex = highlightIndex - 1;
            jumpToSearchResult(newIndex);
        }
    };

    return (
        <VStack align="start" spacing={4} w="100%">
            {searchTerm && searchResults.length > 0 && (
                <HStack spacing={2}>
                    <Button size="sm" onClick={handlePrevResult} isDisabled={highlightIndex === 0}>
                        Previous
                    </Button>
                    <Button size="sm" onClick={handleNextResult} isDisabled={highlightIndex === searchResults.length - 1}>
                        Next
                    </Button>
                    <Text>{`${highlightIndex + 1} / ${searchResults.length}`}</Text>  {/* Display the current result index */}
                </HStack>
            )}
            <VStack
                align="start"
                spacing={4}
                maxH="60vh"
                overflowY="auto"
                bg="gray.50"
                p={4}
                borderRadius="md"
                w="100%"
                ref={transcriptContainerRef}
            >
                {transcript.map((entry, index) => (
                    <Flex
                        key={index}
                        direction="column"
                        alignSelf={entry.speaker === 'Richard White' ? 'flex-end' : 'flex-start'}
                        bg={currentTime >= entry.time && currentTime < (transcript[index + 1]?.time || videoDuration) ? 'blue.100' : 'gray.100'}
                        p={3}
                        borderRadius="md"
                        maxW="60%"
                        cursor="pointer"
                        color="black"
                        onClick={() => onTranscriptClick(entry.time)}
                        boxShadow="md"
                        ref={currentTime >= entry.time && currentTime < (transcript[index + 1]?.time || videoDuration) ? activeEntryRef : null}
                    >
                        <Text fontWeight="bold" mb={1} fontSize="sm" color="gray.700">
                            @{entry.speaker}
                        </Text>
                        <Text>
                            {highlightText(entry.text, searchTerm)}
                        </Text>
                    </Flex>
                ))}
            </VStack>
        </VStack>
    );
};

export default Transcript;
