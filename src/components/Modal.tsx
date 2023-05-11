interface ModalTypes {
    text: string;
    setModalOpen: any;
}

const Modal = ({text,setModalOpen}:ModalTypes) => {
        return (<div className="modal">
            <p>{text}</p>
            <section className="bottomPanel">
                <button className="buttonBoth" onClick={() => setModalOpen(false)}>OK</button>
            </section>
        </div>);
}
 
export default Modal;