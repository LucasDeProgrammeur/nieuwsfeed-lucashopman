interface Props {
    backButtonAction: any;
}

const BackButton = ({backButtonAction}:Props) => {
  return (
    <>
    <div className={ "backButton"} onClick={() => backButtonAction()}>
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>{" "}
    </div>
    </>
  );
};

export default BackButton;
