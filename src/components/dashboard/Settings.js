'use client';

import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Input,
    Image,
    Select,
    Text,
    VStack,
    Icon,
    Badge,
    Switch
} from '@chakra-ui/react';
import Layout from '@/src/navigation/layout';
import { FiZap, FiEdit2, FiLink } from 'react-icons/fi'; // Icons for Zapier and Edit
import { MdRecommend } from 'react-icons/md'; // Icon for Recommended
import { FaRegImage } from 'react-icons/fa'; // Icon for the image notification
import { BsFillStarFill } from 'react-icons/bs';

function Settings() {
    const [switchStates, setSwitchStates] = useState({
        isAutoGenerateChecked: true,
        isRecordingBannerEnabled: true,
        isAutoRecordAll: true,
        isAutoRecordUnscheduled: true,
        isAutoRecordRequest: true
    });
    const [isEditingBotName, setIsEditingBotName] = useState(false);
    const [savedBotName, setSavedBotName] = useState(() => {
        return localStorage.getItem('savedBotName') || "Hiếu's Fathom Notetaker";
    });
    const [botName, setBotName] = useState(savedBotName);


    const handleSwitchToggle = (key) => {
        setSwitchStates((prevState) => ({
            ...prevState,
            [key]: !prevState[key], // Toggle the state of the specific key
        }));
    };
    const handleEditClick = () => {
        if (isEditingBotName) {
            setSavedBotName(botName);
            localStorage.setItem('savedBotName', botName); // Save to localStorage
            setIsEditingBotName(false);
        } else {
            setIsEditingBotName(true);
        }
    };

    return (
        <Layout><Box p={8} fontFamily="Arial, sans-serif">
            <Heading mb={8} color="gray.500">VIDEO CONFERENCING</Heading>


            <VStack spacing={6} align="stretch">
                <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
                    <Flex justify="space-between" align="center" mb={4}>
                        <Flex align="center">
                            <Image
                                src='/theme/home_page/zoom_icon.jpg'
                                alt="Zoom logo"
                                boxSize="50px"
                                mr={4}
                                borderRadius="md"  // Adds medium border radius
                            />            <Text>Zoom:</Text>
                            <Text ml={2} fontWeight="bold" color="green.400">
                                Fully Enabled
                            </Text>
                        </Flex>
                        <Button colorScheme="blue">Update in Zoom Settings</Button>
                    </Flex>
                </Box>

                <Heading mb={8} color="gray.500">PREMIUM FEATURES</Heading>

                {/* Zapier Section */}
                <Box bg="gray.100" p={6} borderRadius="md">
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Icon as={FiZap} boxSize={6} mr={4} />
                            <Text fontSize="lg" fontWeight="bold">Zapier</Text>
                        </Flex>
                        <Button colorScheme="blue" rightIcon={<FiLink />}>Connect</Button>
                    </Flex>
                    <Text mt={2} color="gray.800" fontWeight="semibold">Automate sending Fathom content to almost any app</Text>
                </Box>

                {/* Bot Name Section */}
                <Box bg="gray.100" p={6} borderRadius="md">
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Icon as={FiEdit2} boxSize={6} mr={4} />
                            <Text fontSize="lg" fontWeight="bold">
                                Bot Name:
                                {isEditingBotName ? (
                                    <Input
                                        value={botName}
                                        onChange={(e) => setBotName(e.target.value)}
                                        autoFocus
                                        ml={2}
                                        bg="gray.100"
                                        color="gray.800"
                                        border="1px solid gray"
                                        width="auto"
                                        display="inline-block"
                                    />
                                ) : (
                                    <Text as="span" ml={2} color="gray.800" fontWeight="semibold">
                                        {savedBotName}
                                    </Text>
                                )}
                            </Text>
                        </Flex>
                        <Button colorScheme="blue" onClick={handleEditClick}>
                            {isEditingBotName ? 'Save' : 'Edit'}
                        </Button>
                    </Flex>
                    <Text mt={2} color="gray.800" fontWeight="semibold">The name your Fathom notetaker will go by when it joins meetings.</Text>
                </Box>

                {/* Auto-Generate Action Items Section */}
                <Box bg="gray.100" p={6} borderRadius="md">
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Icon as={BsFillStarFill} boxSize={6} mr={4} />
                            <Text fontSize="lg" fontWeight="bold">
                                Auto-Generate Action Items
                            </Text>
                            <Badge ml={2} colorScheme="gray" border='1px solid'>RECOMMENDED</Badge>
                        </Flex>
                        <Switch
                            size="lg"
                            colorScheme="blue"
                            isChecked={switchStates.isAutoGenerateChecked}
                            onChange={() => handleSwitchToggle('isAutoGenerateChecked')}
                        />
                    </Flex>
                    <Text mt={2} color="gray.800" fontWeight="semibold">Fathom AI will automatically extract any action items discussed on your meetings.</Text>
                </Box>

                {/* Default Meeting Summary Template Section */}
                <Box bg="gray.100" p={6} borderRadius="md">
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Icon as={BsFillStarFill} boxSize={6} mr={4} />
                            <Text fontSize="lg" fontWeight="bold">
                                Default Meeting Summary Template
                            </Text>
                        </Flex>
                        <Select width="auto" bg="gray.100" color="black" border="1px solid">
                            <option value="general">General</option>
                            <option value="detailed">Detailed</option>
                        </Select>
                    </Flex>
                    <Text mt={2} color="gray.800" fontWeight="semibold">External meetings only. Attendees always see the General template if you share.</Text>
                </Box>

                {/* Recording Notification Banner Section */}
                <Box bg="gray.100" p={6} borderRadius="md">
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Icon as={FaRegImage} boxSize={6} mr={4} />
                            <Text fontSize="lg" fontWeight="bold">
                                Recording Notification Banner
                            </Text>
                            <Badge ml={2} colorScheme="gray" border="1px solid">PREVIEW</Badge>
                        </Flex>
                        <Switch
                            size="lg"
                            colorScheme="blue"
                            isChecked={switchStates.isRecordingBannerEnabled}
                            onChange={() => handleSwitchToggle('isRecordingBannerEnabled')}
                        />
                    </Flex>
                    <Text mt={2} color="gray.800" fontWeight="semibold">
                        WARNING: If you disable this you're required to collect recording consent according to the laws of you and your attendees' jurisdictions.
                    </Text>
                </Box>

                <Heading mb={8} color="gray.500">RECORD SETTINGS</Heading>

                {/* Recording Settings Section */}
                <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
                    <Flex justify="space-between" align="center" mb={4}>
                        <Text flex="1">
                            <strong>Auto Record All Scheduled Meetings</strong>
                            <br />
                            Fathom starts recording as soon as someone joins a call.
                        </Text>
                        <Switch
                            size="lg"
                            colorScheme="blue"
                            isChecked={switchStates.isAutoRecordAll}
                            onChange={() => handleSwitchToggle('isAutoRecordAll')}
                        />                    </Flex>

                </Box>

                <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
                    <Flex justify="space-between" align="center" mb={4}>
                        <Text flex="1">
                            <strong>Auto Record Unscheduled Meetings</strong>
                            <br />
                            Fathom will record Zoom meetings not on your calendar.
                        </Text>
                        <Switch
                            size="lg"
                            colorScheme="blue"
                            isChecked={switchStates.isAutoRecordUnscheduled}
                            onChange={() => handleSwitchToggle('isAutoRecordUnscheduled')}
                        />
                    </Flex>
                </Box>


                {/* Integrations Section */}
                <Heading mb={8} color="gray.500">INTEGRATIONS</Heading>

                <Box bg="gray.100" p={6} borderRadius="md" shadow="md">

                    <Flex justify="space-between" align="center" mb={4}>
                        <Image
                            src='/theme/home_page/Slack_Logo.png'
                            alt="Zoom logo"
                            boxSize="50px"
                            mr={4}
                            borderRadius="md"  // Adds medium border radius
                        />
                        <Text flex="1">
                            <strong>Slack</strong>
                            <br />
                            Automatically send highlights to Slack in real-time.
                        </Text>
                        <Button colorScheme="blue" rightIcon={<FiLink />} >Connect</Button>
                    </Flex>

                </Box>

                <Box bg="gray.100" p={6} borderRadius="md">
                    <Flex justify="space-between" align="center" mb={4}>
                        <Image
                            src='/theme/home_page/HubSpotLogo.webp'
                            alt="Zoom logo"
                            boxSize="50px"
                            mr={4}
                            borderRadius="md"
                        />
                        <Text flex="1">
                            <strong>HubSpot</strong>
                            <br />
                            Sync call summaries & highlights to matching Contacts, Accounts,
                            and open Opportunities.
                        </Text>
                        <Button colorScheme="blue" rightIcon={<FiLink />}>Connect</Button>
                    </Flex>                </Box>

                {/* Options Section */}
                <Heading mb={8} color="gray.500">OPTIONS</Heading>

                <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
                    <Flex justify="space-between" align="center" mb={4}>
                        <Text flex="1">
                            <strong>Attendee Access</strong>
                            <br />
                            What should attendees automatically have access to?
                        </Text>
                        <Select w="200px" border="1px solid">
                            <option value="recording-summary">Recording & Summary</option>
                            <option value="summary-only">Summary Only</option>
                        </Select>
                    </Flex>

                </Box>
                <Box bg="gray.100" p={6} borderRadius="md" shadow="md">
                    <Flex justify="space-between" align="center" mb={4}>
                        <Text flex="1">
                            <strong>Auto Request Recording Consent</strong>
                            <br />
                            Fathom collects recording consent from attendees of external
                            calls in advance.
                        </Text>
                        <Switch
                            size="lg"
                            colorScheme="blue"
                            isChecked={switchStates.isAutoRecordRequest}
                            onChange={() => handleSwitchToggle('isAutoRecordRequest')}
                        />
                    </Flex>
                </Box>
            </VStack>
        </Box> </Layout>

    );
}

export default Settings;
