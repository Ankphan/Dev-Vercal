'use client';

import React, { useState } from 'react';
import Layout from '@/src/navigation/layout';
import {
    Box,
    Button,
    Flex,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Switch,
    Text,
    VStack,
    Stack,
    List,
    ListItem,
    Spinner,
    Center,
    IconButton,
} from '@chakra-ui/react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [joinedOnly, setJoinedOnly] = useState(false);
    const [filters, setFilters] = useState({
        domain: 'Any domain',
        email: 'Any email',
        role: 'Any role',
        time: 'Any time',
        title: 'Any meeting title',
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {

        if (searchQuery.trim() === '') {
            setResults([]);
            setNoResults(false);
            setLoading(false);
            return;
        }


        setLoading(true);
        setNoResults(false);
        setResults([]);

        setTimeout(() => {
            const mockResults = [
                { id: 1, title: 'AI Research Meeting', participants: 'John, Alice' },
                { id: 2, title: 'Team Standup', participants: 'Bob, Mary' },
                { id: 3, title: 'Planning Session', participants: 'Sara, Tim' },
            ];

            const filteredResults = mockResults.filter(item =>
                (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.participants.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (!joinedOnly || item.joined)
            );

            setLoading(false);

            if (filteredResults.length === 0) {
                setNoResults(true);
            } else {
                setResults(filteredResults);
                setNoResults(false);
            }
        }, 500);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim() === '') {
            setResults([]);
            setNoResults(false);
            setLoading(false);
        } else {
            handleSearch();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Layout>
            <VStack>
                <Flex
                    flex="1"
                    bg="white"
                    color="gray.800"
                    p={6}
                    h="100vh"
                    overflowY="auto"
                    w="100%"
                >
                    <Box w="100%" >
                        {/* Search Bar */}
                        <InputGroup boxShadow="md" size="lg" borderRadius="md">
                            <InputLeftElement>
                                <IconButton
                                    aria-label="Search"
                                    icon={<FiSearch color="gray.300" />}
                                    variant="ghost"
                                    onClick={handleSearch} // Click on the search icon triggers search
                                />
                            </InputLeftElement>
                            <Input
                                type="text"
                                placeholder="Search meeting transcripts, titles and participants with keywords..."
                                border="2px solid"
                                borderColor="blue.400"
                                _focus={{ borderColor: 'blue.600' }}
                                value={searchQuery}
                                onChange={handleInputChange} // Automatically search on each input change
                                onKeyDown={handleKeyDown}  // Trigger search on pressing "Enter"
                            />
                        </InputGroup>

                        {/* Filters */}
                        <HStack spacing={4} mt={4}>
                            <Flex wrap="nowrap" alignItems="center" gap={0.1}>
                                <Flex alignItems="center">
                                    <Text mr={2} size="sm" fontSize="sm" variant="ghost" fontWeight="semibold">Meetings I joined</Text>
                                    <Switch
                                        colorScheme="blue"
                                        isChecked={joinedOnly}
                                        onChange={() => setJoinedOnly(!joinedOnly)}
                                    />
                                </Flex>

                                <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                <Flex alignItems="center">
                                    <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                        {filters.domain}
                                    </Button>
                                </Flex>

                                <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                <Flex alignItems="center">
                                    <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                        {filters.email}
                                    </Button>
                                </Flex>

                                <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                <Flex alignItems="center">
                                    <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                        {filters.role}
                                    </Button>
                                </Flex>

                                <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                <Flex alignItems="center">
                                    <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                        {filters.time}
                                    </Button>
                                </Flex>

                                <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                <Flex alignItems="center">
                                    <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                        {filters.title}
                                    </Button>
                                </Flex>
                            </Flex>
                        </HStack>

                        {/* Loading State */}
                        {loading && (
                            <Center mt={6}>
                                <Spinner size="xl" />
                            </Center>
                        )}

                        {/* No Results Found */}
                        {noResults && !loading && (
                            <Center mt={6}>
                                <Box textAlign="center" py={10} px={6}>
                                    <Flex alignItems="center" justifyContent="center">
                                        <FiSearch size={20} />
                                        <Text fontSize="lg" ml={2} color="gray.600">
                                            No matches found for "{searchQuery}"
                                        </Text>
                                    </Flex>
                                    <Text fontSize="sm" color="gray.500" mt={2}>
                                        Try adjusting your keywords to see more results
                                    </Text>
                                </Box>
                            </Center>
                        )}

                        {/* Search Results */}
                        {!loading && results.length > 0 && !noResults && (
                            <Box mt={6}>
                                <List spacing={3}>
                                    {results.map(result => (
                                        <ListItem key={result.id}>
                                            <Stack direction="row" alignItems="center">
                                                <Text fontWeight="bold">{result.title}</Text>
                                                <Text> - {result.participants}</Text>
                                            </Stack>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                </Flex>
            </VStack>
        </Layout>
    );
}

export default SearchPage;
