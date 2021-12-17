import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Input,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { loadSuggestedUsers } from "../store/feed-actions";
import { MdFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/feed-actions";
import { useHistory } from "react-router-dom";
import SuggestedUserList from "../components/SuggestedUserList";

function ProfileSetup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [bio, setBio] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const suggestedUsers = useSelector((state) => state.feed.suggestedUsers);

  useEffect(() => {
    dispatch(loadSuggestedUsers());
  }, []);

  const retrieveProfileImageHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file !== undefined) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageData = reader.result;
        setImageSrc(imageData);
      });
      reader.readAsDataURL(file);
    } else {
      setImageSrc("");
    }
  };

  const submitComplete = (val) => {
    console.log("val", val);
    if (val) {
      history.replace("/");
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", fName + " " + lName);
    formData.append("bio", bio);
    console.log("formdata", formData);
    formData.append("profileImage", event.target.profileImage.files[0]);
    dispatch(updateUser(formData, submitComplete));
  };

  return (
    <Box width="container.lg" mx="auto">
      <Navbar />
      <Box>
        <Text fontSize="6xl" fontWeight="600" textAlign="center">
          Complete your profile
        </Text>
      </Box>
      {/* <div ref={profileImageInputRef}></div> */}
      <Box
        d={{ base: "block", lg: "grid" }}
        gridTemplateColumns="1fr 1fr"
        px="40px"
        pt="64px"
      >
        <Box border={{ base: "1px solid", lg: "1px solid #ccc" }}>
          <form
            style={{ padding: "0px 32px" }}
            encType="multipart/form-data"
            onSubmit={formSubmitHandler}
          >
            <Box textAlign="center" paddingY="12px">
              <FormLabel for>Set a profile picture</FormLabel>
              <input
                type="file"
                id="profile-picture-upload"
                hidden
                onChange={retrieveProfileImageHandler}
                accept="image/png image/jpg"
                name="profileImage"
              ></input>
              <label for="profile-picture-upload">
                <Avatar size="2xl" src={imageSrc}>
                  <AvatarBadge border="none" boxSize="1.2em">
                    <Icon as={MdFileUpload} />
                  </AvatarBadge>
                </Avatar>
              </label>
            </Box>

            <Input
              placeholder="First name"
              size="md"
              my="12px"
              isRequired
              onChange={(e) => setFName(e.target.value)}
            />
            <Input
              placeholder="Last name"
              size="md"
              my="12px"
              isRequired
              onChange={(e) => setLName(e.target.value)}
            />

            <FormControl id="bioInput">
              <FormLabel for>Add a bio</FormLabel>
              <Textarea
                resize="none"
                rows="6"
                name="bio"
                maxLength="100"
                onChange={(e) => setBio(e.target.value)}
              ></Textarea>
            </FormControl>

            <Stack direction="row" mt="24px" p="4px" spacing="24px">
              <Button type="submit" colorScheme="green" w="100%">
                Submit
              </Button>
              <Button
                colorScheme="blue"
                w="100%"
                onClick={() => {
                  history.replace("/");
                }}
              >
                Skip
              </Button>
            </Stack>
          </form>
        </Box>
        <Box border={{ base: "1px solid", lg: "1px solid #ccc" }}>
          <Box textAlign="center" fontSize="2xl" paddingY="20px">
            People you should follow
          </Box>

          <Box
            p="20px 60px"
            overflow="auto"
            d="flex"
            maxHeight="500px"
            flexDir="column"
            alignContent="center"
            justifyContent="center"
          >
            <SuggestedUserList suggestedUsers={suggestedUsers} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileSetup;
