import html2canvas from 'html2canvas';

export async function captureElement(element: HTMLElement): Promise<string> {
  const canvas = await html2canvas(element, {
    scale: 2, // High quality
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });
  return canvas.toDataURL('image/png');
}

export async function captureDraftPageHtml(): Promise<string> {
  // Get the HTML of the entire draft page
  const html = document.documentElement.outerHTML;
  return html;
}
