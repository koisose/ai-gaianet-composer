
import playwright from "playwright";
import { saveBufferToMinio } from './minio';
export async function generateImage(where: string,id:string) {
  let browser;
  let context;
  let page;

  try {
    
  
    browser = await playwright.chromium.connectOverCDP(
        `ws://${process.env.BROWSERLESS as string}`,
    );

    context = await browser.newContext();
    page = await context.newPage();

    // Set the viewport size to match the desired image dimensions.
    await page.setViewportSize({ width: 512, height: 512 });

    const url = process.env.NEXT_PUBLIC_URL as string;
    // Navigate to the provided URL.
    await page.goto(url + where, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(3000);
    const clip = {
      x: 0,    // x coordinate
      y: 0,    // y coordinate
      width: 512,  // width of the region
      height: 512  // height of the region
    };
    // Capture a screenshot of the page as the OG image.
    const buffer = await page.screenshot({ type: "png", clip });
    await saveBufferToMinio("image", "file-"+id, buffer);
    if (page) await page.close();
    if (context) await context.close();
    if (browser) await browser.close();
    console.log("saving image success")
  } catch (error) {
    if (page) await page.close();
    if (context) await context.close();
    if (browser) await browser.close();
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image.');
  
  }
}

