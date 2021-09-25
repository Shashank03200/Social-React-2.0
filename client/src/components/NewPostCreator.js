import {
  Box,
  Icon,
  Button,
  Text,
  Input,
  Image,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { createNewPost, loadImageFromDisk } from "../store/post-actions";

function NewPostCreator(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [caption, setCaption] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [imageSrc, setImageSrc] = useState(undefined);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (imageSrc === "") {
      setShowErrorModal(true);
    } else {
      setShowErrorModal(false);
    }
  }, [imageSrc]);

  useEffect(() => {});

  const imageChangeHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("desc", caption);
    setIsImageLoading(true);
    event.target.files && setImageFileName(event.target.files[0].name);
    formData.append("postImage", event.target.files[0]);
    dispatch(loadImageFromDisk(token, formData, setImageSrc));
  };

  const postSubmitHandler = (event) => {
    event.preventDefault();
    if (!imageSrc || imageSrc === "") {
      setShowErrorModal(true);
      return;
    }
    const formData = new FormData();
    formData.append("desc", caption);
    formData.append("postImage", event.target.postImage.files[0]);
    formData.append("confirm", "1");

    dispatch(createNewPost(token, formData));
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.isModalOpen}
      size="xl"
      onClose={props.onModalClose}
    >
      <ModalOverlay />
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
                  autoComplete="false"
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
                  {imageFileName}
                </Text>
                {showErrorModal && (
                  <Text color="red.500" fontSize="12px">
                    Please select a image
                  </Text>
                )}

                <Box d="flex" justifyContent="center" mt="20px">
                  {isImageLoading && <Spinner size="lg" />}
                  {imageSrc && (
                    <Image
                      src={`${process.env.PUBLIC_URL}/assets/uploads/posts/${imageSrc}`}
                      objectFit="contain"
                      maxHeight="50vh"
                      onLoad={() => setIsImageLoading(false)}
                    />
                  )}
                </Box>
              </Box>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Create Post
                </Button>
                <Button onClick={props.onModalClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default NewPostCreator;
