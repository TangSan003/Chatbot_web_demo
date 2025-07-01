'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageBubble } from '@/components/MessageBubble'
import { ChatHistory } from '@/types/chat'

interface ChatInterfaceProps {
  initialMessages?: ChatHistory[]
}

export default function ChatInterface({ initialMessages = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatHistory[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: ChatHistory = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          chatHistory: messages
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Xin lỗi, tôi gặp lỗi khi xử lý yêu cầu. Vui lòng thử lại.',
        timestamp: new Date().toISOString()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-4">Trợ lý Du lịch AI</h1>
        <div className="space-y-4 overflow-y-auto max-h-[600px]" id="chat-messages">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="message-bubble bot-message">
              <div className="animate-pulse flex space-x-2">
                <div className="h-4 bg-gray-200 rounded w-4" />
                <div className="h-4 bg-gray-200 rounded w-4" />
                <div className="h-4 bg-gray-200 rounded w-4" />
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn của bạn..."
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              Gửi
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
