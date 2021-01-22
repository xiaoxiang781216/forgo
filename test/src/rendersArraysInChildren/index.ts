import { JSDOM } from "jsdom";
import htmlFile from "../htmlFile";
import "should";
import { run } from "./script";

export default function mount() {
  it("renders arrays in children", async () => {
    const dom = new JSDOM(htmlFile(), {
      runScripts: "outside-only",
      resources: "usable",
    });
    const window = dom.window;

    run(dom);

    const innerHtml = await new Promise<string>((resolve) => {
      window.addEventListener("load", () => {
        resolve(window.document.body.innerHTML);
      });
    });

    innerHtml.should.containEql(
      "<div>Hello world<p>1</p><p>2</p><p>3</p><p>4</p></div>"
    );
  });
}
