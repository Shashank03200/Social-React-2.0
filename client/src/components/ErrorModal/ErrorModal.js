import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UISliceActions } from '../../store/ui-slice';
import { useSelector, useDispatch } from 'react-redux';

import './ErrorModal.css';
const ModalExample = (props) => {

    const dispatch = useDispatch();
    const { clientError, serverError } = useSelector(state => state.ui);
    let errorType = undefined;
    if (clientError) {
        errorType = 'clientError';
    } else if (serverError) {
        errorType = 'serverError';
    }



    const toggle = () => {
        if (clientError) {
            dispatch(UISliceActions.toggleClientError());
        }
        else if (serverError) {
            dispatch(UISliceActions.toggleServerError());
        }
    }

    return (
        <div>

            <Modal isOpen={!!errorType} toggle={toggle} >
                <ModalHeader toggle={toggle}>Error</ModalHeader>
                <ModalBody>
                    {clientError || serverError}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Confirm</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;