# React-hook-form

- 비제어 컴포넌트 방식
- 

https://tech.inflab.com/202207-rallit-form-refactoring/react-hook-form/

```
import styled from '@emotion/styled';
import React, {
  ReactElement,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 *
 * @param fixed Modal을 고정할지에 대한 여부
 * @returns
 */
export function useModal(fixed: boolean) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [windowObj, setWindowObj] = useState<Window>();

  //const modalRef = useRef();

  //useEffect(() => {
  //  if (typeof window !== undefined) {
  //    setWindowObj(window);
  //  }
  //}, []);

  //useEffect(() => {
  //  if (!fixed) {
  //    windowObj?.addEventListener('mouseover', handleModalLocation);
  //  }
  //}, [windowObj]);

  //const handleModalLocation = (e: MouseEvent) => {
  //  modalRef.current.left;
  //};

  return {
    Modal: isModalOpen
      ? ({ children }: { children: ReactElement }) => (
          <ModalContainer fixed={fixed}>
            {/*{cloneElement(children, modalRef)}*/}
          </ModalContainer>
        )
      : () => null,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
  };
}

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  background: ${(props: { fixed: boolean }) =>
    props.fixed ? 'transparent' : 'rgba(0, 0, 0, 0.5)'};
`;

```

