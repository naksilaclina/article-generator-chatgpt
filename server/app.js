import "dotenv/config"
import path from "path"
import express from "express"
import cors from "cors"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openaiConfiguration = new OpenAIApi(configuration);

const app = express()

app.use(express.static(path.join(new URL(import.meta.url).pathname, '../dist')));

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(
        path.join(new URL(import.meta.url).pathname, '../dist', 'index.html'));
});

app.post('/create-article', async (req, res) => {

    const systemPrompt = "Carefully fulfill the user's requests from you. Completely follow all given commands.";

    const completion = await openaiConfiguration.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user", 
                content: `
                    Topic: ${req.body.topic}
                    Keywords: ${req.body.keywords}
                    Article language: ${req.body.lang}
                    Number of words to be written: ${req.body.wordCount}
                
                    I want you to act as a content writer very proficient SEO writer writes fluently ${req.body.lang}.
                
                    Always use the given topic information as the main heading.
                
                    Write a detailed, just and fluent preliminary information paragraph about the subject using the given topic and keywords. When using Topic and Keywords in the article, write them in double quotes when you use them excluding the titles.
                
                    After the introductory paragraph, first divide the article into 2 main sections.
                
                    First section:
                    - The title of the first section will be 'contents'.
                    - Create a table in the first section and list the main headings of the article in bullet points. 
                    - Before writing the article, outline it separately, with at least 8 headings and subheadings (including H1, H2, H3, and H4) headings. Titles should be interesting and relevant to the SEO criteria.
                    - Always write the subheadings in the first section, don't move on to the second section without writing them.
                    - Don't write an 'introduction' to the subheadings in the first section and write only the headings that are relevant to the topic you will use in the article.
                    - Items unrelated to the content of the article, such as the main title, introductory paragraph, FAQ and conclusion, should not be used in the first section. It is enough to add the items that you will use as titles in the second section.
                
                    Second section: 
                    - Bold the heading of the second table using markdown language.
                    - You should write a content-rich article that follows the titles listed in the first section. The explanation under each heading should not be short, but should contain clear and sufficient information.
                
                    Do not write ‘first section’ and ‘second section’ in section titles.
                
                    Then, start writing based on that outline step by step.
                
                    Very important details to pay attention to:
                
                    Write a minimum ${req.body.wordCount} words 100% Unique, SEO-optimized, human-written article in ${req.body.lang} with at least 8 headings and subheadings (including H1, H2, H3, and H4 headings) that covers the topic provided in the prompt. Write the article in your own words rather than copying and pasting from other sources. Consider perplexity and burstiness when creating content, ensuring high levels of both without losing specificity or context. Use fully detailed paragraphs that engage the reader. Write in a conversational style as written by a human (use an informal tone, utilize personal pronouns, keep it simple, keep it SEO friendly, engage the reader, use the active voice. Keep it brief, use rhetorical questions, and Incorporate analogies and metaphors.
                
                    Write a conclusion field, make a general summary about the article.
                
                    End with a conclusion paragraph and 5 unique FAQs with answers after the conclusion. This is important to bold the title and all headings of the article, and use appropriate headings for H tags.
                
                    Now write an article on this topic: ${req.body.topic}.
                    Use following keywords in the article: ${req.body.keywords}.
                    Write a minimum ${req.body.wordCount} words.
                
                    The entire article should be in ${req.body.lang}, do not use a language other than ${req.body.lang} for any part of the content.
                `
            }
        ],
    });

    console.log(completion);

    console.log(req.body)
    res.send(completion.data.choices[0].message)
})

app.listen(3000, () => console.log('3000 portundan dinleniyor!'))