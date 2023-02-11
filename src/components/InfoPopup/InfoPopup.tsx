import { InfoPopupComponent } from "../../types/componentsTypes";

function InfoPopup({ isOpen, resStatus, resMessage, onClose }: InfoPopupComponent) {
  return (
    <div className={`info-popup ${isOpen ? 'info-popup_visible' : ''}`} onClick={onClose}>
      <div
        className="info-popup__container"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <button className="info-popup__close-btn" onClick={onClose} aria-label="Закрытие формы" type="button" />
        <div className={`info-popup__res-status ${resStatus && 'info-popup__res-status_type_res-ok'}`} />
        <p className="info-popup__message">{resMessage}</p>
      </div>
    </div>
  );
}

export default InfoPopup;