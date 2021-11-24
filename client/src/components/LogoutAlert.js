import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { feedSliceActions } from "../store/feedSlice";
import { authSliceActions } from "../store/authSlice";
import { useDispatch } from "react-redux";

function LogoutAlert(props) {
  const dispatch = useDispatch();

  const userLogoutHandler = () => {
    dispatch(authSliceActions.removeUser());
    dispatch(feedSliceActions.resetUserData());
  };
  const { isOpen, onClose } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure to log out ?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={userLogoutHandler}>
              Logout
            </Button>
            <Button onClick={onClose} colorScheme="yellow">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LogoutAlert;
