import { useState } from "react";
import CardStyle from "../../Home.module.css"
import Modal from "../Modal/Modal";

export const Card = ({ cropName, cropImage }) => {

    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState({
        name: '',
        image: '',
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCardClick = () => {
        handleOpen();
        setModalData((prev) => {
            return {
                ...prev,
                name: cropName,
                image: cropImage
            }
        })
    }

    return (
        <>
            <div className={CardStyle.card} onClick={handleCardClick}>
                <div className={CardStyle.card__image__container}>
                    {/* eslint-disable-next-line */}
                    <img
                        src={cropImage}
                        alt="Crop Image"
                    />
                </div>
                <div className={CardStyle.card__content}>
                    <p className={`${CardStyle.card__title} ${CardStyle.text_medium}`} >
                        {cropName}
                    </p>
                </div>
            </div>
            <Modal isOpen={open} onClose={handleClose} >
                <button style={{ float: 'right', cursor: 'pointer', border: 'none', background: 'none', fontSize: '20px'}} onClick={handleClose}>❌</button>
                <img src={modalData.image} alt={modalData.name} />
            </Modal>
        </>
    )
}
