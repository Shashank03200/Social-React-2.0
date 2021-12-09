import {
  Box,
  Icon,
  Button,
  Text,
  Input,
  Image,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
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

function NewPostCreator(props) {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.feed.pageNo);

  const [caption, setCaption] = useState("");
  const [imgFile, setImgFile] = useState("");
  const imageRef = useRef();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file !== undefined) {
      const reader = new FileReader(file);

      reader.addEventListener("load", () => {
        console.log(reader.result);
        console.log(imageRef);
      });

      reader.readAsDataURL(file);
    } else {
      imageRef.current.src = "";
    }
  };

  const postSubmitHandler = (event) => {
    event.preventDefault();
    if (!imgFile || imgFile === "") {
      setShowErrorModal(true);
      return;
    }
    const formData = new FormData();
    formData.append("desc", caption);
    formData.append("postImage", event.target.postImage.files[0]);
    formData.append("confirm", "1");

    dispatch(createNewPost(formData, page))
      .then(() => {
        dispatch(loadTimelinePosts());
      })
      .then(() => {
        setImgFile("");
        setCaption("");
      });

    props.onModalClose();
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
                  {imgFile}
                </Text>
                {showErrorModal && (
                  <Text color="red.500" fontSize="12px">
                    Please select a image
                  </Text>
                )}

                <Box d="flex" justifyContent="center" mt="20px">
                  {isImageLoading && <Spinner size="lg" />}
                  {imageSrc && (
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/uploads/posts/${imageSrc}`}
                      objectFit="contain"
                      maxHeight="50vh"
                      onLoad={() => setIsImageLoading(false)}
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
