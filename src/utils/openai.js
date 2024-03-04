import OpenAi from "openai";
import { OPENAI_KEY } from "./constant";

const openai = new OpenAi({
    apiKey: OPENAI_KEY,
    dangerouslyAllowBrowser: true
});

export default openai;