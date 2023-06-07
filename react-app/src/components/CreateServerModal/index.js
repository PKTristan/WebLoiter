import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateServerForm from "../CreateServerForm";

const CreateServerModal = () => {
    const [showModal, setShowModal] = useState(false);
    console.log('this is my create server modal')

    return (
        <div>
            <Modal onClose={() => setShowModal(false)} showModal={showModal} >
                <CreateServerForm onClose={() => setShowModal(false)}/>
            </Modal>
        </div>
    )
}

export default CreateServerModal