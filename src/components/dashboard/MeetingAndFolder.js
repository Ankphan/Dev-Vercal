'use client';
import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import {
  Box, Button, Text, VStack, SimpleGrid, Progress, InputGroup, Input, InputLeftElement, Flex, Tabs, TabList, Tab,
  Switch, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Image, Heading
} from '@chakra-ui/react';
import { FiSearch, FiChevronDown, FiUpload, FiPlus } from 'react-icons/fi';
import { FaLock, FaUserFriends, FaBuilding } from 'react-icons/fa';
import Layout from '@/src/navigation/layout';
import { useDisclosure } from '@chakra-ui/react'; // <-- Add this import
import { FileContext } from '@/context/FileProvider';
import { useUploadModel } from '@/context/UploadModelContext';
import VideoDetailPage from './VideoDetail';
import { useRouter } from 'next/navigation';

const ThumbnailBox = ({ onClick, src, alt, label, buttonProps, textProps }) => (
  <Box position="relative">
    <Button onClick={onClick} w="full" h="200px" borderRadius={12} position="relative" overflow="hidden" p={0} {...buttonProps}>
      <Image src={src} alt={alt} boxSize="full" objectFit="cover" position="absolute" top={0} left={0} />
    </Button>
    <Text textAlign="center" mt={2} color="white" {...textProps}>
      {label}
    </Text>
  </Box>
);

const ActivityCard = ({ activity }) => (
  <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
    <Heading fontSize="lg">{activity.action}: {activity.modelName}</Heading>
    <Text mt={4}>Date: {new Date(activity.date).toLocaleString()}</Text>
  </Box>
);

