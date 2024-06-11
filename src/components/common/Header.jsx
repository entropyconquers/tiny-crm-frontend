import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, Button, Link, useColorModeValue, Heading, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';


const Header = () => {
  // Initialize errorCount from localStorage if available, otherwise start at 0
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.600', 'white');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');


  useEffect(() => {
    fetchUser();
  }, []);

  // const fetchUser = async () => {

  //   try {
  //     const response = await axiosInstance.get('/user');
  //     if (response.data.user) {
  //       setUser(response.data.user);
  //     } else {
  //       // Force refresh
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user", error);
  //     // Check if the error has a response object
  //     if (error.response) {
  //       // You can handle HTTP-specific errors here
  //       const { status } = error.response;
  //       // Example: navigate based on status or show specific messages
  //       // if (status === 401) {
  //       //   window.location.href = '/';
  //       // }
  //     } else {
  //       // The error is not from an HTTP response, handle accordingly
  //       console.error("An error occurred that is not from an HTTP response", error);
  //       // Implement a retry mechanism, or navigate, or show an error message
  //       // Example: Retry after 1 second
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 500);
  //     }
  //   }
  // };
  const fetchUser = async () => {
  try {
    const response = await fetch('/user', {
      method: 'GET',
      credentials: 'include', // Ensure cookies are sent with the request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.user) {
      setUser(data.user);
    } else {
      // Force refresh
      window.location.reload();
    }
  } catch (error) {
    console.error("Error fetching user", error);
    // Since fetch doesn't reject HTTP error statuses, check for response.ok
    // No need to check for error.response like in Axios
    // Implement a retry mechanism, or navigate, or show an error message
    // Example: Retry after 0.5 seconds
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
};
  function logoutUser() {


    // Logic to logout user
    // Clear user token from local storage
    localStorage.removeItem('user');
    window.location.href = '/';

    axiosInstance.get('/logout').then((response) => {
      console.log(response);
      navigate('/');
    }).catch((error) => {
      console.error(error);
    }
    );
  }


  return (
    <Box bg={bg} w="100%" p={4} color={color} boxShadow="sm" position="fixed" top={0} zIndex={1000}>
      <Flex alignItems="center" justifyContent="space-between">
        {user ? (
          <>
            <Flex alignItems="center">
              <Heading size="md" mr={4}
                fontWeight={500}

              >Tiny
                <Text as="span" fontWeight={800} color="linear(to-r, teal.200, blue.500)" bgGradient="linear(to-r, teal.300, blue.500)" bgClip="text"
                >CRM</Text>
              </Heading>
              <Link href="/dashboard" p={2} _hover={{ bg: hoverBg, borderRadius: 'md' }}>Dashboard</Link>
              <Link href="/campaigns" p={2} _hover={{ bg: hoverBg, borderRadius: 'md' }}>Campaigns</Link>
            </Flex>
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar size={'sm'} src={user.picture} />
              </MenuButton>
              <MenuList
                p={2}


              >
                <Box textAlign="center">
                  <Avatar size={'md'} src={user.picture}
                    mx="auto"
                    my={2}

                  />
                </Box>
                <Heading
                  fontSize="md"
                  color="gray.800"
                  textAlign="center"
                  mt={2}
                >{user.displayName || user.email}</Heading>
                <Text color="gray.500" textAlign="center" mb={2} mt={1}
                  fontSize="sm"
                >{user.email}</Text>
                <Divider
                  mb={2}
                />
                <MenuItem onClick={logoutUser}
                  color="red.500"
                  _hover={{ bg: 'red.100', borderWidth: 0 }}
                  textAlign="center"
                  w="100%"
                  borderWidth={0}
                  _focus={{ borderWidth: 0 }}
                >Log out</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Text>Login</Text>
        )}
      </Flex>
    </Box>
  );
};

export default Header;