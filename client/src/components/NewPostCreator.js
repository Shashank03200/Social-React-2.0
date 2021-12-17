import {
  Box,
  Icon,
  Button,
  Text,
  Input,
  Image,
  Spinner,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { createNewPost } from "../store/post-actions";
import { loadTimelinePosts } from "../store/feed-actions";
import ProcessOverlay from "./ProcessOverlay";
import { UISliceActions } from "../store/UISlice";

function NewPostCreator(props) {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.feed.pageNo);
  const isModalOpen = useSelector((state) => state.UISlice.isModalOpen);

  const [caption, setCaption] = useState("");

  const imageRef = useRef();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [imageFilename, setImageFilename] = useState("");
  const [postUploadProgress, setPostUploadProgress] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const togglePostCreatorModalVisibility = () => {
    dispatch(UISliceActions.toggleModalVisibility());
  };

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file !== undefined) {
      const reader = new FileReader(file);

      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
        setImageFilename(file.name);
      });

      reader.readAsDataURL(file);
    } else {
      setImageSrc("");
      setImageFilename("");
    }
  };

  const postSubmitHandler = (event) => {
    event.preventDefault();
    if (imageSrc === "") {
      setShowErrorModal(true);
      return;
    } else {
      setShowErrorModal(false);
    }
    const formData = new FormData();
    formData.append("desc", caption);
    formData.append("postImage", event.target.postImage.files[0]);

    const callback = () => {
      dispatch(UISliceActions.toggleModalVisibility());
    };

    setPostUploadProgress(true);
    dispatch(createNewPost(formData, callback))
      .then(() => {
        setPostUploadProgress(false);
        dispatch(loadTimelinePosts(page));
      })
      .then(() => {
        setImageSrc("");
        setCaption("");
      });
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isModalOpen}
      size="xl"
      onClose={togglePostCreatorModalVisibility}
    >
      <ModalOverlay />
      {postUploadProgress ? (
        <ProcessOverlay />
      ) : (
        <ModalContent>
          <ModalHeader>Create your post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mt="3">
              <form
                encType="multipart/form-data"
                method="POST"
                onSubmit={postSubmitHandler}
                autoComplete="off"
                action="/api/posts/newpost"
              >
                <Input
                  placeholder="Add a caption"
                  name="caption"
                  size="sm"
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  value={caption}
                />

                <Box minHeight="60vh" p="16px" textAlign="center">
                  <input
                    type="file"
                    id="actual-btn"
                    name="postImage"
                    isRequired
                    hidden
                    onChange={imageChangeHandler}
                  />

                  <label className="fileLabel" htmlFor="actual-btn">
                    <Icon as={MdFileUpload} />
                    &nbsp;&nbsp;
                    <span>Select an image</span>
                  </label>
                  <Text mt="10px" fontSize="sm" id="file-chosen">
                    {imageFilename}
                  </Text>
                  {showErrorModal && (
                    <Text color="red.500" fontSize="12px">
                      Please select a image
                    </Text>
                  )}

                  <Box d="flex" justifyContent="center" mt="20px">
                    {/* {isImageLoading && <Spinner size="lg" />} */}
                    {imageSrc && (
                      <img
                        src={imageSrc}
                        objectFit="contain"
                        maxHeight="50vh"
                        ref={imageRef}
                        alt="coint"
                      />
                    )}
                  </Box>
                </Box>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit">
                    Create Post
                  </Button>
                  <Button onClick={togglePostCreatorModalVisibility}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
}

export default NewPostCreator;
