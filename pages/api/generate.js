// Importing dependancies 
import { Configuration, OpenAIApi } from "openai";

// Consuming OpenAiApi

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// API SetUp

export default async function (req, res){
    if (!configuration.apiKey){
        res.status(500).json({
            error:{
                message: 'API Key is not configured, please follow instructions in READ.me'
            }
        });
        return;
    }

    const car = req.body.car || '';
    if(car.trim().length === 0){
        res.status(400).json({
            error: {
                message: "Please enter a valid car Model"
            }
        });
        return
    }

    try{
        const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(car),
        temperature: 0.6
        });

        res.status(200).json({ result: completion.data.choices[0].text });
    }catch(error) {

        if(error.response){

            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);

        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error:{
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

function generatePrompt(car){
    const capitalizedCar = 
        car[0].toUpperCase() + car.slice(1).toLower.Case();
    return `Suggest three car Models that have high horse power.

Car: Car
Names: Mitsubishi Toyota

car: ${capitalizedCar}
Names:`;
}