export interface ChatHistory {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

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
