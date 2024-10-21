"use client";
import { Box, Button, Flex, Heading, Text, AspectRatio } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Box
            py={{ base: "20", md: "40", xl: "46" }}
            overflow="hidden"
            mt={{ base: "20", md: "28", xl: "32" }}
            bgGradient="linear(to-r, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))" // Change to a white gradient
        >
            <Box maxW="1390px" mx="auto" px={{ base: "4", md: "8", "2xl": "0" }}>
                <Flex direction={{ base: "column", md: "row" }} align="center" gap={{ lg: "8", xl: "32" }}>
                    <Box w={{ base: "full", md: "50%" }}>
                        <Text
                            mb="4.5"
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.500"
                            _dark={{ color: "gray.400" }}
                        >
                            AI NOTETAKER FOR MEETINGS
                        </Text>
                        <Heading
                            as="h1"
                            mb="5"
                            pr="16"
                            fontSize={{ base: "3xl", xl: "6xl" }}
                            fontWeight="bold"
                            color="#000082"
                            _dark={{ color: "white" }}
                        >
                            We take your meeting notes.{" "}
                            <Box
                                as="span"
                                position="relative"
                                display="inline-block"
                                _before={{
                                    content: '""',
                                    position: "absolute",
                                    bottom: "2.5",
                                    left: "0",
                                    zIndex: "-1",
                                    height: "12px",
                                    width: "100%",
                                    bg: "blue.300",
                                    _dark: { bg: "purple.700" },
                                }}
                                bgClip="text"
                                bgGradient="linear(to-r, blue.500, purple.600)"
                                textColor="transparent"
                            >
                                You run the show.
                            </Box>
                        </Heading>
                        <Text mb="6"
                            fontSize="md"
                            fontWeight="medium"
                            color="gray.500"
                            _dark={{ color: "gray.400" }}>
                            Our AI notetaker is like having multiple ChatGPT meeting agents. One to auto-update the
                            CRM, another to draft follow-up emails, or yet one that sends feature requests or competitor
                            mentions straight to your inbox – say, every week. You get it. But there’s more.
                        </Text>

                        <form onSubmit={handleSubmit}>
                            <Button
                                aria-label="get started button"
                                bg="black"
                                color="white"
                                _hover={{ bg: "gray.700" }}
                                px="7"
                                py="4"
                                borderRadius="full"
                            >
                                Get Free Forever
                            </Button>
                        </form>
                    </Box>

                    {/* Right Section */}
                    <Box w={{ base: "full", md: "50%" }} display={{ base: "none", lg: "block" }}>
                        <Box position="relative" w="full">
                            <Image
                                src="/theme/home_page/shape-01.png"
                                alt="shape"
                                width={46}
                                height={246}
                                style={{ position: "absolute", top: 0, left: "-46px" }}
                            />
                            <Image
                                src="/theme/home_page/shape-02.svg"
                                alt="shape"
                                width={37}
                                height={37}
                                style={{ position: "absolute", bottom: "-10px", right: 0, zIndex: 10 }}
                            />
                            <Image
                                src="/theme/home_page/shape-03.svg"
                                alt="shape"
                                width={22}
                                height={22}
                                style={{ position: "absolute", bottom: 0, right: "-22px", zIndex: 1 }}
                            />
                            <AspectRatio ratio={16 / 9} border="4px solid white" borderRadius="55px" shadow="lg">
                                <Box
                                    width="full"
                                    height="full"
                                    borderRadius="55px"
                                    overflow="hidden"
                                    boxShadow="lg"
                                >
                                    <iframe
                                        style={{ width: "100%", height: "100%", border: "none" }}
                                        src="https://www.youtube.com/embed/3wTsfVVaBE8"
                                        title="YouTube video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </Box>
                            </AspectRatio>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Hero;
