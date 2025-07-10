
import html2canvas from 'html2canvas';

// Enhanced chart capture utility
export const captureChart = async (elementId: string): Promise<string | null> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      height: element.offsetHeight,
      width: element.offsetWidth
    });
    
    return canvas.toDataURL('image/png', 0.8);
  } catch (error) {
    console.error('Error capturing chart:', error);
    return null;
  }
};
