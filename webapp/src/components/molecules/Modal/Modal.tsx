import { FC, Fragment, useRef } from 'react';
import { Row } from 'simple-flexbox';
import { FaTimes } from 'react-icons/fa';
import { modals } from 'modals';
import { Heading, Icon, Spacer, Spreader } from 'components/atoms';
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick';
import { useTranslation } from 'react-i18next';
import { ModalsNames } from 'types/modal.type';
import { Modal } from './Modal.styles';

interface ModalComponentProps {
  modalName: ModalsNames;
  closeModal: () => void;
  openModal: <OpenModalProps>(name: ModalsNames, props?: OpenModalProps) => void;
  showName?: boolean;
}

export const ModalComponent: FC<ModalComponentProps> = ({
  modalName,
  closeModal,
  openModal,
  showName = true,
  ...rest
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const Component = modals[modalName];

  useDetectOutsideClick<HTMLDivElement>(modalRef, closeModal);

  return (
    <Fragment>
      <Modal.Background />

      <div
        data-modal="true"
        ref={modalRef}
      >
        <Modal>
          <Row justifyContent={showName ? 'space-between' : 'flex-end'}>
            {showName && <Heading level="h2">{t(`modal.${modalName}.name`)}</Heading>}

            <Spreader />

            <Modal.CloseButton onClick={closeModal}>
              <Icon
                icon={FaTimes}
                size="1.25"
              />
            </Modal.CloseButton>
          </Row>

          <Spacer space="small" />

          <Component
            closeModal={closeModal}
            openModal={openModal}
            {...(rest as any)} // kind of a hack, but it works - still type safe
          />
        </Modal>
      </div>
    </Fragment>
  );
};
