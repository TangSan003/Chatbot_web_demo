import { NextResponse } from 'next/server'
import axios from 'axios'
import { extractEntities } from '@/lib/entityExtractor'
import { mergeEntitiesToString } from '@/lib/entityMerger'

type ChatHistory = {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export async function POST(request: Request) {
  try {
    const { message, chatHistory } = await request.json()
    
    // Extract entities from chat history
    const entities = await extractEntities(chatHistory)
    
    // Merge entities to string
    const mergedInfo = mergeEntitiesToString(entities)

    // Create prompt with merged info
    const prompt = `Question: ${message}\nExtract: ${mergedInfo}`

    // Call HuggingFace API
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/TangSan003/api_chatbot_travel-multi-turn-chat-gemini',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return NextResponse.json({
      response: response.data[0].generated_text,
      entities: entities,
      mergedInfo: mergedInfo
    })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
