import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/server";
import { Modal } from "../../context/Modal";
import CreateServerForm from "../CreateServerForm";

const CreateServerModal = ({ hideForm }) => {
    const handleCloseModal = () => {
        hideForm()
    }
    return (
        <div>
            <Modal onClose={handleCloseModal}>
                <CreateServerForm hideForm={hideForm}/>
            </Modal>
        </div>
    )
}

export default CreateServerModal