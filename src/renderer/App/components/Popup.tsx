export interface PopupProps {
  children: React.ReactNode;
}
export const Popup: React.FC<PopupProps> = ({ children }) => (
  <div className='popup'>
    {children}
  </div>
);
