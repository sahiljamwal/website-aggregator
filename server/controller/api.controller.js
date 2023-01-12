import { launch } from "puppeteer";

export default class apiController {
  submitWebsite = async (req, res) => {
    const { url } = req.body;

    const { websiteContent, websiteOgImage } = await this.scrapWebsite(url);

    console.log("url:::", url);
    console.log({ websiteContent, websiteOgImage });
  };

  /**
   * @description 👇🏻 Puppeteer webscraping function
   * @param url url for the website to be scrapped
   * @returns obj containing websiteDescription and websiteOgImage
   */
  scrapWebsite = async (url) => {
    const brower = await launch();
    const page = await brower.newPage();
    await page.goto(url);

    //👇🏻 returns all the website content
    const websiteContent = await page.evaluate(() =>
      document.documentElement.innerText.trim()
    );

    //👇🏻 returns the website meta image
    const websiteOgImage = await page.evaluate(() => {
      const metas = document.getElementsByTagName("meta");
      metas.forEach((meta) => {
        if (meta.getAttribute("property") === "og:image") {
          return meta.getAttribute("content");
        }
      });
    });

    await brower.close();

    return { websiteContent, websiteOgImage };
  };
}
