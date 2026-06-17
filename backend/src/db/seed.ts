import { db } from "../db/index"
import { articles } from "../db/schema"
import dotenv from "dotenv"

dotenv.config()

const seed = async () => {
    await db.insert(articles).values({
        title: "Anthropic चा नवीन AI 'Claude' लाँच — जगभरात खळबळ!",
        subtitle: "कृत्रिम बुद्धिमत्तेच्या क्षेत्रात नवा अध्याय सुरू",
        summary: "Anthropic या अमेरिकन कंपनीने आपला नवीन AI assistant Claude लाँच केला असून तो ChatGPT ला कडवी टक्कर देणार आहे. जगभरातील तंत्रज्ञान क्षेत्रात याची मोठी चर्चा आहे.",
        body: `सॅन फ्रान्सिस्को: Anthropic या अमेरिकन आर्टिफिशियल इंटेलिजन्स कंपनीने नुकताच आपला बहुचर्चित AI assistant 'Claude' जगासमोर सादर केला. या नव्या AI ने तंत्रज्ञान विश्वात एकच खळबळ माजवली आहे.

Claude हा केवळ एक chatbot नाही, तर तो एक हुशार, सुरक्षित आणि विश्वासार्ह डिजिटल सहाय्यक आहे. Anthropic च्या म्हणण्यानुसार, Claude ला विशेषतः सुरक्षितता आणि नैतिकता यांना प्राधान्य देऊन तयार करण्यात आले आहे.

या AI ची सर्वात मोठी खासियत म्हणजे तो मराठीसह अनेक भाषांमध्ये संवाद साधू शकतो. मुंबईतील अनेक तंत्रज्ञान तज्ञांनी याचे स्वागत केले आहे.

Anthropic चे CEO Dario Amodei यांनी सांगितले की, "आमचा उद्देश AI ला सर्वांसाठी सुरक्षित आणि उपयुक्त बनवणे आहे." कंपनीने यासाठी कोट्यवधी डॉलर्सची गुंतवणूक केली आहे.

तंत्रज्ञान विश्लेषकांच्या मते, Claude हा OpenAI च्या ChatGPT ला एक मजबूत पर्याय ठरू शकतो. येत्या काही महिन्यांत याचा प्रभाव स्पष्टपणे दिसून येईल.`,
        author: "काकासाहेब जोशी",
        source: "Kasakay",
        category: "तंत्रज्ञान",
        tags: ["AI", "Claude", "Anthropic", "तंत्रज्ञान", "ChatGPT"],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anthropic_logo.svg/1280px-Anthropic_logo.svg.png",
        isBreaking: false,
        isFeatured: true,
        readTimeMins: 4,
    })

    process.exit(0)
}
seed().then((res) => console.log(res)).catch((err) => console.log(err))