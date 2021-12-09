import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { AiOutlineEllipsis } from "react-icons/ai";

import React, { Fragment } from "react";
import {  useDispatch } from "react-redux";

import { postDeleteActionHandler } from "../store/post-actions";
import { loadTimelinePosts } from "../store/feed-actions";

export default function PostContextMenu({ postId, postDeletePossible }) {
  const accessToken = localStorage.getItem("accessToken");
  
  console.log("PostContextMenu.js", accessToken);

  const dispatch = useDispatch();

  // Alert UI States
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const postDeleteHandler = () => {
    dispatch(postDeleteActionHandler(postId));
    setIsOpen(false);
    dispatch(loadTimelinePosts(1));
  };

  return (
    <Fragment>
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Post
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={postDeleteHandler} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>

      <Menu>
        <MenuButton>
          <Icon
            as={AiOutlineEllipsis}
            fontSize="20px"
            className="action-icon"
          />
        </MenuButton>
        <MenuList>
          {/* MenuItems are not rendered unless Menu is open */}
          {postDeletePossible && (
            <MenuItem onClick={() => setIsOpen(true)}>Delete Post</MenuItem>
          )}
          <MenuItem>Open Post</MenuItem>
          <MenuItem>Report</MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );
}