function MeetingTest() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const router = useRouter();
  const { fileData } = useContext(FileContext);
  const { activities, setActivities } = useUploadModel();
  const [activeTab, setActiveTab] = useState('meetings');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [duplicateFile, setDuplicateFile] = useState(null);
  const { isOpen: isDuplicateModalOpen, onOpen: onDuplicateModalOpen, onClose: onDuplicateModalClose } = useDisclosure();
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [files, setFiles] = useState([]);
  const [transcription, setTranscription] = useState(null);
  const [partialTranscript, setPartialTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState(null);
  

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleBackToMeetings = () => {
        setSelectedVideo(null); // Reset selected video to go back to the meeting list
    };

    useEffect(() => {
      // Set the path directly to the video file in the public directory
      const videoURL = '/test_video.mp4'; // Path relative to the public folder
      const preloadedFile = {
        file: { name: 'Test Meeting', type: 'video/mp4' },
        videoURL, // No need for Blob, just use the URL directly
        duration: null,
        progress: 100, // Assuming the preloaded video is fully "uploaded"
        uploadDate: new Date(),
      };
      
      setUploadedFiles((prevFiles) => [...prevFiles, preloadedFile]);
    }, []);

  useEffect(() => {
    if (fileData) {
      const newActivity = {
        action: 'Uploaded',
        modelName: fileData.name,
        date: new Date(),
      };
      setActivities((prevActivities) => [...prevActivities, newActivity]);
    }
  }, [fileData, setActivities]);


  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const response = await fetch('/api/list-files');
      const data = await response.json();
      setFiles(data.body.files);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Failed to fetch files.');
    }
  }





  const handleFilterClick = useCallback((filter) => setSelectedFilter(filter), []);

  const simulateFileUpload = useCallback((fileIndex) => {
    let progress = 0;
    const interval = setInterval(() => {
      setUploadedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        if (updatedFiles[fileIndex].progress < 100) {
          updatedFiles[fileIndex].progress = progress;
        } else {
          clearInterval(interval);
        }
        return updatedFiles;
      });
      progress += 10;
    }, 500);
  }, []);

    const handleFileChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const existingFileIndex = uploadedFiles.findIndex(
                (uploadedFile) => uploadedFile.file.name === file.name
            );

            if (existingFileIndex >= 0) {
                setDuplicateFile(file);
                onDuplicateModalOpen();
            } else {
                const videoURL = URL.createObjectURL(file);
                const newFile = {
                    file,
                    videoURL,
                    duration: null,
                    progress: 0,
                    uploadDate: new Date(), // Capture the current date and save it
                };
                setUploadedFiles((prevFiles) => {
                    const newFiles = [...prevFiles, newFile];
                    simulateFileUpload(newFiles.length - 1);
                    return newFiles;
                });
            }
            setFileInputKey(Date.now());
        }
    }, [uploadedFiles, onDuplicateModalOpen]);

    const handleReplace = useCallback(() => {
        if (duplicateFile) {
            const videoURL = URL.createObjectURL(duplicateFile);
            setUploadedFiles((prevFiles) => {
                const updatedFiles = prevFiles.map((uploadedFile, index) => {
                    if (uploadedFile.file.name === duplicateFile.name) {
                        const updatedFile = { ...uploadedFile, file: duplicateFile, videoURL, progress: 0, uploadDate: new Date() }; // Update the date
                        simulateFileUpload(index);
                        return updatedFile;
                    }
                    return uploadedFile;
                });
                return updatedFiles;
            });
            onDuplicateModalClose();
        }
    }, [duplicateFile, uploadedFiles, onDuplicateModalClose]);

  const handleKeepBoth = useCallback(() => {
    if (duplicateFile) {
      const fileBaseName = duplicateFile.name.substring(0, duplicateFile.name.lastIndexOf('.'));
      const fileExtension = duplicateFile.name.substring(duplicateFile.name.lastIndexOf('.'));
      let newFileName = `${fileBaseName}_1${fileExtension}`;
      let counter = 1;

      while (uploadedFiles.some((uploadedFile) => uploadedFile.file.name === newFileName)) {
        counter++;
        newFileName = `${fileBaseName}_${counter}${fileExtension}`;
      }

      const newFile = new File([duplicateFile], newFileName, { type: duplicateFile.type });
      const videoURL = URL.createObjectURL(newFile);

            setUploadedFiles((prevFiles) => {
                const newFiles = [...prevFiles, { file: newFile, videoURL, duration: null, progress: 0, uploadDate: new Date() }];
                simulateFileUpload(newFiles.length - 1);
                return newFiles;
            });
            onDuplicateModalClose();
        }
    }, [duplicateFile, uploadedFiles, onDuplicateModalClose]);

  const handleLoadedMetadata = useCallback((index, duration) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      if (!updatedFiles[index].duration) {
        updatedFiles[index].duration = duration;
      }
      return updatedFiles;
    });
  }, []);

  const formatDuration = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const renderUploadedFiles = useMemo(() => (
    uploadedFiles.map((uploadedFile, index) => (
      <Box key={index} mt={4} p={4} border="1px solid" borderColor="gray.200" borderRadius="10px">
        <Flex alignItems="center">
          <Box width="120px" height="80px" mr={4} bg="gray.100" borderRadius="10px" overflow="hidden">
            <video width="120px" height="80px" onLoadedMetadata={(e) => handleLoadedMetadata(index, e.target.duration)}>
              <source src={uploadedFile.videoURL} type={uploadedFile.file.type} />
            </video>
          </Box>
          <Box>
            <Text fontWeight="bold">{uploadedFile.file.name}</Text>
            <Text fontSize="sm">Uploaded on: {new Date().toLocaleDateString()}</Text>
            <Text fontSize="sm">Duration: {uploadedFile.duration ? formatDuration(uploadedFile.duration) : 'Calculating...'}</Text>
          </Box>
        </Flex>
        {uploadedFile.progress < 100 && <Progress value={uploadedFile.progress} size="xs" colorScheme="blue" mt={2} />}
      </Box>
    ))
  ), [uploadedFiles, formatDuration, handleLoadedMetadata]);
  async function transcribeFile(fileKey) {
    try {
      setIsTranscribing(true);
      setPartialTranscript(''); // Reset partial transcript
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileKey }),
      });

      if (!response.ok) throw new Error('Failed to transcribe the file');

      const data = await response.json();
      setTranscription(data.transcription);
    } catch (err) {
      console.error('Error transcribing file:', err);
      setError('An error occurred while transcribing the file.');
    } finally {
      setIsTranscribing(false);
    }
  }

    return (
        <Layout>
            <VStack>
                <Box
                    flex="1"
                    bg="white"
                    color="gray.800"
                    p={6}
                    h="100vh"
                    overflowY="auto"
                    w="100%"
                >
                    {!selectedVideo ? (
                        <>
                            <Tabs variant="unstyled" mb={6} onChange={(index) => setActiveTab(index === 0 ? 'meetings' : 'folders')}>
                                <Flex mb={6} justify="space-between" align="center">
                                    <TabList>
                                        <Tab _selected={{ color: 'blue.600', bg: 'blue.50', borderRadius: '10px' }} onClick={() => setActiveTab('meetings')}>Meetings</Tab>
                                        <Tab _selected={{ color: 'blue.600', bg: 'blue.50', borderRadius: '10px' }} onClick={() => setActiveTab('folders')}>Folders</Tab>
                                    </TabList>

                                    {activeTab === "meetings" && (<Button leftIcon={<FiUpload />} onClick={() => document.getElementById('fileInput').click()}>
                                        Manage uploads
                                    </Button>)}

                                    {activeTab === "folders" && (<Button
                                        leftIcon={<FiPlus />}
                                        variant="outline"
                                        color="gray.600"
                                        fontWeight="semibold"
                                        borderColor="gray.300"
                                        borderRadius="10px"
                                        px={4}
                                        py={2}
                                        _hover={{ bg: "gray.100" }}
                                    >
                                        New folder
                                    </Button>)}
                                </Flex>
                            </Tabs>

                            {activeTab === 'meetings' && (
                                <>
                                    <Flex align="center" mb={6} wrap="wrap">
                                        <Button
                                            color={selectedFilter === 'all' ? 'blue.600' : 'gray.600'}
                                            bg={selectedFilter === 'all' ? 'blue.50' : 'transparent'}
                                            borderRadius="10px"
                                            _hover={{ bg: 'blue.100' }}
                                            mr={2}
                                            onClick={() => handleFilterClick('all')}
                                        >
                                            All Meetings
                                        </Button>
                                        <Button
                                            leftIcon={<FaLock />}
                                            color={selectedFilter === 'private' ? 'blue.600' : 'gray.600'}
                                            bg={selectedFilter === 'private' ? 'blue.50' : 'transparent'}
                                            borderRadius="10px"
                                            _hover={{ bg: 'blue.100' }}
                                            mr={2}
                                            onClick={() => handleFilterClick('private')}
                                        >
                                            Private
                                        </Button>
                                        <Button
                                            leftIcon={<FaUserFriends />}
                                            color={selectedFilter === 'team' ? 'blue.600' : 'gray.600'}
                                            bg={selectedFilter === 'team' ? 'blue.50' : 'transparent'}
                                            borderRadius="10px"
                                            _hover={{ bg: 'blue.100' }}
                                            mr={2}
                                            onClick={() => handleFilterClick('team')}
                                        >
                                            My Team
                                        </Button>
                                        <Button
                                            leftIcon={<FaBuilding />}
                                            color={selectedFilter === 'organization' ? 'blue.600' : 'gray.600'}
                                            bg={selectedFilter === 'organization' ? 'blue.50' : 'transparent'}
                                            borderRadius="10px"
                                            _hover={{ bg: 'blue.100' }}
                                            mr={2}
                                            onClick={() => handleFilterClick('organization')}
                                        >
                                            My Organization
                                        </Button>

                                        <Flex flex="1" justifyContent="flex-end">
                                            <InputGroup size="md" w="auto">
                                                <InputLeftElement pointerEvents="none">
                                                    <FiSearch color="gray.500" />
                                                </InputLeftElement>
                                                <Input
                                                    placeholder="Find any meeting moment..."
                                                    borderRadius="10px"
                                                    bg="gray.50"
                                                    border="1px solid"
                                                    borderColor="gray.300"
                                                    _focus={{ borderColor: 'blue.500' }}
                                                />
                                            </InputGroup>
                                        </Flex>
                                    </Flex>

                                    <Flex wrap="nowrap" alignItems="center" gap={0.1}>
                                        <Flex alignItems="center">
                                            <Text mr={2} size="sm" fontSize="sm" variant="ghost" fontWeight="semibold">Meetings I joined</Text>
                                            <Switch colorScheme="blue" />
                                        </Flex>

                                        <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                        <Flex alignItems="center">
                                            <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                                Any domain
                                            </Button>
                                        </Flex>

                                        <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                        <Flex alignItems="center">
                                            <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                                Any email
                                            </Button>
                                        </Flex>

                                        <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                        <Flex alignItems="center">
                                            <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                                Any role
                                            </Button>
                                        </Flex>

                                        <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                        <Flex alignItems="center">
                                            <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                                Any time
                                            </Button>
                                        </Flex>

                                        <Box height="24px" borderRight="1px" borderColor="gray.300" mx={3} />

                                        <Flex alignItems="center">
                                            <Button variant="ghost" size="sm" fontSize="sm" rightIcon={<FiChevronDown />}>
                                                Any meeting title
                                            </Button>
                                        </Flex>
                                    </Flex>

                                    <Flex mt={4} alignItems="center">
                                        <input
                                            id="fileInput"
                                            key={fileInputKey}
                                            type="file"
                                            style={{ display: 'none' }}
                                            accept="video/*"
                                            onChange={handleFileChange}
                                        />
                                    </Flex>

                                    {uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile, index) => (
                                        <Box key={index} mt={4} p={4} border="1px solid" borderColor="gray.200" borderRadius="10px" onClick={() => {
                                            if (uploadedFile.progress === 100) {
                                                handleVideoClick(uploadedFile);
                                            }
                                        }} 
                                        cursor={uploadedFile.progress === 100 ? 'pointer' : 'not-allowed'}
                                        >
                                            <Flex alignItems="center">
                                                <Box width="120px" height="80px" mr={4} bg="gray.100" borderRadius="10px" overflow="hidden">
                                                    <video
                                                        width="120px"
                                                        height="80px"
                                                        onLoadedMetadata={(e) => handleLoadedMetadata(index, e.target.duration)}
                                                    >
                                                        <source src={uploadedFile.videoURL} type={uploadedFile.file.type} />
                                                    </video>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight="bold">{uploadedFile.file.name}</Text>
                                                    <Text fontSize="sm">Uploaded on: {new Date(uploadedFile.uploadDate).toLocaleDateString()}</Text>
                                                    <Text fontSize="sm">
                                                        Duration: {uploadedFile.duration ? formatDuration(uploadedFile.duration) : 'Calculating...'}
                                                    </Text>
                                                </Box>
                                            </Flex>

                                            {uploadedFile.progress < 100 && (
                                                <Progress value={uploadedFile.progress} size="xs" colorScheme="blue" mt={2} />
                                            )}
                                        </Box>
                                    ))}
                                </>
                            )}

                            {activeTab === 'folders' && (
                                <Box textAlign="center" p={10} bg="blue.50" borderRadius="md">
                                    <Text fontSize="xl" fontWeight="bold" color="blue.600">
                                        There are no folders yet
                                    </Text>
                                    <Text color="gray.500" mt={2}>
                                        Create your first folder and start organizing your library
                                    </Text>
                                </Box>
                            )}

                            <Modal isOpen={isDuplicateModalOpen} onClose={onDuplicateModalClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Duplicate File</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Text>The file "{duplicateFile?.name}" already exists. Would you like to:</Text>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="red" onClick={handleReplace}>
                                            Replace
                                        </Button>
                                        <Button colorScheme="blue" ml={3} onClick={handleKeepBoth}>
                                            Keep Both
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </>
                    ) : (
                        <VideoDetailPage video={selectedVideo} onBack={handleBackToMeetings} />
                    )}
                </Box>
            </VStack>
        </Layout>
    );
}

export default MeetingTest;
