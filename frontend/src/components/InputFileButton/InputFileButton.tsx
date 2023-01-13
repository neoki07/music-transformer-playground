import { ReactNode, useRef } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accept?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const InputFileButton = ({
  children,
  className,
  style,
  accept,
  onChange,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickButton = () => {
    inputRef.current && inputRef.current.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        onChange={onChange}
      />
      <button className={className} style={style} onClick={handleClickButton}>
        {children}
      </button>
    </>
  );
};
