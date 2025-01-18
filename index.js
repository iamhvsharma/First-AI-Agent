const { OpenAI } = require("openai");

require("dotenv").config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Tools
function getWheatherDetails(city = "") {
  if (city.toLowerCase() === "patiala") return 9;
  if (city.toLowerCase() === "mohali") return 8;
  if (city.toLowerCase() === "chandigarh") return 4;
  if (city.toLowerCase() === "jaipur") return 7;
  if (city.toLowerCase() === "mumbai") return 16;
  if (city.toLowerCase() === "delhi") return 12;
}

const SYSTEM_PROMPT = `
You are an AI Assistant with START, PLAN, ACTION, OBSERVATION and OUTPUT state
Wait for the user prompt and first PLAN using available tools.
After planning, take the action with appropriate tools and wait for observation based on Action, 
Once you get the observation, return the AI response based on START prompt and observations.

Available tools
function getWeatherDetails(city: string): string
getWeatherDetails is a function that accepts a city name as string and returns the wheather detials.

Example:
START
{ "type": "user", "user": "What s the sum of wheather of Patiala and Mohali? " }
{ "type": "plan", "plan": "I will call the getWeatherDetails for Patiala" }
{ "type": "action", "action": "function": "getWheatherDetails", "input": "patiala"}
{ "type": "observationm", "observation": "10'C"  }
`;


const user = " Hey, what is weather of patiala?"

async function chat(){
const result = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
        {"role": "system", content: SYSTEM_PROMPT},
        { "role": user, content: user}]
})

console.log(result.choices[0].message,content)

}