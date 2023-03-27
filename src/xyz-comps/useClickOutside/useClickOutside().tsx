/**
 * 15. useClickOutside()
 * 
    function Component() {
      const ref = useClickOutside(() => {
        alert('clicked outside')
      });
      return <div ref={ref}>..</div>
    }
 */


//+++++++++++++++++++++++++++++
// solution
/**
 * mouseover; 
 * mouseup; 
 * mouseout; 
 * mousedown; 
 * mouseenter; 
 * mouseleave
 */
//+++++++++++++++++++++++++++++
import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const clickRef = useRef<T>(null);

  const handleClick = (event: any) => {
    const element = clickRef.current;
    if (element && !element.contains(event.target)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }

  }, []);

  return clickRef;
}