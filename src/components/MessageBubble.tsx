interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`message-bubble ${isUser ? 'user-message' : 'bot-message'}`}
      >
        <div className="mb-2">
          <span className="font-medium">{isUser ? 'Bạn' : 'Trợ lý'}</span>
          <span className="text-sm text-gray-500 ml-2">
            {new Date(timestamp).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <div>{content}</div>
      </div>
    </div>
  )
}
