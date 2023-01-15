import { launch } from "puppeteer";
import { ChatGPTAPIBrowser } from "chatgpt";
import { v4 as uuidv4 } from "uuid";
export default class ApiController {
  static database = [];

  submitWebsite = async (req, res) => {
    try {
      const { url } = req.body;

      const { websiteContent, websiteOgImage } = await this.scrapWebsite(url);

      //👇🏻 accepts the website content as a parameter
      let result = await this.chatgptFunction(websiteContent);

      //👇🏻 adds the brand image and ID to the result
      result.brandName = websiteOgImage;
      result.id = uuidv4();
      ApiController.database.push(result);

      return res.status(200).json({
        message: "Request successful!",
        database: ApiController.database,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  };

  /**
   * @description 👇🏻 Puppeteer webscraping function
   * @param url url for the website to be scrapped
   * @returns obj containing websiteDescription and websiteOgImage
   */
  scrapWebsite = async (url) => {
    const brower = await launch({ headless: true });
    const page = await brower.newPage();
    await page.goto(url);

    //👇🏻 returns all the website content
    const websiteContent = await page.evaluate(() =>
      document.documentElement.innerText.trim()
    );

    //👇🏻 returns the website meta image
    const websiteOgImage = await page.evaluate(() => {
      const metas = document.getElementsByTagName("meta");
      for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("property") === "og:image") {
          return metas[i].getAttribute("content");
        }
      }
    });

    await brower.close();

    return { websiteContent, websiteOgImage };
  };

  chatgptFunction = async (content) => {
    // use puppeteer to bypass cloudflare (headful because of captchas)
    const api = new ChatGPTAPIBrowser({
      email: process.env.CHATGPT_EMAIL_ADDRESS,
      password: process.env.CHATGPT_PASSWORD,
    });

    await api.initSession();

    //👇🏻 Extracts the brand name from the website content
    const getBrandName = await api.sendMessage(
      `I have a raw text of a website, what is the brand name in a single word? ${content}`
    );

    //👇🏻 Extracts the brand description from the website content
    const getBrandDescription = await api.sendMessage(
      `I have a raw text of a website, can you extract the description of the website from the raw text. I need only the description and nothing else. ${content}`
    );

    return {
      brandName: getBrandName.response,
      brandDescription: getBrandDescription.response,
    };
  };
}
