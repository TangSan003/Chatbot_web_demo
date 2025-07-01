export interface EntityInfo {
  'sản phẩm có nhắc tới': string | null,
  'đơn vị món hàng có nhắc tới': string | null,
  'số lượng đơn vị món hàng có nhắc tới': string | null,
  'đơn hàng có nhắc tới': string | null,
  'đồ vật có nhắc tới': string | null,
  'địa danh có nhắc tới': string | null,
  'cá nhân có nhắc tới': string | null,
  'tên người có nhắc tới': string | null,
  'số tiền có nhắc tới': string | null,
  'giảm giá có nhắc tới': string | null,
  'hình thức thanh toán có nhắc tới': string | null,
  'chi phí giao hàng có nhắc tới': string | null,
  'hình thức giao hàng có nhắc tới': string | null,
  'chỗ ngồi có nhắc tới': string | null,
  'dịch vụ có nhắc tới': string | null
}

export async function extractEntities(chatHistory: any[]): Promise<EntityInfo> {
  const entities: EntityInfo = {
    'sản phẩm có nhắc tới': null,
    'đơn vị món hàng có nhắc tới': null,
    'số lượng đơn vị món hàng có nhắc tới': null,
    'đơn hàng có nhắc tới': null,
    'đồ vật có nhắc tới': null,
    'địa danh có nhắc tới': null,
    'cá nhân có nhắc tới': null,
    'tên người có nhắc tới': null,
    'số tiền có nhắc tới': null,
    'giảm giá có nhắc tới': null,
    'hình thức thanh toán có nhắc tới': null,
    'chi phí giao hàng có nhắc tới': null,
    'hình thức giao hàng có nhắc tới': null,
    'chỗ ngồi có nhắc tới': null,
    'dịch vụ có nhắc tới': null
  }

  // Process each message in chat history
  for (const message of chatHistory) {
    const content = message.content.toLowerCase()

    // Extract sản phẩm
    if (content.includes('sản phẩm') || content.includes('hàng hóa')) {
      entities['sản phẩm có nhắc tới'] = extractProduct(content)
    }

    // Extract đơn vị và số lượng
    const unitMatch = content.match(/(\d+)\s+(viên|cái|chiếc|cặp|bộ|cái)/)
    if (unitMatch) {
      entities['đơn vị món hàng có nhắc tới'] = unitMatch[2]
      entities['số lượng đơn vị món hàng có nhắc tới'] = unitMatch[1]
    }

    // Extract địa danh
    const locations = ['hà nội', 'hồ chí minh', 'đà nẵng', 'nha trang']
    for (const location of locations) {
      if (content.includes(location)) {
        entities['địa danh có nhắc tới'] = location
      }
    }

    // Extract số tiền
    const amountMatch = content.match(/(\d+(?:\.\d+)?)\s+(vnđ|đồng)/)
    if (amountMatch) {
      entities['số tiền có nhắc tới'] = amountMatch[1] + ' ' + amountMatch[2]
    }

    // Extract hình thức thanh toán
    const paymentMethods = ['tiền mặt', 'chuyển khoản', 'thẻ tín dụng']
    for (const method of paymentMethods) {
      if (content.includes(method)) {
        entities['hình thức thanh toán có nhắc tới'] = method
      }
    }
  }

  return entities
}

function extractProduct(text: string): string | null {
  // Simple product extraction - can be improved with NLP
  const products = ['vé máy bay', 'vé tàu', 'vé xe', 'khách sạn', 'tour du lịch']
  for (const product of products) {
    if (text.includes(product)) {
      return product
    }
  }
  return null
}
